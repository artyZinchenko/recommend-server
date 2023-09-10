/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/best-reviews', async (req, res, next) => {
    const { prisma } = req;

    try {
        const reviews = await prisma.review.findMany({
            where: {
                status: 'ACTIVE',
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                author: {
                    select: {
                        user_name: true,
                    },
                },
                likes: true,
                ratings: true,
            },
            orderBy: [
                {
                    average_rating: 'desc',
                },
            ],
            take: 5,
        });
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
