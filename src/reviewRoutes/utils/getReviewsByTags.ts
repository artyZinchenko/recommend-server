import { Prisma, PrismaClient, Tag } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getReviewsByTags(
    tags: Tag[],
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
    const reviewsByTags = [];
    if (tags.length > 0) {
        for (const tag of tags) {
            const reviews = await prisma.review.findMany({
                where: {
                    tags: {
                        some: {
                            tag: {
                                tag_name: tag.tag_name,
                            },
                        },
                    },
                    status: 'ACTIVE',
                },
                include: {
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                    likes: true,
                    product: {
                        include: {
                            ratings: true,
                        },
                    },
                    author: {
                        select: {
                            user_name: true,
                        },
                    },
                },
            });
            reviewsByTags.push(...reviews);
        }
    }
    return reviewsByTags;
}
