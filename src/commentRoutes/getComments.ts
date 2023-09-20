/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/:reviewId', async (req, res) => {
    const { prisma } = req;
    const reviewId = req.params.reviewId;

    try {
        const reviewWithComments = await prisma.review.findUnique({
            where: { review_id: reviewId },
            include: {
                comments: {
                    orderBy: { create_date: 'asc' },
                    include: {
                        author: {
                            select: {
                                user_name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!reviewWithComments) return [];

        const comments = reviewWithComments?.comments;
        return res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching records:', error);
    } finally {
        await prisma.$disconnect();
    }
});
