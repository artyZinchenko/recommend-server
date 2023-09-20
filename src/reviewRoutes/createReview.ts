/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { incrementTagUsage } from '../userRoutes/utils/incrementTagUsage';
import { getProductId } from './utils/getProductId';

const route = express.Router();

export default route.post(
    '/create',
    [
        body('name')
            .notEmpty()
            .withMessage('notification.error.empty.empty_name'),
        body('product.product_name')
            .notEmpty()
            .withMessage('notification.error.empty.empty_product_name'),
        body('text')
            .notEmpty()
            .withMessage('notification.error.empty.empty_text'),
        body('product.type')
            .notEmpty()
            .withMessage('notification.error.empty.empty_type'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map((err) => err.msg);
            return res.status(400).json({ message });
        }

        const { user, prisma } = req;
        if (!user || !prisma) {
            return res
                .status(401)
                .json({ message: 'notification.error.user_notFound' });
        }

        const filteredTags = [...new Set(req.body.tags as string[])];

        try {
            await incrementTagUsage(prisma, filteredTags);

            const product = req.body.product;
            const product_id = await getProductId(prisma, product);
            if (!product_id) throw new Error();

            const newReview = await prisma.review.create({
                data: {
                    name: req.body.name,
                    text: req.body.text,
                    score: req.body.score,
                    authorId: user.id_user,
                    images: req.body.images,
                    productId: product_id,
                    tags: {
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
                    tags: true,
                },
            });

            res.status(201).json({
                review: newReview,
                message: `${req.body.name} created successfully`,
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
);
