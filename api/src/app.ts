import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('CSC311 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});
