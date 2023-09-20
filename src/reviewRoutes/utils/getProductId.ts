import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getProductId(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    product: any
): Promise<number> {
    try {
        if (!product.product_id) {
            const foundProduct = await prisma.product.findMany({
                where: {
                    product_name: product.product_name,
                    type: product.type,
                },
            });
            if (foundProduct.length > 0) return foundProduct[0].product_id;
            const newProduct = await prisma.product.create({
                data: {
                    product_name: product.product_name,
                    type: product.type,
                },
            });
            return newProduct.product_id;
        }
        return product.product_id;
    } catch (err) {
        console.log(err);
        throw new Error('Could not find product id');
    }
}
