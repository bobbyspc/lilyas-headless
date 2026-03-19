"use client";

import { wholesaleLogout } from "@/lib/wholesale-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function WholesaleLogoutButton() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <button
            onClick={() =>
                startTransition(async () => {
                    await wholesaleLogout();
                    router.refresh();
                })
            }
            disabled={pending}
            className="text-sm font-medium text-earth-muted underline underline-offset-2 transition-colors hover:text-forest disabled:opacity-60"
        >
            {pending ? "Signing out…" : "Sign out"}
        </button>
    );
}
