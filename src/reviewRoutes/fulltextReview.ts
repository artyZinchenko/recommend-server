/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getReviewsByAuthors } from './utils/getReviewsByAuthors';
import { getReviewsByTags } from './utils/getReviewsByTags';
import { getReviewsByComments } from './utils/getReviewsByComments';
import { filterResult } from './utils/filterResult';
import { getReviewsByProducts } from './utils/getReviewsByProducts';

const route = express.Router();

export default route.get('/fulltext/:query', async (req, res, next) => {
    const { prisma } = req;
    const query = req.params.query;

    try {
        const reviews = await prisma.review.findMany({
            where: {
                status: 'ACTIVE',
                name: {
                    search: query,
                },
                text: {
                    search: query,
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
                likes: true,
                product: true,
                author: {
                    select: {
                        user_name: true,
                    },
                },
            },
        });

        const authors = await prisma.user.findMany({
            where: {
                user_name: {
                    search: query,
                },
            },
        });
        const tags = await prisma.tag.findMany({
            where: {
                tag_name: {
                    search: query,
                },
            },
        });
        const comments = await prisma.comment.findMany({
            where: {
                comment_text: {
                    search: query,
                },
            },
        });

        const products = await prisma.product.findMany({
            where: {
                product_name: {
                    search: query,
                },
            },
        });

        const reviewsByProducts = await getReviewsByProducts(products, prisma);
        const reviewsByAuthors = await getReviewsByAuthors(authors, prisma);
        const reviewsByTags = await getReviewsByTags(tags, prisma);
        const reviewsByComments = await getReviewsByComments(comments, prisma);

        const result = [
            ...reviews,
            ...reviewsByAuthors,
            ...reviewsByTags,
            ...reviewsByComments,
            ...reviewsByProducts,
        ];

        const filteredResult = filterResult(result);

        res.status(200).json({ reviews: filteredResult });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
