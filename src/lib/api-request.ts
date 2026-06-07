import type { ChangePassSchemaType, LoginUserSchemaType, PasswordSchemaType } from "@/schema/user.schema";
import api from "./api";
import type { UpdateUserOptionalPayload } from "./types";

export const userLogin = async (data: LoginUserSchemaType) => {
    try {
        const res = await api.post("/auth/sign-in", data);
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
};

export const getMe = async () => {
    try {
        const me = await api.post("/auth/refresh");
        const data = me.data;
        return data;
    } catch (error: any) {
        return error.response.data
    }
}

export const deleteUserById = async (id: string) => {
    try {
        const res = await api.delete(('/users/' + id))
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const passwordResetRequest = async (email: string) => {
    try {
        const res = await api.post(`/auth/request-password-reset`, { email });
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const resetPassword = async (data: PasswordSchemaType, token: string) => {
    try {
        const res = await api.post(`/auth/reset-password`, { token, ...data });
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const changePassword = async (data: ChangePassSchemaType) => {
    try {
        const res = await api.patch(`/auth/change-password`, data);
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const enable2FA = async (data: { two_factor_enabled: boolean }) => {
    try {
        const res = await api.patch(`/auth/enable-2FA`, data);
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const updateProfile = async (updateDate: UpdateUserOptionalPayload) => {
    try {
        const res = await api.patch('/auth/profile', updateDate)
        return res.data
    } catch (error: any) {
        return error.response.data
    }
}

export const changeUserStatus = async (userId: string, status: string) => {
    try {
        const res = await api.patch(`/users/${userId}`, { status });

        return res.data
    } catch (e: any) {
        return e.response.data;
    }
}

export const resendVerifyEmail = async (email: string) => {
    try {
        const res = await api.post("/auth/resend-verification", { email });
        const data = res.data;
        return data;
    } catch (err: any) {
        return err.response.data;
    }
};

export const verifyEmail = async (token: string) => {
    try {
        const res = await api(`/auth/verify-email?token=${token}`);

        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
};

export const getUrls = async (query: string) => {
    try {
        const res = await api.get("/urls?" + query);
        return res.data;
    } catch (error) {
        return {
            urls: [],
            total: 0
        };
    }
}
export const getUrlsByAdmin = async (query: string) => {
    try {
        const res = await api.get("/admin/urls?" + query);
        return res.data;
    } catch (error) {
        return {
            urls: [],
            total: 0
        };
    }
}
export const deleteUrlById = async (id: string) => {
    try {
        const res = await api.delete(('/urls/' + id))
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
}

export const changeUrlStatus = async (urlId: string, status: string) => {
    try {
        const res = await api.patch(`/admin/urls/status/${urlId}`, { status });
        return res.data
    } catch (e: any) {
        return e.response.data;
    }
}


export const changeUrlNsfw = async (userId: string, is_nsfw: string) => {
    try {
        const res = await api.patch(`/admin/urls/nsfw/${userId}`, { is_nsfw });
        return res.data
    } catch (e: any) {
        return e.response.data;
    }
}
export const addNewUrl = async (data: { original_url: string }) => {
    try {
        const res = await api.post("/urls", data);
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
};

export const updateUrlById = async (data: {}, id: string) => {
    try {
        const res = await api.patch(`/urls/${id}`, data);
        return res.data;
    } catch (err: any) {
        return err.response.data;
    }
};
export const checkCustomAlias = async (data: { custom_alias: string, url_id?: string }) => {
    try {
        const res = await api.post("/urls/check/custom-alias", data);
        return res.data;
    } catch (e: any) {
        return e.response.data
    }
}

export const getClicks = async (query: string) => {
    try {
        const res = await api.get("/clicks?" + query);
        return res.data;
    } catch (error) {
        return {
            clicks: [],
            total: 0
        };
    }
}

export const getClicksStats = async () => {
    try {
        const res = await api.get("/clicks/stats/summary");
        return res.data;
    } catch (error: any) {
        return {
            visitor: 0,
            totalClicks: 0,
            topRegion: {
                city: "",
                count: 0
            },
            todayVisitedCount: 0,
            newVisitorCount: 0,
            topDevice: {
                deivice: '',
                count: 0,
                percentage: 0
            }
        }
    }
}

export const getStatSummary = async () => {
    try {
        const res = await api.get("/urls/stats/summary");
        return res.data;
    } catch (error: any) {
        return {
            total: 0,
            activeLinks: 0,
            todayCreated: 0,
            last24HoursAgo: 0,
            totalClicks: 0,
            last24HoursClicks: 0,
            visitor: 0,
            expiredLinks: 0,
            topRegion: {
                city: '',
                count: 0
            }
        }
    }
}


export const getAdminStatSummary = async () => {
    try {
        const res = await api.get("/analytics/stats")
        return res.data;
    } catch (e: any) {
        return {
            activeUrls: 0,
            todayCreatedUrls: 0,
            totalClicks: 0,
            totalUrls: 0,
            totalUser: 0,
            visitor: 0
        }
    }
}

export const getAnalytics = async () => {
    try {
        const res = await api.get("/analytics");
        return res.data;
    } catch (error: any) {
        return error.response.data
    }
}

export const getClicksAnalytics = async () => {
    try {
        const res = await api.get("/analytics/clicks");
        return res.data;
    } catch (error: any) {
        return {
            last6DaysUsers: [],
            last30DaysUsers: [],
            last90DaysUsers: [],
        }
    }
}
export const getUsersAnalytics = async () => {
    try {
        const res = await api.get("/analytics/users");
        return res.data;
    } catch (error: any) {
        return {
            last6DaysUsers: [],
            last30DaysUsers: [],
            last90DaysUsers: [],
        }
    }
}

export const getUrlsAnalytics = async () => {
    try {
        const res = await api.get("/analytics/urls");
        return res.data;
    } catch (error: any) {
        return {
            last6DaysUrls: [],
            last30DaysUrls: [],
            last90DaysUrls: [],
        }
    }
}

export const getUrlAnalytics = async (id: string) => {
    try {
        const res = await api.get(`/urls/analytics/${id}`);
        return res.data;
    } catch (error: any) {
        return error.response.data
    }
}


export const getUsers = async (query: string) => {
    try {
        const res = await api.get(`/users?` + query);
        return res.data;
    } catch (e: any) {
        return e.response.data
    }
}

export const getUsersStats = async () => {
    try {
        const res = await api.get('/users/stats/summary')
        return res.data

    } catch (e: any) {
        return {
            activeUsers: 0,
            blockUsers: 0,
            notVerified: 0,
            pendingUsers: 0,
            todayCreated: 0,
            totalUsers: 0,
            verified: 0
        }

    }
}

export const getAdminUrlStats = async () => {
    try {
        const res = await api.get("/admin/urls/stats/summary");
        return res.data;
    } catch (e: any) {
        return {
            activeUrls: 0,
            todayCreatedUrls: 0,
            totalClicks: 0,
            totalUrls: 0,
            todayCreated: 0,
            visitor: 0,

        }
    }
}

