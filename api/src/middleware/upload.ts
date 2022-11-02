import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

// init s3 client
const s3 = new aws.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_BUCKET_REGION
    }
);

// TODO: Need to save videos to S3 
// export const storage: StorageEngine = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); 
//     }
// });

export const storage: StorageEngine = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: (req, file, cb) => {
        cb(null, file.originalname);
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