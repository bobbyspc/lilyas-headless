"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { SearchInput } from "./search-input";
import { useState, useEffect, useRef } from "react";

export function Header() {
    const { toggleCart, cart } = useCartStore();
    const [mobileOpen, setMobileOpen] = useState(false);
    const totalQuantity = cart?.totalQuantity ?? 0;
    const promoRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const promoHeight = promoRef.current?.offsetHeight ?? 0;
            setScrolled(window.scrollY > promoHeight);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top promo bar */}
            <div ref={promoRef} className="bg-cream px-4 py-2 text-center text-xs font-bold tracking-widest text-forest sm:text-sm">
                <Link href="#" className="hover:underline">
                    Products for delivery in the Tampa Bay area! &rarr;
                </Link>
            </div>

            <header
                className={`fixed left-2 right-2 z-30 mx-auto max-w-6xl rounded-2xl border border-sand/30 bg-white shadow-lg transition-[top] duration-300 sm:left-4 sm:right-4 ${scrolled ? "top-2 sm:top-4" : "top-12 sm:top-14"}`}
            >
                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Left: Mobile menu button (visible on mobile) */}
                    <div className="flex flex-1 items-center lg:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-cream transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Left: Desktop Nav Links (hidden on mobile) */}
                    <nav className="hidden flex-1 items-center gap-10 lg:flex">
                        <Link href="/collections" className="font-sans text-base font-normal tracking-wide text-forest transition-colors hover:text-forest-dark">
                            Products
                        </Link>
                        <Link href="/blog" className="font-sans text-base font-normal tracking-wide text-forest transition-colors hover:text-forest-dark">
                            Blog
                        </Link>
                        <Link href="/wholesale" className="font-sans text-base font-normal tracking-wide text-forest transition-colors hover:text-forest-dark">
                            Wholesale
                        </Link>
                    </nav>

                    {/* Center: Logo */}
                    <div className="flex flex-1 justify-center">
                        <Link href="/">
                            <Image
                                src="/lilyas-logo.png"
                                alt="Lilya's"
                                width={120}
                                height={48}
                                className="h-10 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-1 items-center justify-end gap-5">
                        <Link href="/pages/store-locator" className="hidden lg:flex items-center gap-2 font-sans text-base font-normal tracking-wide text-forest transition-colors hover:text-forest-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            Find a Store
                        </Link>

                        <div className="flex items-center gap-3">
                            <SearchInput />
                            <Link href="/account/login" className="flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-cream transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </Link>
                            <button
                                onClick={toggleCart}
                                className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest hover:bg-cream transition-colors"
                                aria-label="Open cart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                {totalQuantity > 0 && (
                                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest-dark text-[10px] font-bold text-white">
                                        {totalQuantity}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile nav */}
                {mobileOpen && (
                    <nav className="border-t border-sand/30 bg-white px-4 py-6 lg:hidden">
                        <div className="flex flex-col gap-4">
                            <Link href="/collections" onClick={() => setMobileOpen(false)} className="font-sans text-lg font-normal tracking-wide text-forest">
                                Products
                            </Link>
                            <Link href="/blog" onClick={() => setMobileOpen(false)} className="font-sans text-lg font-normal tracking-wide text-forest">
                                Blog
                            </Link>
                            <Link href="/wholesale" onClick={() => setMobileOpen(false)} className="font-sans text-lg font-normal tracking-wide text-forest">
                                Wholesale
                            </Link>
                            <Link href="/pages/store-locator" onClick={() => setMobileOpen(false)} className="font-sans text-lg font-normal tracking-wide text-forest">
                                Find a Store
                            </Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
}
