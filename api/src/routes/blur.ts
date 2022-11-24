import express, { Request, Response } from 'express';
import { logger } from '../utils/logger';

import multer from 'multer';
import { storage, fileFilter } from '../middleware/upload';
//import { spawnSync } from 'child_process';
const path = require('path');

const router = express.Router();

var spawnSync = require('child_process').spawnSync;
const url = require('url');
const fs = require('fs');

const blur = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
);

// const get_blur = multer({ storage: storage, fileFilter: fileFilter }).single(
//     'file'
// );

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
            console.log("entered blur func");
            let dataToSend: any;
            // const full_name = ((req.file as MulterFile).key);
            // var name = full_name.replace(' ', '%20');
            // var name = name.replace(' ', '%20');
            console.log((req.file as MulterFile))
            console.log((req.file as MulterFile).originalname);
            // let absolutePath = path.resolve(((req.file as MulterFile).originalname));
            // console.log(absolutePath);
            console.log((req.file as MulterFile).metadata);
           

            const python = spawnSync('python3', ['src/middleware/face_detection.py'],  {input:(req.file as MulterFile).originalname});
            console.log("spawned");
            console.log("Python script output: ", python.stdout.toString());
            console.log("Python errors: ", python.stderr.toString());
            //var garabage = videostream[-1];
            //console.log("garabge: ", garabage);
            // console.log( python.status );
            // console.log (python.output.toString('utf8') )

            let absolutePath = path.resolve("original_videos/faceblur.mp4");
            console.log(absolutePath);
            var lol = url.pathToFileURL(python.stdout.toString());
            const resData = {
                file: python.stdout
                //path: absolutePath
            };
            res.status(200).send(resData);


            // python.on('close', (code: any) => {
            //     console.log(`child process close all stdio with code ${code}`);
            // });
            // for await (const data of python.stdout) {
            //     console.log(`stdout from the child: ${data}`);
            //     res.status(200).json({"file": data});
            // };

            // console.log("waited for exit");
            // console.log("stdout", python.stdout.toString());
            // res.status(200).json({"file": python.stdout.toString()});
            // console.log("stderr", python.stderr.toString());
            // python.stdout.on('data', function (data: any) {
            //     console.log('Pipe data from python script ...');
            //     dataToSend = data;
            //     //console.log(`data to send ${dataToSend}`);
            //     res.status(200).json({"file": dataToSend});
            //     // const blob_file = await streamToBlob(dataToSend) // any Node.js readable stream
            //     // res.status(200).json({"file": blob_file});
            // });
            

            // python.stderr.on('data', (data: any) => {
            //     console.error(`stderr: ${data}`);
            // });

            // // Create video record and save to local db
            // console.log(req.user);

            // selected options
            // const doFaceBlur = req.body.faceBlur;
            // const doBackgroundBlur = req.body.backgroundBlur;
            
           
           
        //.send(resData);
        // .json({"file": dataToSend, blurType: video.type, userId: userId});
            // const formData = new FormData();
            // formData.append("file", (req.file as MulterFile).key);
            //formData.append("user", req.user);
            
        }
    });
});

// let file:String;
// router.get('/get_blur', (req: Request, res: Response) => {
//     // Upload file with multer - uploads to S3
//     get_blur(req, res, async (err) => {
//         console.log("entered get");
//         let dataToSend: any;
//         const python = spawn('python3', ['src/routes/blur.py', file]);
//         console.log("spawned");
//         python.stdout.on('data', function (data: any) {
//             console.log('Pipe data from python script ...');
//             dataToSend = data.toString();
//             console.log(`data to send ${dataToSend}`);
//         });
//         python.stderr.on('data', (data: any) => {
//             console.error(`stderr: ${data}`);
//            });
//         python.on('close', (code: any) => {
//             console.log(`child process close all stdio with code ${code}`);
//         });
//         // // Create video record and save to local db
//         // console.log(req.user);

//         // selected options
//         // const doFaceBlur = req.body.faceBlur;
//         // const doBackgroundBlur = req.body.backgroundBlur;
        
//         const resData = {
//             file: dataToSend,
//             // blurType: video.type,
//             // userId: userId,
//         };
//         logger.info('File uploaded successfully');
//         res.status(200).json({"file": dataToSend});
//         //.send(resData);
//         // .json({"file": dataToSend, blurType: video.type, userId: userId});
//     });  

// });

// router.post('/', (req: Request, res: Response) => {
//     logger.info('blur endpoint called');
//     blur(req, res, async (err) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else {
//             // const formData = new FormData();
//             // formData.append("file", (req.file as MulterFile).key);
//             //formData.append("user", req.user);
//             file = (req.file as MulterFile).key;
//             fetch("http://0.0.0.0:8080/api/blur/get_blur",{
//                 headers: {Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtaWNoZWxsZSIsImlhdCI6MTY2OTAwMjA4OX0.SJ8jGi0kPj2r92vLUhg0YhauRT79Lg86LdJceQf9JJw",
//                 Accept: "application/json",
//                 "Content-Type": "application/json"},
//                 method: 'GET',
//                 // body: formData
//             })
//             .then((data)=> {
//                 console.log(data);
//                 console.log("get inside post");
//                 // const video = prisma.video.upsert({ //await
//                 //     where: {
//                 //         name: (data.file as MulterFile).key,
//                 //     },
//                 //     update: {
//                 //         dateUploaded: new Date(),
//                 //     },
//                 //     create: {
//                 //         name: (dataToSend as MulterFile).key,
//                 //         type: 'FACE_BLURRED', // no blur for now, processed videos will have the blur type 
//                 //         uploader: {
//                 //             connect: {
//                 //                 id: userId,
//                 //             },
//                 //         },
//                 //         dateUploaded: new Date(),
//                 //     },
//                 // });
//             });
            
//         }
//     });
// });





export default router;
