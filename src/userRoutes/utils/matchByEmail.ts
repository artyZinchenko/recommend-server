import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { hashPassword } from '../../utils/hashing';

export async function matchByEmail(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    email: string,
    password: string
) {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (foundUser) {
            const foundPassword = foundUser.password;
            const updatedUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: foundPassword
                        ? foundPassword
                        : await hashPassword(password),
                },
            });
            return updatedUser;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
}
