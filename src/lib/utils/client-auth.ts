"use client";

import toast from "react-hot-toast";
import { removeToken } from "./auth";
import { getQueryClient } from "./query";

let isHandlingUnauthorized = false;

async function clearClientSession() {
  try {
    await removeToken();
  } catch {
    // Ignore token cleanup failures and continue the logout flow.
  }

  const queryClient = getQueryClient();
  queryClient.removeQueries({ queryKey: ["authenticatedUser"] });
  queryClient.clear();
}

function redirectToLogin(returnTo?: string) {
  const loginUrl = new URL("/login", window.location.origin);

  if (returnTo) {
    loginUrl.searchParams.set("returnTo", returnTo);
  }

  window.location.assign(loginUrl.toString());
}

export async function handleUnauthorizedSession() {
  if (typeof window === "undefined" || isHandlingUnauthorized) return;

  isHandlingUnauthorized = true;

  try {
    await clearClientSession();

    toast.error("Your session has expired. Please log in again.");

    const returnTo = `${window.location.pathname}${window.location.search}`;
    redirectToLogin(returnTo);
  } finally {
    window.setTimeout(() => {
      isHandlingUnauthorized = false;
    }, 1000);
  }
}

export async function handleLogoutSession() {
  if (typeof window === "undefined") return;

  await clearClientSession();
  redirectToLogin();
}
