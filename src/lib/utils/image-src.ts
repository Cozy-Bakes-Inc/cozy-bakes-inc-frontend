import type { ImageProps } from "next/image";

export const FALLBACK_IMAGE_SRC = "/images/logo.png";

const ALLOWED_REMOTE_IMAGE_HOSTS = new Set(["cozybakesinc.apianca.online"]);

export function normalizeImageSrc(
  src: ImageProps["src"] | string | null | undefined,
): ImageProps["src"] | string {
  if (typeof src !== "string") return src || FALLBACK_IMAGE_SRC;

  const trimmedSrc = src.trim();
  if (!trimmedSrc) return FALLBACK_IMAGE_SRC;

  if (trimmedSrc.startsWith("/public/")) {
    return trimmedSrc.replace(/^\/public/, "");
  }

  if (!/^https?:\/\//i.test(trimmedSrc)) {
    return trimmedSrc;
  }

  try {
    const url = new URL(trimmedSrc);

    if (ALLOWED_REMOTE_IMAGE_HOSTS.has(url.hostname)) {
      return trimmedSrc;
    }
  } catch {
    return FALLBACK_IMAGE_SRC;
  }

  return FALLBACK_IMAGE_SRC;
}

export function isFallbackImageSrc(src: string | null | undefined) {
  return normalizeImageSrc(src) === FALLBACK_IMAGE_SRC;
}

