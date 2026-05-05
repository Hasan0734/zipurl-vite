import type { LoginUserSchemaType } from "@/schema/user.schema";
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
