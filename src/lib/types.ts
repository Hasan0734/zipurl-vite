


export type User = {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    is_verified: boolean,
    two_factor_enabled: boolean,
    role: string,
    createdAt: Date,
    updatedAt: Date
}



export type UrlType = {
    _id: string;
    original_url: string;
    short_code: string;
    custom_alias?: string;
    password?: string;
    is_active: boolean;
    expires_at: Date;
    click_count: number;
    owner_id: string;
    createdAt: Date;
    updatedAt: Date
}