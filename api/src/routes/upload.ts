import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';
import prisma from '../prisma';

import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';

const router = express.Router();

// TODO: maybe we need a filesize limit
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

// Endpoint for uploading and processing a video
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
            const userId = parseInt(req.body.userId);
            // selected options 
            const doFaceBlur = req.body.faceBlur;
            const doBackgroundBlur = req.body.backgroundBlur;
            // TODO: upsert?
            const video = await prisma.video.create({
                data: {
                    name: req.file.originalname,
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

export default router;
