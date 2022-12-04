import express, { Request, Response } from 'express';

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";


const router = express.Router();

const config = {
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
    region:  process.env.AWS_BUCKET_REGION,
  };

const client = new S3Client(config);

router.post("/", async function(req: Request, res: Response) {
    console.log(req.body.key)
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.body.key,
      });
    
      // await the signed URL and return it
      res.json(await getSignedUrl(client, command,{ expiresIn: 3600 } ));
});


export default router;