/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.put('/grant-admin', async (req, res) => {
    const { user, prisma } = req;
    if (!user || !prisma) {
        return res.status(401).json({ message: 'User not found, relogin.' });
    }

    if (user.role !== 'ADMIN')
        return res.status(401).json({ message: 'Sign in as admin' });

    try {
        const newUser = await prisma.user.update({
            where: {
                id_user: req.body.user.id_user,
            },
            data: {
                role: 'ADMIN',
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
            message: `${newUser.user_name} is admin`,
        });
    } catch (error) {
        console.error('Error :', error);
    } finally {
        await prisma.$disconnect();
    }
});
