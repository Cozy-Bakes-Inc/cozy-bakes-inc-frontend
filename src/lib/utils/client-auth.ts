"use client";

const TOKEN_KEY = "token";

export function hasAuthToken() {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(`${TOKEN_KEY}=`));
}
