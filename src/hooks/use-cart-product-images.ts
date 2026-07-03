"use client";

import { useEffect } from "react";
import { isFallbackImageSrc, normalizeImageSrc } from "@/lib/utils/image-src";
import { singleProductAPI } from "@/services/queries";
import { useCartStore } from "@/store/cart-store";

export function useCartProductImages() {
  const items = useCartStore((state) => state.items);
  const updateItemImage = useCartStore((state) => state.updateItemImage);

  useEffect(() => {
    const itemsNeedingImages = items.filter(
      (item) => item.slug && isFallbackImageSrc(item.image),
    );

    if (itemsNeedingImages.length === 0) return;

    let cancelled = false;

    itemsNeedingImages.forEach(async (item) => {
      try {
        const result = await singleProductAPI(item.slug!);
        const productImage = result.data.images?.[0] || result.data.image;
        const normalizedImage = String(normalizeImageSrc(productImage));

        if (!cancelled && !isFallbackImageSrc(normalizedImage)) {
          updateItemImage(item.id, normalizedImage);
        }
      } catch {
        // Keep the existing fallback if the product lookup fails.
      }
    });

    return () => {
      cancelled = true;
    };
  }, [items, updateItemImage]);
}
