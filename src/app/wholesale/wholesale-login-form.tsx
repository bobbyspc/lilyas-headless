"use client";

import { useActionState } from "react";
import { wholesaleLogin } from "@/lib/wholesale-actions";

export function WholesaleLoginForm() {
    const [state, formAction, pending] = useActionState(wholesaleLogin, {
        error: null,
    });

    return (
        <form action={formAction} className="flex flex-col gap-5">
            {state.error && (
                <div className="rounded-xl border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-sm text-terracotta">
                    {state.error}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium tracking-wide text-earth"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded-xl border border-sand/60 bg-white px-4 py-3 text-base text-earth placeholder:text-earth-muted/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    placeholder="you@business.com"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium tracking-wide text-earth"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="rounded-xl border border-sand/60 bg-white px-4 py-3 text-base text-earth placeholder:text-earth-muted/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="mt-2 rounded-full bg-forest py-3.5 text-sm font-bold tracking-wide text-cream transition-colors hover:bg-forest-dark disabled:opacity-60"
            >
                {pending ? "Signing in…" : "Sign In"}
            </button>
        </form>
    );
}
