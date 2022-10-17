import prisma from "../prisma";
import { compare } from "../utils/encryption";
import { logger } from "../utils/logger";

export const LocalPassport = (passport: any, strategy: any) => {
    passport.use(
        new strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        async function verify(req: Request, email: string, password: string, cb: any) {
            logger.info("Passport strategy used (login)");
            try {
                const userFound = await prisma.user.findUnique({
                    where: { email },
                });
                if (!userFound) return cb(null, false, {
                    message: "No user found."
                });
                const validPassword = await compare(password, userFound.password);
                if (!validPassword) return cb(null, false, {
                    message: "Invalid credentials."
                });
                return cb(null, userFound);
            } catch (err) {
                logger.error(err);
                return cb(null, err);
            }
        })
    )
};