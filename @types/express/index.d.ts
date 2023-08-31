import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { UserDB } from '..';
import { Server } from 'socket.io';

declare global {
    namespace Express {
        export interface Request {
            prisma: PrismaClient;
            user: UserDB;
            io: Server;
        }
    }
}
