import { Prisma, PrismaClient, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getReviewsByAuthors(
    authors: User[],
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
    const reviewsByAuthors = [];
    if (authors.length > 0) {
        for (const author of authors) {
            const reviews = await prisma.review.findMany({
                where: {
                    authorId: author.id_user,
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
            reviewsByAuthors.push(...reviews);
        }
    }
    return reviewsByAuthors;
}
