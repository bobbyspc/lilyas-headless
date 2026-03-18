"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { updateItemQuantity, removeItem } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "./quantity-selector";

export function CartDrawer() {
    const { cart, isOpen, closeCart, setCart } = useCartStore();
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

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={closeCart}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sand/50 px-6 py-4">
                    <h2 className="text-lg font-semibold">
                        Cart{" "}
                        {cart && cart.totalQuantity > 0 && (
                            <span className="text-earth-muted">({cart.totalQuantity})</span>
                        )}
                    </h2>
                    <button
                        onClick={closeCart}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-linen transition-colors"
                        aria-label="Close cart"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto">
                    {!cart || cart.lines.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full px-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="mb-4 h-16 w-16 text-sand"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                            <p className="text-earth-muted mb-4">Your cart is empty</p>
                            <button
                                onClick={closeCart}
                                className="rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-white hover:bg-forest-dark transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="divide-y divide-sand/30 px-6">
                            {cart.lines.map((line) => (
                                <li key={line.id} className="flex gap-4 py-4">
                                    {line.image && (
                                        <Link
                                            href={`/products/${line.productHandle}`}
                                            onClick={closeCart}
                                            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-linen"
                                        >
                                            <Image
                                                src={line.image.url}
                                                alt={line.image.altText || line.productTitle}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </Link>
                                    )}
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between">
                                            <div>
                                                <Link
                                                    href={`/products/${line.productHandle}`}
                                                    onClick={closeCart}
                                                    className="text-sm font-semibold text-earth hover:text-forest transition-colors"
                                                >
                                                    {line.productTitle}
                                                </Link>
                                                {line.variantTitle !== "Default Title" && (
                                                    <p className="mt-0.5 text-xs text-earth-muted">
                                                        {line.selectedOptions
                                                            .map((o) => o.value)
                                                            .join(" / ")}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium">
                                                {formatPrice(line.totalPrice)}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center gap-3">
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
                                                className="text-xs text-earth-muted underline hover:text-earth transition-colors disabled:opacity-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {cart && cart.lines.length > 0 && (
                    <div className="border-t border-sand/50 px-6 py-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-earth-muted">Subtotal</span>
                            <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                        </div>
                        <p className="text-xs text-earth-muted/70">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <a
                            href={cart.checkoutUrl}
                            className="block w-full rounded-full bg-forest px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-forest-dark transition-colors"
                        >
                            Checkout
                        </a>
                        <button
                            onClick={closeCart}
                            className="block w-full text-center text-sm text-earth-muted underline hover:text-earth transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
