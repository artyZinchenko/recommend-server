/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { comparePasswords } from '../utils/hashing';
import jwt from 'jsonwebtoken';
import dataSource from '../utils/config';

const route = express.Router();

export default route.post('/login', async (req: Request, res: Response) => {
    const prisma = req.prisma;

    const foundUser = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if (!foundUser) {
        return res.status(404).json({ message: 'User not fround' });
    }

    const passwordMatch = await comparePasswords(
        req.body.password,
        foundUser.password
    );

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Wrong password' });
    }

    if (foundUser.user_status === 'BLOCKED') {
        return res.status(403).json({ message: 'User is blocked' });
    }

    const token = jwt.sign(
        { user_name: foundUser.user_name, id_user: foundUser.id_user },
        dataSource.SECRET as string
    );

    const user = { ...foundUser, password: req.body.password };

    return res
        .status(201)
        .json({ message: `${user.user_name} signed in`, token, user });
});
