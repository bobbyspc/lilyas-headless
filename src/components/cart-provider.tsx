"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Cart } from "@/lib/shopify/types";

// Hydrates the cart store with server-side cart data on initial load
export function CartProvider({
    cart,
    children,
}: {
    cart: Cart | null;
    children: React.ReactNode;
}) {
    const setCart = useCartStore((s) => s.setCart);

    useEffect(() => {
        setCart(cart);
    }, [cart, setCart]);

    return <>{children}</>;
}
