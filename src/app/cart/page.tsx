"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { useCartStore } from "@/lib/cart-store";
import { updateItemQuantity, removeItem } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "@/components/quantity-selector";

export default function CartPage() {
    const { cart, setCart } = useCartStore();
    const [isPending, startTransition] = useTransition();

    function handleUpdateQuantity(lineId: string, quantity: number) {
        startTransition(async () => {
            const updated = await updateItemQuantity(lineId, quantity);
            setCart(updated);
        });
    }

    function handleRemove(lineId: string) {
        startTransition(async () => {
            const updated = await removeItem(lineId);
            setCart(updated);
        });
    }

    if (!cart || cart.lines.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="mx-auto mb-4 h-16 w-16 text-sand"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    <h1 className="font-display text-2xl font-extrabold text-earth">
                        Your cart is empty
                    </h1>
                    <p className="mt-2 text-earth-muted">
                        Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                    <Link
                        href="/collections"
                        className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-forest-dark transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-earth mb-10">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Cart items */}
                <div className="lg:col-span-2">
                    <ul className="divide-y divide-sand/50">
                        {cart.lines.map((line) => (
                            <li key={line.id} className="flex gap-6 py-6">
                                {line.image && (
                                    <Link
                                        href={`/products/${line.productHandle}`}
                                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-linen sm:h-32 sm:w-32"
                                    >
                                        <Image
                                            src={line.image.url}
                                            alt={line.image.altText || line.productTitle}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                    </Link>
                                )}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div>
                                            <Link
                                                href={`/products/${line.productHandle}`}
                                                className="font-semibold text-earth hover:text-forest transition-colors"
                                            >
                                                {line.productTitle}
                                            </Link>
                                            {line.variantTitle !== "Default Title" && (
                                                <p className="mt-1 text-sm text-earth-muted">
                                                    {line.selectedOptions
                                                        .map((o) => `${o.name}: ${o.value}`)
                                                        .join(" · ")}
                                                </p>
                                            )}
                                            {line.vendor && (
                                                <p className="mt-1 text-xs text-earth-muted/70">
                                                    {line.vendor}
                                                </p>
                                            )}
                                        </div>
                                        <p className="font-medium text-earth">
                                            {formatPrice(line.totalPrice)}
                                        </p>
                                    </div>
                                    <div className="mt-3 flex items-center gap-4">
                                        <QuantitySelector
                                            quantity={line.quantity}
                                            onQuantityChange={(qty) =>
                                                handleUpdateQuantity(line.id, qty)
                                            }
                                            disabled={isPending}
                                        />
                                        <button
                                            onClick={() => handleRemove(line.id)}
                                            disabled={isPending}
                                            className="text-sm text-earth-muted underline hover:text-forest transition-colors disabled:opacity-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Order summary */}
                <div>
                    <div className="rounded-2xl border border-sand/50 bg-linen p-6">
                        <h2 className="font-display text-lg font-bold text-earth">
                            Order Summary
                        </h2>
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-earth-muted">Subtotal</span>
                                <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                            </div>
                            {cart.tax && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-earth-muted">Estimated Tax</span>
                                    <span className="font-medium">{formatPrice(cart.tax)}</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t border-sand/50 pt-3">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">{formatPrice(cart.total)}</span>
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-earth-muted">
                            Shipping calculated at checkout.
                        </p>
                        <a
                            href={cart.checkoutUrl}
                            className="mt-6 block w-full rounded-full bg-forest px-6 py-3 text-center text-sm font-bold text-white hover:bg-forest-dark transition-colors"
                        >
                            Proceed to Checkout
                        </a>
                        <Link
                            href="/collections"
                            className="mt-3 block text-center text-sm text-earth-muted underline hover:text-forest transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
