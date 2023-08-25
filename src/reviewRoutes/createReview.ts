/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const route = express.Router();

export default route.post(
    '/create',
    [
        body('name').notEmpty().withMessage('Empty review name'),
        body('productTitle').notEmpty().withMessage('Empty product name'),
        body('text').notEmpty().withMessage('No review text'),
        body('productType').notEmpty().withMessage('No product type'),
    ],
    async (req: Request, res: Response) => {
        console.log('new review');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map((err) => err.msg);
            console.log(message);
            return res.status(400).json({ message });
        }

        const { user, prisma } = req;
        if (!user || !prisma) {
            return res
                .status(401)
                .json({ message: 'User is not authenticated. Please relogin' });
        }

        console.log('tags', req.body.tags);

        try {
            const newReview = await prisma.review.create({
                data: {
                    name: req.body.name,
                    text: req.body.text,
                    product: req.body.productTitle,
                    type: req.body.productType,
                    score: 10,
                    authorId: user.id_user,
                    tags: {
                        create: [
                            ...req.body.tags.map((tag: string) => {
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
