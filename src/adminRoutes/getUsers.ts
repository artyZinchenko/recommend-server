/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/get-users', async (req, res) => {
    const { user, prisma } = req;
    if (!user || !prisma) {
        return res.status(401).json({ message: 'User not found, relogin.' });
    }

    if (user.role !== 'ADMIN')
        return res.status(401).json({ message: 'Sign in as admin' });

    try {
        const users = await prisma.user.findMany({
            include: {
                reviews: {
                    include: {
                        likes: true,
                    },
                },
            },
        });

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await prisma.$disconnect();
    }
});
