import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string, size: string, color: string) => void;
  setQty: (id: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

const key = (id: string, s: string, c: string) => `${id}__${s}__${c}`;

const isValidObjectId = (id: string): boolean => /^[a-f\d]{24}$/i.test(id);

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const k = key(item.product.id, item.size, item.color);
          const exists = s.items.find((i) => key(i.product.id, i.size, i.color) === k);
          if (exists) {
            return {
              items: s.items.map((i) =>
                key(i.product.id, i.size, i.color) === k ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      remove: (id, s, c) =>
        set((st) => ({ items: st.items.filter((i) => key(i.product.id, i.size, i.color) !== key(id, s, c)) })),
      setQty: (id, s, c, qty) =>
        set((st) => ({
          items: st.items.map((i) =>
            key(i.product.id, i.size, i.color) === key(id, s, c) ? { ...i, qty: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((a, i) => a + i.product.price * i.qty, 0),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
    }),
    {
      name: "luxora-cart",
      // Version 2: invalidates any persisted cart that was stored before MongoDB ObjectIds
      // were used as product ids (e.g. items with ids like "p1", "p2", etc.).
      version: 2,
      migrate: (persistedState: any, fromVersion: number) => {
        // Any state from version < 2 is considered legacy; discard the entire cart.
        if (fromVersion < 2) {
          return { items: [] };
        }
        // For future migrations: strip any items that still somehow carry invalid ids.
        const validItems = (persistedState?.items ?? []).filter(
          (item: CartItem) => isValidObjectId(item?.product?.id ?? ""),
        );
        return { ...persistedState, items: validItems };
      },
    },
  ),
);


type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "luxora-wishlist" },
  ),
);

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loginSuccess: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginSuccess: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "luxora-auth" },
  ),
);

// Self-executing utility to verify and flush legacy, insecure local auth formats
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("luxora-auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state && parsed.state.user && !parsed.state.token) {
        console.warn("Legacy auth state detected without JWT token. Clearing state.");
        localStorage.removeItem("luxora-auth");
      }
    }
  } catch (error) {
    console.error("Failed to clean legacy localStorage keys:", error);
  }
}