import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { UserDB } from '..';

declare global {
    namespace Express {
        export interface Request {
            prisma: PrismaClient;
            user: UserDB;
        }
    }
}
