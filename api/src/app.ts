import express, { Express, Request, Response } from 'express';
import auth from './routes/auth';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';

import { logger } from './utils/logger';
import upload from './routes/upload';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(passport.initialize())
app.use("/api/auth", auth);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// upload route 
app.use('/upload', upload);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('CSC301 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});