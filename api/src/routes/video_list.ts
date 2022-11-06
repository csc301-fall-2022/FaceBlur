import express, { Request, Response } from 'express';

import AWS from 'aws-sdk';


import { logger } from '../utils/logger';
import prisma from '../prisma';


const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
    res.send('list Online');
});

//?????
// router.use(express.json());             
// router.use(express.urlencoded()); 


// router.get('/list', (req: Request, res: Response) => {
//     logger.info('Upload endpoint called');
//     AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID || '', secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '', region: process.env.AWS_BUCKET_REGION || ''});
//     var s3 = new AWS.S3();
    

//     var params = { 
//      Bucket: process.env.AWS_BUCKET_NAME || "",
//      MaxKeys: 5
//     }
    
//     s3.listObjects(params, function (err, data) {
//      if(err)throw err;
//      console.log(data)
//      logger.info("returnsdljfl");
//      res.json(data);
//     });
// });

router.get('/list', async (req: Request, res: Response) => {
    res.json(await prisma.video.findMany({include: {
        uploader: true,
      },}))
});



// no sessions for now


export default router;