import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';
import prisma from '../prisma';
import { User } from '@prisma/client';

import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';
import AWS, { AWSError } from 'aws-sdk'
import { DeleteObjectOutput } from '@aws-sdk/client-s3';

const router = express.Router();

// TODO: maybe we need a filesize limit
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

interface MulterFile extends Express.Multer.File{
    key: string;
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});


// Endpoint for uploading and processing a video
router.post('/upload', (req: Request, res: Response) => {
    logger.info('Upload endpoint called');
    // Upload file with multer - uploads to S3
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError || !req.file) {
            logger.error('Error uploading file: Multer error');
            res.status(400).send(err.message);
        } else if (err) {
            logger.error('Error uploading file: Unknown error');
            res.status(500).send(err.message);
        } else {
            // Create video record and save to local db
            const user = req.user as User;
            const userId = user.id;
            // selected options
            // const doFaceBlur = req.body.faceBlur;
            // const doBackgroundBlur = req.body.backgroundBlur;
            const video = await prisma.video.upsert({
                where: {
                    name: (req.file as MulterFile).key,
                },
                update: {
                    dateUploaded: new Date(),
                },
                create: {
                    name: (req.file as MulterFile).key,
                    type: 'NO_BLUR', // no blur for now, processed videos will have the blur type 
                    uploader: {
                        connect: {
                            id: userId,
                        },
                    },
                    dateUploaded: new Date(),
                },
            });
            const resData = {
                file: req.file,
                blurType: video.type,
                userId: userId,
            };
            logger.info('File uploaded successfully');
            res.status(200).send(resData);
        }
    });
});


// delete videos from s3 and DB 
router.post('/delete', async (req: Request, res: Response) => {
    logger.info('Delete endpoint called');
    // delete from db
    const user = req.user as User;
    const userId = user.id; 
    const videoName = req.body.name; 
    const deleteVideo = await prisma.video.delete({
        where: {
            name: videoName,
        },
    }); 
    logger.info('Video deleted from DB');

    const bucketName = process.env.AWS_BUCKET_NAME || ''; 

    const params = {
        Bucket: bucketName,
        Key: videoName,
    }
    // delete from s3
    s3.deleteObject(params, (err: AWSError, data: DeleteObjectOutput) => {
        if (err) {
            logger.error('Error deleting file from S3');
            res.status(500).send(err.message);
        } else {
            logger.info('File deleted from S3 successfully');
            res.status(200).send(data);
        }
    });
});

export default router;
