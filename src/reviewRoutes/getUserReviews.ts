/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/user-reviews/:userId', async (req, res) => {
    const { user, prisma } = req;
    if (!user || !prisma) {
        return res
            .status(401)
            .json({ message: 'User is not authenticated. Please relogin' });
    }

    const requestedId = req.params.userId;

    if (requestedId !== user.id_user) {
        if (user.role !== 'ADMIN')
            return res.status(401).json({ message: 'Anauthorized' });
    }

    try {
        const reviews = await prisma.review.findMany({
            where: {
                authorId: requestedId,
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
