"use server";

import { AuthResponse } from "@/types";
import { safeApi } from "..";
import {
  LoginSchemaValues,
  ResetPasswordSchemaValues,
  ResendOtpSchemaValues,
  VerifyOtpSchemaValues,
} from "@/schemas";
import { SignUpSchemaValues } from "@/schemas/auth/sign-up";

export const loginAPI = async (payload: LoginSchemaValues) =>
  await safeApi<AuthResponse>("POST", "/auth/login", payload);

export const registerAPI = async (payload: SignUpSchemaValues) =>
  await safeApi("POST", "/auth/register", payload);

export const sendOrResendOtpAPI = async (payload: ResendOtpSchemaValues) =>
  await safeApi("POST", "/auth/resend-otp", payload);

export const verifyOtpAPI = async (payload: VerifyOtpSchemaValues) =>
  await safeApi<AuthResponse>("POST", "/auth/verify-otp", payload);

export const resetPasswordAPI = async (payload: ResetPasswordSchemaValues) =>
  await safeApi("POST", "/auth/reset-password", payload);

export const logoutAPI = async () => await safeApi("POST", "/auth/logout");
