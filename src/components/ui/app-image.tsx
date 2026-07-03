"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE_SRC, normalizeImageSrc } from "@/lib/utils/image-src";

type AppImageProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"] | null;
  fallbackSrc?: ImageProps["src"];
};

function hasImageSrc(src: AppImageProps["src"]): src is ImageProps["src"] {
  return typeof src === "string" ? src.trim().length > 0 : Boolean(src);
}

function AppImage({
  src,
  fallbackSrc = FALLBACK_IMAGE_SRC,
  onError,
  ...props
}: AppImageProps) {
  const resolvedSrc = hasImageSrc(src) ? normalizeImageSrc(src) : fallbackSrc;
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);
  const currentSrc = failedSrc === resolvedSrc ? fallbackSrc : resolvedSrc;

  return (
    <NextImage
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (failedSrc !== resolvedSrc) {
          setFailedSrc(resolvedSrc);
        }

        onError?.(event);
      }}
    />
  );
}

export { AppImage, AppImage as Image, FALLBACK_IMAGE_SRC };
export default AppImage;

