"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { SearchInput } from "./search-input";
import { useState } from "react";

const NAV_LINKS = [
    { label: "Shop", href: "/collections" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
];

export function Header() {
    const { toggleCart, cart } = useCartStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const totalQuantity = cart?.totalQuantity ?? 0;

    return (
        <header className="sticky top-0 z-30 border-b border-sand/50 bg-cream/90 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-earth hover:bg-linen transition-colors lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        )}
                    </svg>
                </button>

                {/* Logo */}
                <Link href="/" className="font-display text-xl font-extrabold uppercase tracking-widest text-forest">
                    LILYAS
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-display text-sm font-semibold uppercase tracking-wide text-earth-muted transition-colors hover:text-forest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <SearchInput />
                    <button
                        onClick={toggleCart}
                        className="relative flex h-9 w-9 items-center justify-center rounded-full text-earth hover:bg-linen transition-colors"
                        aria-label="Open cart"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        {totalQuantity > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">
                                {totalQuantity}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {mobileOpen && (
                <nav className="border-t border-sand/30 bg-cream px-4 py-4 lg:hidden">
                    <div className="space-y-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block font-display text-sm font-semibold uppercase tracking-wide text-earth-muted hover:text-forest transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
