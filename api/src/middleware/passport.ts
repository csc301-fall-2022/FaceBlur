import prisma from '../prisma';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import client from '../prisma';

const jwtStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

passport.use(
    new jwtStrategy(
        {
            secretOrKey: JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                const user = await client.user.findUniqueOrThrow({
                    where: { id: token.id },
                });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export const LocalPassport = (pass: typeof passport, strat: any) => {
    pass.use(
        new strat(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
                session: false,
            },
            async function verify(
                req: Request,
                email: string,
                password: string,
                cb: (
                    nothing: null,
                    success: boolean,
                    msg: object | unknown
                ) => void
            ) {
                logger.info('Passport strategy used (login)');
                try {
                    const userFound = await prisma.user.findUnique({
                        where: { email },
                    });
                    if (!userFound)
                        return cb(null, false, {
                            message: 'No user found.',
                        });
                    const validPassword = await bcrypt.compare(
                        password,
                        userFound.password
                    );
                    if (!validPassword)
                        return cb(null, false, {
                            message: 'Invalid credentials.',
                        });
                    return cb(null, true, userFound);
                } catch (err) {
                    logger.error(err);
                    return cb(null, false, err);
                }
            }
        )
    );
};
