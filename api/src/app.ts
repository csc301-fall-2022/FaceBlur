import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

import login from './routes/auth';

dotenv.config();

const app: Express = express();

// login route
app.use('/login', login)

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('CSC301 Express Server');
});

app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
});
