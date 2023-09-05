import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin from 'firebase-admin';

export async function getUser(
    token: string,
    uid: string
): Promise<DecodedIdToken> {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(token);
        if (firebaseUser.uid !== uid) {
            throw new Error("Ids don' match");
        }
        return firebaseUser;
    } catch (err) {
        console.log(err);
        throw new Error('Failed to get user');
    }
}
