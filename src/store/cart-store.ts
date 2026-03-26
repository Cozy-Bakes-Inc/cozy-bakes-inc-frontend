"use client";

import { create } from "zustand";

const CART_COOKIE_KEY = "cozy_bakes_cart";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type CartItem = {
  id: string;
  slug?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: AddCartItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
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
        title: String(item.title ?? ""),
        price: Number(item.price ?? 0),
        image: String(item.image ?? ""),
        quantity: Math.max(1, Number(item.quantity ?? 1)),
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

const initialItems =
  typeof window === "undefined" ? [] : readCartCookie();

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,
  isCartOpen: false,
  addItem: (item) =>
    set((state) => {
      const quantity = Math.max(1, item.quantity ?? 1);
      const existing = state.items.find((current) => current.id === item.id);

      const nextItems = existing
        ? state.items.map((current) =>
            current.id === item.id
              ? { ...current, quantity: current.quantity + quantity }
              : current,
          )
        : [...state.items, { ...item, quantity }];

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
      const nextQuantity = Math.max(1, quantity);
      const nextItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      );
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
