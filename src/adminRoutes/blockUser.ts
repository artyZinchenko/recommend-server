/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.put('/block-user', async (req, res) => {
    const { user, prisma } = req;
    if (!user || !prisma) {
        return res.status(401).json({ message: 'User not found, relogin.' });
    }

    if (user.role !== 'ADMIN')
        return res.status(401).json({ message: 'Sign in as admin' });

    if (user.id_user === req.body.user.id_user) {
        return res.status(400).json({ message: 'Can not block yourself' });
    }

    try {
        const newUser = await prisma.user.update({
            where: {
                id_user: req.body.user.id_user,
            },
            data: {
                user_status: 'BLOCKED',
            },
            include: {
                reviews: {
                    include: {
                        likes: true,
                    },
                },
            },
        });

        res.status(200).json({
            user: newUser,
            message: `${newUser.user_name} is blocked`,
        });
    } catch (error) {
        console.error('Error blocking user:', error);
    } finally {
        await prisma.$disconnect();
    }
});
