"use server";

import {
  EditPasswordSchemaValues,
  EditPersonalInformationSchemaValues,
} from "@/schemas";
import { safeApi } from "@/services";

export const updatePersonalInformationAPI = async (
  payload: EditPersonalInformationSchemaValues,
) => await safeApi("POST", "/user/profile/update", payload);

// export const updateEmailAPI = async (payload) =>
//   await safeApi("POST", "/user/profile/update-email", payload);

export const updatePasswordAPI = async (payload: EditPasswordSchemaValues) =>
  await safeApi("POST", "/user/profile/update-password", payload);
