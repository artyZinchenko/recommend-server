/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/all-reviews', async (req, res) => {
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
                likes: true,
                ratings: true,
            },
        });
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching records:', error);
    } finally {
        await prisma.$disconnect();
    }
});
