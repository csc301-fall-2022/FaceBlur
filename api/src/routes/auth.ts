import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import prisma from '../prisma';
import bcrypt from "bcrypt";
import { logger } from '../utils/logger';

dotenv.config();

const router = express.Router();

// Endpoint for registering a user
router.post('/register', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    // salting and hashing
    const salt = await bcrypt.genSalt(10);
    const encrypted_password = await bcrypt.hash(password, salt);
    try {
        // create user, store encrypted password
        const user = await prisma.user.create({
        data: {
            email,
            password: encrypted_password
            },
        });
        logger.info("Registration Succeeded");
        res.status(200).json(({ status: "succeeded", user: user }));
    } catch(error) {
        logger.error(error);
        res.status(500).json(({ status: "failed", message: "Something went wrong" }));
    }
});

// Endpoint for login authentication
router.get('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { email },
        });
        const validated = await bcrypt.compare(password, user.password);
        if (validated) {
            res.status(200).json(({ status: "succeeded" }));
            logger.info('Login Processed');
        } else {
            res.status(500).json(({ status: "failed", message: "Incorrect Password" }));
            logger.info('Login Processed');
        }
    } catch (error) {
        logger.error(error);
        res.status(404).json(({ status: "failed", message: "Something went wrong" }));
    } 
});

export default router;
