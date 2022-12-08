import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';
import prisma from '../prisma';
import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';
import { User } from '@prisma/client';

const router = express.Router();
const fs = require('fs');
var spawnSync = require('child_process').spawnSync;
var AWS = require('aws-sdk');
const {resolve} = require('path');
const path = require('path');
const bucketName: string = process.env.AWS_BUCKET_NAME || '';
const accessKey: string = process.env.AWS_ACCESS_KEY_ID || '';
const secretKey: string = process.env.AWS_SECRET_ACCESS_KEY || '';

const blur = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

interface MulterFile extends Express.Multer.File{
    key: string;
    location: string;
    originalname: string;
    metadata: any;
}

/* Blurs face and/or background of a video that is passed in, by running a python script 
   And uploads to S3 bucket and database
*/
router.post('/', (req: Request, res: Response) => {
    logger.info('blur endpoint called');
    blur(req, res, async (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const { file, faceBlur, backgroundBlur } = req.body;
             if (faceBlur == 'true') {
                logger.info("entered face blur func");
                logger.info("(req.file as MulterFile): ",(req.file as MulterFile));
                const python = spawnSync('python3', ['src/middleware/face_detection.py'], {input:(req.file as MulterFile).key }); 
                logger.info("face blur python script complete");
                
                let path2 = python.stdout.toString().replace('\n', '');
                let filename = path.basename(path2);
                logger.info("new path: ", path2);
                const fileContent = fs.readFileSync(path2);
                const user = req.user as User;
                const userId = user.id;
                uploadBlurredVid(filename, fileContent, 'FACE_BLURRED', userId);

                logger.info("Face blur Python script output: ", python.stdout.toString());
                logger.info("Face blur Python errors: ", python.stderr.toString());
                if (backgroundBlur != 'true') {
                    res.status(200);
                }
            }
            if (backgroundBlur == 'true') {
                logger.info("entered background blur func");
                const python1 = spawnSync('python3', ['src/middleware/background_detection.py'], {input:(req.file as MulterFile).key }); 
                logger.info("background blur python script complete");
                let path1 = python1.stdout.toString().replace('\n', '');
                let filename = path.basename(path1);
                logger.info("new path: ", path1);
                const fileContent = fs.readFileSync(path1);
                const user = req.user as User;
                const userId = user.id;
                uploadBlurredVid(filename, fileContent, 'BACKGROUND_BLURRED', userId);

                logger.info("Python1 script output: ", python1.stdout.toString());
                logger.info("Python1 errors: ", python1.stderr.toString());
                res.status(200);
            }
            let absolutePath = resolve('./blur.ts');
            let anotherPath = absolutePath.replace("blur.ts", "videos");
            fs.readdir(anotherPath, (err:any, files:any) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlink(path.join(anotherPath, file), (err:any) => {
                    if (err) throw err;
                    });
                }
            });

        }
    });
});

async function uploadBlurredVid(filename:string, fileContent:any, type:any, userId:any) {
    const s3 = new AWS.S3({
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    });
    const params = {
        Bucket: bucketName,
        Key: filename, 
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err:any, data:any) {
        if (err) {
            throw err;
        }
        logger.info("Blurred file uploaded successfully. ", data.Location);
    });
    // Uploading files to db
    const video = await prisma.video.upsert({
        where: {
            name: filename,
        },
        update: {
            dateUploaded: new Date(),
        },
        create: {
            name: filename,
            type: type,
            uploader: {
                connect: {
                    id: userId,
                },
            },
            dateUploaded: new Date(),
        },
    }); 
 } 

export default router;
