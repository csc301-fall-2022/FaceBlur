import express, { Express, Request, Response } from 'express';
import video_list from './routes/video_list';
import auth from './routes/auth';
import get_video from './routes/get_video';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';

import { logger } from './utils/logger';
import upload from './routes/upload';

import blur from './routes/blur';
// import get_blur from './routes/blur';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(passport.initialize());
app.use('/api/auth', auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('../frontend/dist'));
    app.use(express.static('../frontend/public'))
}

// upload route
app.use(
    '/api/upload',
    passport.authenticate('jwt', { session: false }),
    upload
);
app.use(
    '/api/blur',
    passport.authenticate('jwt', { session: false }),
    blur
);
app.use('/api/video_list', video_list);
app.use('/api/video', get_video);

const port = process.env.PORT;
app.get('/api/sanity_check', (req: Request, res: Response) => {
    res.send('CSC301 Sanity Check is working');
});

/* app.get('/', (req: Request, res: Response) => {
    res.send('CSC301 Express Server');
}); */

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => logger.info(`Server started at port ${port}`));
}

export default app;
