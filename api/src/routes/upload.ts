import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';

const router = express.Router();
const prisma = new PrismaClient();

// TODO: maybe we need a filesize limit 
const upload = multer({storage: storage, fileFilter: fileFilter}).single('file');

// Endpoint for uploading and processing a video
router.post('/', (req: Request, res: Response) => {
    logger.info('Upload endpoint called');
    // Upload file with multer
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError || !req.file) {
            logger.error('Error uploading file: Multer error');
            res.status(400).send(err.message);
        } else if (err || !req.file) {
            logger.error('Error uploading file: Unknown error');
            res.status(400).send(err.message);
        } else {
            // Create video record and save to local db
            const userId = parseInt(req.body.userId);
            const blurType = req.body.blurType;
            // TODO: upsert? 
            const video = await prisma.video.create({
                data: {
                    name: req.file.filename,
                    type: blurType, 
                    uploader: {
                        connect: {
                            id: userId
                        }
                    }, 
                    dateUploaded: new Date(),
                }
            }); 
            const resData = {
                file: req.file,
                blurType: blurType,
                userId: userId
            }
            logger.info('File uploaded successfully');
            res.status(200).send(resData);
        }
    });
});

export default router; 