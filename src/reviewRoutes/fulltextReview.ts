/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getReviewsByAuthors } from './utils/getReviewsByAuthors';
import { getReviewsByTags } from './utils/getReviewsByTags';
import { getReviewsByComments } from './utils/getReviewsByComments';

const route = express.Router();

export default route.get('/fulltext/:query', async (req, res, next) => {
    const { prisma } = req;
    const query = req.params.query;
    console.log('fulltext', query);

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
                product: {
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
                ratings: true,
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
        const tags = await await prisma.tag.findMany({
            where: {
                tag_name: {
                    search: query,
                },
            },
        });
        const comments = await await prisma.comment.findMany({
            where: {
                comment_text: {
                    search: query,
                },
            },
        });

        const reviewsByAuthors = await getReviewsByAuthors(authors, prisma);
        const reviewsByTags = await getReviewsByTags(tags, prisma);
        const reviewsByComments = await getReviewsByComments(comments, prisma);

        const result = [
            ...reviews,
            ...reviewsByAuthors,
            ...reviewsByTags,
            ...reviewsByComments,
        ];

        console.log(result);
        res.status(200).json({ reviews: result });
    } catch (error) {
        console.error('Error fetching records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
