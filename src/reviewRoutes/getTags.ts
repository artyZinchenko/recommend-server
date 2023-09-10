/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

const route = express.Router();

export default route.get('/tags', async (req, res, next) => {
    const prisma = req.prisma;
    try {
        const allTags = await prisma.tag.findMany();
        res.status(200).json({ tags: allTags });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
