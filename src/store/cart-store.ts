"use client";

import { normalizeImageSrc } from "@/lib/utils/image-src";
import { create } from "zustand";

const CART_COOKIE_KEY = "cozy_bakes_cart";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const MAX_CART_ITEM_QUANTITY = 100;

export type CartItem = {
  id: string;
  slug?: string;
  price_id?: number;
  title: string;
  price: number;
  unitPrice?: number;   // price per single item — used to recalculate price when flavors change
  image: string;
  quantity: number;
  priceLabel?: string;
  priceType?: string;
  packQuantity?: number;
  flavors?: Record<string, number>;
};

type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  hydrateCart: () => void;
  addItem: (item: AddCartItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemImage: (id: string, image: string) => void;
  updateItemFlavors: (id: string, flavors: Record<string, number>) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

function readCartCookie(): CartItem[] {
  if (typeof document === "undefined") return [];

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CART_COOKIE_KEY}=`))
    ?.split("=")[1];

  if (!cookieValue) return [];

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue)) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.id === "string")
      .map((item) => ({
        id: item.id,
        slug:
          typeof item.slug === "string" && item.slug.length > 0
            ? item.slug
            : item.id,
        price_id: typeof item.price_id === "number" ? item.price_id : undefined,
        title: String(item.title ?? ""),
        price: Number(item.price ?? 0),
        unitPrice: typeof item.unitPrice === "number" ? item.unitPrice : undefined,
        image: String(normalizeImageSrc(item.image)),
        quantity: Math.max(1, Number(item.quantity ?? 1)),
        priceLabel: typeof item.priceLabel === "string" ? item.priceLabel : undefined,
        priceType: typeof item.priceType === "string" ? item.priceType : undefined,
        packQuantity: typeof item.packQuantity === "number" ? item.packQuantity : undefined,
        flavors:
          item.flavors && typeof item.flavors === "object" && !Array.isArray(item.flavors)
            ? (item.flavors as Record<string, number>)
            : undefined,
      }));
  } catch {
    return [];
  }
}

function writeCartCookie(items: CartItem[]) {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(items));
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,

  hydrateCart: () => set({ items: readCartCookie() }),

  addItem: (item) =>
    set((state) => {
      const quantity = Math.max(1, item.quantity ?? 1);
      const existing = state.items.find((current) => current.id === item.id);

      let nextItems: CartItem[];

      if (existing && existing.unitPrice != null && item.flavors) {
        // Per-unit flavor item: merge incoming flavors into existing ones, capped at the limit
        const merged = { ...(existing.flavors ?? {}) };
        let remaining =
          MAX_CART_ITEM_QUANTITY - Object.values(merged).reduce((a, b) => a + b, 0);
        Object.entries(item.flavors).forEach(([flavor, count]) => {
          const added = Math.max(0, Math.min(count, remaining));
          merged[flavor] = (merged[flavor] ?? 0) + added;
          remaining -= added;
        });
        const totalCount = Object.values(merged).reduce((a, b) => a + b, 0);
        nextItems = state.items.map((current) =>
          current.id === item.id
            ? { ...current, flavors: merged, price: existing.unitPrice! * totalCount }
            : current,
        );
      } else if (existing) {
        // Pack or no-flavor item: increment quantity
        nextItems = state.items.map((current) =>
          current.id === item.id
            ? {
                ...current,
                quantity: Math.min(MAX_CART_ITEM_QUANTITY, current.quantity + quantity),
              }
            : current,
        );
      } else {
        // Brand new item — prepend so newest appears first
        nextItems = [
          {
            ...item,
            image: String(normalizeImageSrc(item.image)),
            quantity: Math.min(MAX_CART_ITEM_QUANTITY, quantity),
          },
          ...state.items,
        ];
      }

      writeCartCookie(nextItems);
      return { items: nextItems };
    }),

  removeItem: (id) =>
    set((state) => {
      const nextItems = state.items.filter((item) => item.id !== id);
      writeCartCookie(nextItems);
      return { items: nextItems };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const nextItems = state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(MAX_CART_ITEM_QUANTITY, Math.max(1, quantity)) }
          : item,
      );
      writeCartCookie(nextItems);
      return { items: nextItems };
    }),

  updateItemImage: (id, image) =>
    set((state) => {
      const nextItems = state.items.map((item) =>
        item.id === id ? { ...item, image: String(normalizeImageSrc(image)) } : item,
      );
      writeCartCookie(nextItems);
      return { items: nextItems };
    }),

  updateItemFlavors: (id, flavors) =>
    set((state) => {
      const totalCount = Object.values(flavors).reduce((a, b) => a + b, 0);

      // Remove the item entirely when all flavors reach zero
      const nextItems =
        totalCount === 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) => {
              if (item.id !== id) return item;
              const newPrice =
                item.unitPrice != null
                  ? totalCount * item.unitPrice
                  : item.price;
              return { ...item, flavors, price: newPrice };
            });

      writeCartCookie(nextItems);
      return { items: nextItems };
    }),

  clearCart: () =>
    set(() => {
      writeCartCookie([]);
      return { items: [] };
    }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
