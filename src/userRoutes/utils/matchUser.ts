import { Prisma, PrismaClient, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export async function matchUser(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    fbUser: DecodedIdToken,
    emailForTwitter: string | null
): Promise<User> {
    let message = 'Error matching firebase user.';
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                uids: {
                    some: {
                        uid: {
                            equals: fbUser.uid,
                        },
                    },
                },
            },
        });
        if (foundUser) return foundUser;
        if (!fbUser.email && !emailForTwitter)
            throw new Error('No email provided');

        // this is an exception
        // facebook provides email in verifyTokenId response while twitter does not
        // emailForTwitter is sent from client side, which is not ideal, but I could not find another workaround
        const email = fbUser.email
            ? fbUser.email
            : emailForTwitter
            ? emailForTwitter
            : undefined;

        try {
            const updatedUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    uids: {
                        create: {
                            uid: fbUser.uid,
                        },
                    },
                },
            });
            if (updatedUser) return updatedUser;
        } catch (err) {
            message += 'Could not update user uids';
        }
        const newUser = await prisma.user.create({
            data: {
                uids: {
                    create: {
                        uid: fbUser.uid,
                    },
                },
                email: email,
                user_name: fbUser.name,
            },
        });
        return newUser;
    } catch (err) {
        if (err instanceof Error) {
            message += err.message;
        }
        console.log(message);
        throw new Error(message);
    }
}
