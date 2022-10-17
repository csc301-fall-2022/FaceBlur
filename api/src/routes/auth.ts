import express, { Request, Response } from 'express';
import passport from 'passport';
import Strategy from 'passport-local'
import bodyParser from 'body-parser'

import prisma from '../prisma';
import { logger } from '../utils/logger';
import { hash } from '../utils/encryption';
import { LocalPassport } from '../middleware/passport';

LocalPassport(passport, Strategy.Strategy)
const router = express.Router();

router.use(passport.initialize())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/test", (req: Request, res: Response) => {
    res.send('Auth Online');
});

// Endpoint for registering a user
router.post('/register', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const encrypted_password = await hash(password)
    try {
        // create user, store encrypted password
        const user = await prisma.user.create({
        data: {
            email: email,
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

// no sessions for now
router.post('/login', passport.authenticate('local', {session: false}), async (req, res) => {
  try {
    logger.info("Login Succeeded");
    res.status(200).json({status: "success"})
  } catch (err) {
    logger.info("Login Failed");
    logger.error(err)
    res.status(500).json({status: "failed"})
  }
})

export default router;
