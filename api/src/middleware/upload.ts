import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';

// Save to local storage: tentative solution
export const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
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