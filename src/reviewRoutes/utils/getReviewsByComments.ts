import { Prisma, PrismaClient, Comment } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getReviewsByComments(
    comments: Comment[],
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
    const reviewsByComments = [];
    if (comments.length > 0) {
        for (const comment of comments) {
            const reviews = await prisma.review.findMany({
                where: {
                    comments: {
                        some: {
                            comment_text: comment.comment_text,
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
            reviewsByComments.push(...reviews);
        }
    }
    return reviewsByComments;
}
