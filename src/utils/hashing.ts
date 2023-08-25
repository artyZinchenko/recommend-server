import bcrypt from 'bcrypt';

export const hashPassword = async (plain: string): Promise<string> => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        return await bcrypt.hash(plain, salt);
    } catch (err) {
        let message = 'Error. ';
        if (err instanceof Error) {
            message += err.message;
        }
        throw new Error(message);
    }
};

export const comparePasswords = async (
    plain: string,
    encrypted: string
): Promise<boolean> => {
    return await bcrypt.compare(plain, encrypted);
};
