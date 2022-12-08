import { Prisma, PrismaClient, User } from '@prisma/client'
import prisma from '../src/prisma';
import { createUser } from './mock';

const mockedPrismaClient = () => {
  const prismaClient = new PrismaClient();
  prismaClient.$use(async (params, next) => {
    return {
        id: 1,
        email: 'test@gmail.com',
        password:
            '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        videos: []
    } as User
  })
  return prismaClient;
}

describe('registration success', () => {
    test('register a user', async () => {
        const prismaClient = mockedPrismaClient()

        const user = {
            id: 1,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        const test = await createUser(prismaClient, user);
        // response check
        await expect(test?.email).toBe("test@gmail.com");
        await prismaClient.$disconnect();
    });
});

describe('registration fail', () => {
    test('duplicate users', async () => {
        const prismaClient = mockedPrismaClient()

        const user1 = {
            id: 1,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        const user2 = {
            id: 2,
            email: 'test@gmail.com',
            password:
                '$2b$10$UNQGu4eZmEgvucwIIC/DMeszMuvHXf/6euvCwUYAlS2YxRm0WLC52',
        };
        try {
            const test1 = await createUser(prismaClient, user1);
            const test2 = await createUser(prismaClient, user2);
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
            await expect(error).toBe("P2002");
            await prismaClient.$disconnect();
            }
        }
    });
});