/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.put('/delete-review/:reviewId', async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { user, prisma } = req;

    if (!user || !prisma) {
        return res
            .status(401)
            .json({ message: 'User is not authenticated. Please relogin' });
    }

    try {
        const updatedReview = await prisma.review.update({
            where: {
                review_id: reviewId,
            },
            data: {
                status: 'DELETED',
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        res.status(201).json({
            review: updatedReview,
            message: `${updatedReview.name} deleted successfully`,
        });

        for (const tag of updatedReview.tags) {
            await prisma.tag.update({
                where: {
                    tag_id: tag.tagId,
                },
                data: {
                    usage: {
                        decrement: 1,
                    },
                },
            });
        }
    } catch (error) {
        console.error('Error deleting records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
