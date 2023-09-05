export interface DecodedToken {
    user_name: string;
    id_user: string;
}

type UserStatus = 'ACTIVE' | 'BLOCKED';

type Role = 'USER' | 'ADMIN';

export interface UserDB {
    id_user: string;
    email: string | null;
    password: string | null;
    user_status: UserStatus;
    user_name: string;
    role: Role;
}
