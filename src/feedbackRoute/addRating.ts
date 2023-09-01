/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';

const route = express.Router();

export default route.post(
    '/add-rating',
    async (req: Request, res: Response) => {
        console.log('new rating');

        const { user, prisma } = req;

        if (!user || !prisma) {
            return res
                .status(401)
                .json({ message: 'User is not authenticated. Please relogin' });
        }

        if (user.id_user !== req.body.userId) {
            return res
                .status(401)
                .json({ message: 'Admin can not rate for other users.' });
        }

        try {
            const newRating = await prisma.rate.create({
                data: {
                    rate_number: req.body.rating,
                    reviewId: req.body.reviewId,
                    userId: req.body.userId,
                },
            });

            const total = await prisma.review.findUnique({
                where: {
                    review_id: req.body.reviewId,
                },
                select: {
                    ratings: true,
                },
            });

            if (total?.ratings) {
                const totalValues = total.ratings.reduce(
                    (sum, rating) => sum + rating.rate_number,
                    0
                );
                const newAverage =
                    (totalValues + req.body.rating) /
                    (total.ratings.length + 1);

                await prisma.review.update({
                    where: {
                        review_id: req.body.reviewId,
                    },
                    data: {
                        average_rating: newAverage,
                    },
                });
            }

            console.log('Rating added:', newRating);

            res.status(201).json({
                rating: newRating,
                message: `Rating added`,
            });
        } catch (error) {
            console.error('Error processing like:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
);
