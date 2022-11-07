import express, { Request, Response } from 'express';
import passport from 'passport';
import Strategy from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../prisma';
import { logger } from '../utils/logger';
import { LocalPassport } from '../middleware/passport';
import { Prisma, User } from '@prisma/client';

LocalPassport(passport, Strategy.Strategy);

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

const router = express.Router();

router.use(passport.initialize());

router.get('/test', (req: Request, res: Response) => {
    res.send('Auth Online');
});

// Endpoint for registering a user
router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const encrypted_password = await bcrypt.hash(password, 10);
    try {
        // create user, store encrypted password
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user === null) {
            await prisma.user.create({
                data: {
                    email: email,
                    password: encrypted_password,
                },
            });
            logger.info('Registration Succeeded');
            res.status(200).json({ status: 'succeeded' });
        } else {
            logger.error('Email Exists');
            res.status(500).json({ status: 'failed', message: 'Email In Use' });
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                // tried to reuse email, something went wrong
                logger.error(error);
                res.status(500).json({
                    status: 'failed',
                    message: 'Email In Use',
                });
                throw error;
            }
        }
        logger.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong',
        });
    }
});

// no sessions for now
router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
        try {
            logger.info('Login Succeeded');
            const user = req.authInfo as User;
            res.status(200).json({
                status: 'success',
                token: jwt.sign(
                    { id: user.id, email: user.email } ?? '',
                    JWT_SECRET
                ),
            });
        } catch (err) {
            logger.info('Login Failed');
            logger.error(err);
            res.status(500).json({ status: 'failed' });
        }
    }
);

export default router;
