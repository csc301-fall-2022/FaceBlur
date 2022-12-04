import { FileFilterCallback, StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import multerS3 from 'multer-s3';
import {S3Client} from '@aws-sdk/client-s3';

const region: string = process.env.AWS_BUCKET_REGION || '';
const accessKey: string = process.env.AWS_ACCESS_KEY_ID || '';
const secretKey: string = process.env.AWS_SECRET_ACCESS_KEY || '';
const bucketName: string = process.env.AWS_BUCKET_NAME || '';

// init s3 client
const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    }
});

export const storage: StorageEngine = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'private',
    metadata: (req: Request, file: Express.MulterS3.File, cb: CallableFunction) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req: Request, file: Express.MulterS3.File, cb: CallableFunction) => {
        cb(null, `${file.originalname}`);
    }
});

// Only allow video files to be uploaded
export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const fileTypes = /mp4|mov|avi|wmv|flv|mkv/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Video files only'));
    }
}