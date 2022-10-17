import express, { Express, Request, Response } from 'express';
import auth from './routes/auth';
import dotenv from 'dotenv';
import passport from 'passport';

import { logger } from './utils/logger';


dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(passport.initialize())
app.use("/api/auth", auth);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('CSC301 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});
