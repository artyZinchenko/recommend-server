/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';

const route = express.Router();

export default route.get('/refresh', async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res
            .status(404)
            .json({ message: 'notification.error.login.not_found' });
    }

    return res
        .status(201)
        .json({ message: `${user.user_name} signed in`, user });
});
