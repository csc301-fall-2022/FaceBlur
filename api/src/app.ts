import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

import upload from './routes/upload';

dotenv.config();

const app: Express = express();

app.use(express.json());

// upload route
app.use('/api/upload', upload);

const port = process.env.PORT;
app.get("/api/sanity_check", (req: Request, res:Response) => {
    res.send("CSC301 Sanity Check is working")
})

app.get('/', (req: Request, res: Response) => {
    res.send('CSC301 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});
