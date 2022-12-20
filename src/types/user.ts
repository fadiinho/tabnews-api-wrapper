export interface User {
    id: string;
    username: string;
    email: string;
    features: string[];
}

export interface UserToken {
    id: string;
    token: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
}
