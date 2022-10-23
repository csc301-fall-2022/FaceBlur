import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';



dotenv.config();

const app: Express = express();
const port = process.env.PORT;
//const cv = require('opencv');
const cv = require('opencv4nodejs');
const gm  = require('gm');

app.get('/', (req: Request, res: Response) => {
    res.send('CSC311 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});

app.post('/blur', (req: Request, res: Response) => {
    let body = req.body;  // body = {video: ..., faceOrBackground: ...}

    const video = new cv.VideoCapture(body.video); 
    let video_width  = video.get(3);
    let video_height = video.get(4);
    const size = new cv.Size(video_height, video_width);
    var fourcc = cv.VideoWriter.fourcc("MJPG");
    let output = cv.VideoWriter('path', fourcc, 20.0, size);//frames_per_Second, frame_size
    while(true){
        let {contain, frame} = video.read(); // reads image every seconds
        if(!contain){
            break;
        }
        const width = frame.cols;
        const height = frame.rows;
        const landmarks = faceOrBackgroundDetection(frame, body.faceOrBackground); //mediapipe 
        let convexhull = cv.convexHull(landmarks);
        let colour = new cv.Scalar(0, 255, 0);
        cv.polylines(frame,[convexhull], true, colour, 3);
        let row = new Array(width).fill(0);
        let mask = new Array(height).fill(row)
        cv.polylines(mask,[convexhull], true, colour, 3);
        const face = cv.bitwise_and(frame, frame, mask=mask)
        const background_mask = cv.bitwise_not(face)
        const background = cv.bitwise_and(frame, frame, mask= background_mask)
        let new_frame = "";
        if (body.faceOrBackground == "face"){
            const size = new cv.Size(27, 27);
            const blurred = cv.GaussianBlur(face,size, 0)
            new_frame = cv.add(blurred, background)

        }else{
            const size = new cv.Size(27, 27);
            const blurred = cv.GaussianBlur(background,size, 0)
            new_frame = cv.add(blurred, face)
        }
        output.write(new_frame)

    }
    video.release()
    cv.distroyAllWindows()
    return res.send({video: output});

    
});

function faceOrBackgroundDetection(frame: any, faceOrBackground: string){
    // mediapipe detection function
}



