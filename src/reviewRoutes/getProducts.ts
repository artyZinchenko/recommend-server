/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/products', async (req, res, next) => {
    const { prisma } = req;

    try {
        const products = await prisma.product.findMany({
            include: {
                ratings: true,
            },
        });

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
