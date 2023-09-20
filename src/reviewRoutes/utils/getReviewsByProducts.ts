import { Prisma, PrismaClient, Product } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getReviewsByProducts(
    products: Product[],
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) {
    const reviewsByProducts = [];
    if (products.length > 0) {
        for (const product of products) {
            const reviews = await prisma.review.findMany({
                where: {
                    productId: product.product_id,
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
            reviewsByProducts.push(...reviews);
        }
    }
    return reviewsByProducts;
}
