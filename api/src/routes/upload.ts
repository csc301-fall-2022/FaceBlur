import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';
import prisma from '../prisma';
import { User } from '@prisma/client';

import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';
import fs from 'fs';
import { resolve } from 'path';
import AWS from 'aws-sdk';

const router = express.Router();
const bucketName: string = process.env.AWS_BUCKET_NAME || '';
// TODO: maybe we need a filesize limit
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

interface MulterFile extends Express.Multer.File{
    key: string;
}

/**
 * Route for uploading videos to S3 and the database with metadata
 * @name /upload
 * @function
 * @inner
 *
 */
router.post('/', (req: Request, res: Response) => {
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
            const video = await prisma.video.upsert({
                where: {
                    name: (req.file as MulterFile).key,
                },
                update: {
                    dateUploaded: new Date(),
                },
                create: {
                    name: (req.file as MulterFile).key,
                    type: 'NO_BLUR',
                    uploader: {
                        connect: {
                            id: userId,
                        },
                    },
                    dateUploaded: new Date(),
                },
            });
            const params = {
                Bucket: bucketName, 
                Key: (req.file as MulterFile).key
              };
            const absolutePath = resolve('videos');
            const s3 = new AWS.S3();
            const readStream = s3.getObject(params).createReadStream();
            console.log("path where video is saved locally: ", absolutePath + '/' +(req.file as MulterFile).key)
            const writeStream = fs.createWriteStream(absolutePath + '/' + (req.file as MulterFile).key);
            readStream.pipe(writeStream);
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

export default router;
