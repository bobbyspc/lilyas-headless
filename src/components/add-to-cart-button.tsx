"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { addItemToCart } from "@/lib/cart-actions";
import { useCartStore } from "@/lib/cart-store";

type AddToCartButtonProps = {
    variantId: string;
    availableForSale: boolean;
    quantity?: number;
};

export function AddToCartButton({
    variantId,
    availableForSale,
    quantity = 1,
}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);
    const { setCart, openCart } = useCartStore();

    function handleAdd() {
        setMessage(null);
        startTransition(async () => {
            try {
                const cart = await addItemToCart(variantId, quantity);
                setCart(cart);
                openCart();
            } catch (error) {
                setMessage(
                    error instanceof Error ? error.message : "Failed to add to cart"
                );
            }
        });
    }

    if (!availableForSale) {
        return (
            <button
                disabled
                className="w-full rounded-full bg-linen px-6 py-3.5 text-sm font-bold text-earth-muted cursor-not-allowed"
            >
                Sold Out
            </button>
        );
    }

    return (
        <div>
            <button
                onClick={handleAdd}
                disabled={isPending || !variantId}
                className={cn(
                    "w-full rounded-full bg-forest px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all",
                    "hover:bg-forest-dark active:scale-[0.98]",
                    "disabled:cursor-not-allowed disabled:bg-sage-light"
                )}
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Adding...
                    </span>
                ) : (
                    "Add to Cart"
                )}
            </button>
            {message && (
                <p className="mt-2 text-sm text-terracotta">{message}</p>
            )}
        </div>
    );
}
