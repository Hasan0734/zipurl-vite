


export type User = {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    is_verified: boolean,
    two_factor_enabled: boolean,
    role: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}


export type Owner = {
    _id: string,
    first_name: string,
    last_name: string
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
    owner_id:  Owner | string;
    createdAt: Date;
    updatedAt: Date
}


export type StatType = {
    total: number,
    totalClicks: number,
    activeLinks: number,
    last24HoursAgo: number,
    last24HoursClicks: number,
    todayCreated: number

}

export type Countries = {
    countries: string,
    clicks: number,
    percentage: number
}

export type Devices = {
    device: string,
    clicks: number,
    percentage: number
}

export type WeeklyClicks = {
    day: string;
    clicks: number,
    previous: number
}

export type LastAgoData = {
    date: string;
    day: string;
    clicks: number
}