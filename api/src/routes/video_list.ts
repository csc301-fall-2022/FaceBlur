import express, { Request, Response } from 'express';
import AWS, { AWSError } from 'aws-sdk'
import { DeleteObjectOutput } from '@aws-sdk/client-s3';
import { logger } from '../utils/logger';
import prisma from '../prisma';
import { Prisma} from '@prisma/client';
/** Express router providing video metadata related routes
 * @module routes/video_lists
 * @requires express
 */

const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});


router.get("/test", (req: Request, res: Response) => {
    res.send('list Online');
});


router.get('/list', async (req: Request, res: Response) => {
    logger.info("Getting videos from Prisma")
    res.json(await prisma.video.findMany({include: {
        uploader: true,
      },}))
});

/**
 * Route supporting overwriting video tags
 * @name patch/tags/:videoId
 * @function
 * @inner
 *
 */
router.patch('/tags/:videoId', async (req: Request, res: Response) => {
    const videoId = parseInt(req.params.videoId);
    const tags = req.body.tags
    logger.info("Overwriting tags for id: " + videoId + " and tags: " + tags);

    try {
        await prisma.video.update({
            where: {
                id: videoId
            },
            data : {
                tags: {
                    set: []
                }
            }
        })
        const updateVideo = await prisma.video.update({
            where: {
                id: videoId
            },
            data : {
                tags: {
                    connectOrCreate:
                        tags.map((tag:string) => {
                            return {
                                where: {name: tag},
                                create: { name: tag}
                            }
                        })



                }
            },
            include: {
                tags: true
            }
        })

        res.status(200).json(updateVideo)

    } catch (e){
        logger.error(e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025'){
                res.status(404).send({'message': 'Video not found'});
            }
        }
    }

})



// delete videos from s3 and DB
router.post('/delete', async (req: Request, res: Response) => {
    logger.info('Delete endpoint called');
    const videoId = req.body.fileId;
    const bucketName = process.env.AWS_BUCKET_NAME || '';

    const video = await prisma.video.findUnique({
        where: {
            id: videoId,
        },
    });

    // delete from s3
    if (video != null) {
        const videoName = video.name || ''

        const params = {
            Bucket: bucketName,
            Key: videoName,
        }

        s3.deleteObject(params, (err: AWSError, data: DeleteObjectOutput) => {
            if (err) {
                logger.error('Error deleting file from S3');
                res.status(500).send(err.message);
            } else {
                logger.info('File deleted from S3 successfully');
                res.status(200).send(data);
            }
        });
    } else {
        res.status(404).send({'message': 'Video not found'});
    }

    // delete from DB
    const deleteVideo = await prisma.video.delete({
        where: {
            id: videoId,
        },
    });
    logger.info('Video deleted from DB');

});

export default router;
