import { PrismaClient, User } from '@prisma/client';

export const createUser = (prisma: PrismaClient, user: any) => {
  return prisma.user.create(user);
}