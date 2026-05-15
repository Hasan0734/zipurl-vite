import type { LoginUserSchemaType, PasswordSchemaType } from "@/schema/user.schema";
import api from "./api";

export const userLogin = async (data: LoginUserSchemaType) => {
  try {
    const res = await api.post("/auth/sign-in", data);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

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

export const deleteUrlById = async (id: string) => {
  try {
    const res = await api.delete(`/urls/${id}`);
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

export const getStatSummary = async () => {
  try {
    const res = await api.get("/urls/stats/summary");
    return res.data;
  } catch (error: any) {
    return error.response.data
  }
}

export const checkCustomAlias = async (data: { custom_alias: string, url_id?: string }) => {
  try {
    const res = await api.post("/urls/check/custom-alias", data);
    return res.data;
  } catch (e: any) {
    return e.reponse.data
  }
}

