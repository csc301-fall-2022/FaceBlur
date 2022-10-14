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
    // TODO: need to get blur type, then process video in the appropriate function 
    // Upload file with multer
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            logger.error('Error uploading file: Multer error');
            res.status(400).send(err.message);
        } else if (err) {
            logger.error('Error uploading file: Unknown error');
            res.status(400).send(err.message);
        } else {
            // TODO: populate schema with file metadata and save to local db
            logger.info('File uploaded successfully');
            res.status(200).send(req.file);
        }
    });
});

export default router; 