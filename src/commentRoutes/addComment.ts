/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const route = express.Router();

export default route.post(
    '/add-comment',
    [body('text').notEmpty().withMessage('No comment text')],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map((err) => err.msg);
            return res.status(400).json({ message });
        }

        const { user, prisma, io } = req;
        if (!user || !prisma) {
            return res
                .status(401)
                .json({ message: 'User is not authenticated. Please relogin' });
        }

        try {
            const newComment = await prisma.comment.create({
                data: {
                    comment_text: req.body.text,
                    review: { connect: { review_id: req.body.reviewId } },
                    author: { connect: { id_user: user.id_user } },
                },
                include: {
                    author: {
                        select: {
                            user_name: true,
                        },
                    },
                },
            });

            io.to(req.body.reviewId).emit('commentAdded', newComment);

            res.status(201).json({
                comment: newComment,
                message: `Comment added`,
            });
        } catch (error) {
            console.error('Error adding like:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
);
