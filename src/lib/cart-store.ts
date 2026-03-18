"use client";

import { create } from "zustand";
import type { Cart } from "@/lib/shopify/types";

type CartState = {
    cart: Cart | null;
    isOpen: boolean;
    isLoading: boolean;
    setCart: (cart: Cart | null) => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    setLoading: (loading: boolean) => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    isOpen: false,
    isLoading: false,
    setCart: (cart) => set({ cart }),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    setLoading: (isLoading) => set({ isLoading }),
}));
