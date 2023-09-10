import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function incrementTagUsage(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    filteredTags: string[]
) {
    try {
        const existingTags = [];
        for (const tagName of filteredTags) {
            const found = await prisma.tag.findUnique({
                where: {
                    tag_name: tagName,
                },
            });
            if (found) existingTags.push(found);
        }

        for (const tag of existingTags) {
            await prisma.tag.update({
                where: {
                    tag_id: tag.tag_id,
                },
                data: {
                    usage: {
                        increment: 1,
                    },
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
}
