import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';
import prisma from '../prisma';
import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';
import { User } from '@prisma/client';

const router = express.Router();

var spawnSync = require('child_process').spawnSync;

const blur = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

interface MulterFile extends Express.Multer.File{
    key: string;
    location: string;
    originalname: string;
    metadata: any;
}

router.post('/', (req: Request, res: Response) => {
    logger.info('blur endpoint called');
    blur(req, res, async (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const { file, faceBlur, backgroundBlur } = req.body;
             if (faceBlur == 'true') {
                console.log("entered face blur func");
                const python = spawnSync('python3', ['src/middleware/face_detection.py'], {input:(req.file as MulterFile).key }); 
                console.log("face blur python script complete");
                const user = req.user as User;
                const userId = user.id;
                const video = await prisma.video.upsert({
                    where: {
                        name: python.stdout.toString(),
                    },
                    update: {
                        dateUploaded: new Date(),
                    },
                    create: {
                        name: python.stdout.toString(),
                        type: 'FACE_BLURRED', 
                        uploader: {
                            connect: {
                                id: userId,
                            },
                        },
                        dateUploaded: new Date(),
                    },
                });
                console.log("Python script output: ", python.stdout.toString());
                console.log("Python errors: ", python.stderr.toString());
                if (backgroundBlur != 'true') {
                    res.status(200);
                }
            }
            if (backgroundBlur == 'true') {
                console.log("entered background blur func");
                const python1 = spawnSync('python3', ['src/middleware/background_detection.py'], {input:(req.file as MulterFile).key }); 
                console.log("background blur python script complete");
                const user = req.user as User;
                const userId = user.id;
                const video = await prisma.video.upsert({
                    where: {
                        name: python1.stdout.toString(),
                    },
                    update: {
                        dateUploaded: new Date(),
                    },
                    create: {
                        name: python1.stdout.toString(),
                        type: 'BACKGROUND_BLURRED', 
                        uploader: {
                            connect: {
                                id: userId,
                            },
                        },
                        dateUploaded: new Date(),
                    },
                });
                console.log("Python1 script output: ", python1.stdout.toString());
                console.log("Python1 errors: ", python1.stderr.toString());
                
                res.status(200);
            } 
        }
    });
});

export default router;
