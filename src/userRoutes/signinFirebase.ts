/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { getUser } from './utils/getFirebaseUser';
import { matchUser } from './utils/matchUser';
import jwt from 'jsonwebtoken';
import dataSource from '../utils/config';

const route = express.Router();

export default route.post(
    '/signin-firebase',
    async (req: Request, res: Response) => {
        console.log('sign in firebase');
        const firebaseToken = req.body.token;
        const uid = req.body.uid;
        const fbUser = await getUser(firebaseToken, uid);
        const prisma = req.prisma;

        console.log('fbUser', fbUser);
        const foundUser = await matchUser(prisma, fbUser);

        if (foundUser.user_status === 'BLOCKED') {
            return res.status(403).json({ message: 'User is blocked' });
        }

        const signedToken = jwt.sign(
            { user_name: foundUser.user_name, id_user: foundUser.id_user },
            dataSource.SECRET as string
        );

        const user = { ...foundUser, password: null };
        console.log('success', user);

        return res.status(201).json({
            message: `${user.user_name} signed in`,
            signedToken,
            user,
        });
    }
);