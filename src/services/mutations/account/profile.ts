"use server";

import { LoginSchemaValues } from "@/schemas";
import { safeApi } from "@/services";

export const updateEmailAPI = async (payload: LoginSchemaValues) =>
  await safeApi("POST", "/user/profile/update-email", payload);

export const updatePersonalInformationAPI = async (
  payload: LoginSchemaValues,
) => await safeApi("POST", "/user/profile/update", payload);
