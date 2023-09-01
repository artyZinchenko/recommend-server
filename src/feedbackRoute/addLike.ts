/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';

const route = express.Router();

export default route.post('/add-like', async (req: Request, res: Response) => {
    console.log('new like');

    const { user, prisma } = req;
    const { reviewId, userId } = req.body;

    if (!user || !prisma) {
        return res
            .status(401)
            .json({ message: 'User is not authenticated. Please relogin' });
    }

    if (user.id_user !== userId) {
        return res
            .status(401)
            .json({ message: 'Admin can not leave likes . Please relogin' });
    }

    try {
        const newLike = await prisma.review_User.create({
            data: {
                reviewId: reviewId,
                userId: userId,
            },
        });

        console.log('Like added:', newLike);

        res.status(201).json({
            like: newLike,
            message: `Like added`,
        });
    } catch (error) {
        console.error('Error processing like:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
});
