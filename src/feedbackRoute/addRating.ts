/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';

const route = express.Router();

export default route.post(
    '/add-rating',
    async (req: Request, res: Response) => {
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
                    productId: req.body.productId,
                    userId: req.body.userId,
                },
            });

            const total = await prisma.product.findUnique({
                where: {
                    product_id: req.body.productId,
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

                await prisma.product.update({
                    where: {
                        product_id: req.body.productId,
                    },
                    data: {
                        average_rating: newAverage,
                    },
                });
            }

            res.status(201).json({
                rating: newRating,
                message: `Rating added`,
            });
        } catch (error) {
            console.error('Error processing rating:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
);
