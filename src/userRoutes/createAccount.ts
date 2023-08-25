/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { hashPassword } from '../utils/hashing';

const route = express.Router();

export default route.post(
    '/create-account',
    [
        body('name').notEmpty().withMessage('Empty username'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
    ],
    async (req: Request, res: Response) => {
        console.log('CREATE ACC', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map((err) => err.msg);
            console.log(message);
            return res.status(400).json({ message });
        }
        const prisma = req.prisma;

        try {
            const newUser = await prisma.user.create({
                data: {
                    user_name: req.body.name,
                    email: req.body.email,
                    password: await hashPassword(req.body.password),
                },
            });
            res.status(201).json({
                message: `User ${newUser.user_name} created successfully`,
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
);
