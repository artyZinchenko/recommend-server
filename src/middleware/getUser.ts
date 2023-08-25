/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import jwt from 'jsonwebtoken';
import dataSource from '../utils/config';
import { DecodedToken } from '../../@types';

const route = express.Router();

route.use(async (req, _res, next) => {
    try {
        const prisma = req.prisma;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            next();
            return;
        }

        const decodedToken = jwt.verify(token, dataSource.SECRET as string);
        const { id_user } = decodedToken as DecodedToken;

        if (!id_user) {
            next();
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id_user,
            },
        });

        if (!user) {
            next();
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
        next();
    }
});

export default route;
