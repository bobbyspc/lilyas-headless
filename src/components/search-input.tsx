"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function SearchInput() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            setQuery("");
        }
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-earth hover:bg-linen transition-colors"
                aria-label="Search"
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-x-0 top-0 z-50 mx-auto mt-20 max-w-lg px-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3 shadow-2xl ring-1 ring-sand"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5 text-earth-muted"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="flex-1 bg-transparent text-sm text-earth outline-none placeholder:text-earth-muted/50"
                            />
                            <kbd className="hidden rounded bg-linen px-2 py-0.5 text-xs text-earth-muted sm:inline-block">
                                ESC
                            </kbd>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
