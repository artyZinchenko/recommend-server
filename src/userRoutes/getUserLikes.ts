/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';

const route = express.Router();

export default route.get(
    '/getUserLikes',
    async (req: Request, res: Response, next) => {
        const prisma = req.prisma;
        const user = req.user;

        try {
            const userReviews = await prisma.review.findMany({
                where: {
                    authorId: user.id_user,
                },

                include: {
                    likes: true,
                },
            });

            const likesNumber = userReviews.reduce(
                (acc, cur) => acc + cur.likes.length,
                0
            );

            return res.status(201).json({ total_likes: likesNumber });
        } catch (error) {
            console.error('Error fetching records:', error);
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    }
);
