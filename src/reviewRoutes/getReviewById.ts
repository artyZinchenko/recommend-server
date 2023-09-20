/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/reviewById/:id', async (req, res, next) => {
    const { prisma } = req;
    const id = req.params.id;

    try {
        const review = await prisma.review.findUnique({
            where: {
                status: 'ACTIVE',
                review_id: id,
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
                product: {
                    include: {
                        ratings: true,
                    },
                },
            },
        });

        res.status(200).json({ review });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
