/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { calculateTagUsage } from '../userRoutes/utils/calculateTagUsage';
// import { calculateTagUsage } from '../userRoutes/utils/calculateTagUsage';

const route = express.Router();

export default route.put('/update', async (req, res, next) => {
    const { user, prisma } = req;
    if (!user || !prisma) {
        return res
            .status(401)
            .json({ message: 'User is not authenticated. Please relogin' });
    }
    console.log(req.body.authorId, user.id_user);

    if (user.id_user !== req.body.authorId) {
        if (user.role !== 'ADMIN')
            return res.status(401).json({ message: 'Anauthorized' });
    }

    try {
        const filteredTags = [...new Set(req.body.tags as string[])];

        const prevTags = await prisma.review.findUnique({
            where: {
                review_id: req.body.review_id,
            },
            select: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        const updatedReview = await prisma.review.update({
            where: {
                review_id: req.body.review_id,
            },
            data: {
                name: req.body.name,
                text: req.body.text,
                product: req.body.productTitle,
                type: req.body.productType,
                score: req.body.score,
                images: req.body.images,
                tags: {
                    deleteMany: {},
                    create: [
                        ...filteredTags.map((tag: string) => {
                            return {
                                tag: {
                                    connectOrCreate: {
                                        where: {
                                            tag_name: tag,
                                        },
                                        create: {
                                            tag_name: tag,
                                        },
                                    },
                                },
                            };
                        }),
                    ],
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        const updatedUsage = calculateTagUsage(
            prevTags?.tags,
            updatedReview.tags
        );

        for (const tag of updatedUsage) {
            await prisma.tag.update({
                where: { tag_id: tag.id },
                data: {
                    usage: tag.increase ? { increment: 1 } : { decrement: 1 },
                },
            });
        }

        return res.status(201).json({
            review: updatedReview,
            message: `${req.body.name} updated successfully`,
        });
    } catch (error) {
        console.error('Error updating records:', error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
});
