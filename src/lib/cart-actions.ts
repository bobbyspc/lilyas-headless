"use server";

import {
    createCart as shopifyCreateCart,
    addToCart as shopifyAddToCart,
    updateCartLines as shopifyUpdateCartLines,
    removeCartLines as shopifyRemoveCartLines,
    getCart as shopifyGetCart,
} from "@/lib/shopify";
import type { Cart } from "@/lib/shopify/types";
import { cookies } from "next/headers";

const CART_COOKIE = "shopify_cart_id";

async function getCartId(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(CART_COOKIE)?.value;
}

async function setCartId(cartId: string) {
    const cookieStore = await cookies();
    cookieStore.set(CART_COOKIE, cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
    });
}

export async function getServerCart(): Promise<Cart | null> {
    const cartId = await getCartId();
    if (!cartId) return null;
    try {
        return await shopifyGetCart(cartId);
    } catch {
        return null;
    }
}

export async function addItemToCart(
    variantId: string,
    quantity = 1
): Promise<Cart> {
    const cartId = await getCartId();

    if (cartId) {
        const cart = await shopifyAddToCart(cartId, [
            { merchandiseId: variantId, quantity },
        ]);
        return cart;
    }

    const cart = await shopifyCreateCart([
        { merchandiseId: variantId, quantity },
    ]);
    await setCartId(cart.id);
    return cart;
}

export async function updateItemQuantity(
    lineId: string,
    quantity: number
): Promise<Cart | null> {
    const cartId = await getCartId();
    if (!cartId) return null;

    if (quantity <= 0) {
        return shopifyRemoveCartLines(cartId, [lineId]);
    }

    return shopifyUpdateCartLines(cartId, [{ id: lineId, quantity }]);
}

export async function removeItem(lineId: string): Promise<Cart | null> {
    const cartId = await getCartId();
    if (!cartId) return null;
    return shopifyRemoveCartLines(cartId, [lineId]);
}
