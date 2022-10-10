import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { storage, fileFilter } from './middleware/upload'

import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// TODO: maybe we need a filesize limit 
const upload = multer({storage: storage, fileFilter: fileFilter}).single('file');

app.use(express.json());

// Endpoint for uploading and processing a video
app.post('/upload', (req: Request, res: Response) => {
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

app.get('/', (req: Request, res: Response) => {
    res.send('CSC311 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});
