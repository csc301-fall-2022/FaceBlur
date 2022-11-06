import express, { Request, Response } from 'express';



import { logger } from '../utils/logger';
import prisma from '../prisma';


const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
    res.send('list Online');
});



router.get('/list', async (req: Request, res: Response) => {
    logger.info("Getting videos from Prisma")
    res.json(await prisma.video.findMany({include: {
        uploader: true,
      },}))
});





export default router;