import { getWholesaleCustomer } from "@/lib/wholesale-actions";
import { WholesaleLoginForm } from "./wholesale-login-form";
import { WholesaleLogoutButton } from "./wholesale-logout-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wholesale Partners | Lilya's",
    description:
        "Sign in to your Lilya's wholesale account to access partner pricing and bulk ordering.",
};

export default async function WholesalePage() {
    const customer = await getWholesaleCustomer();

    if (customer) {
        return (
            <div className="mx-auto max-w-lg px-4 pt-40 pb-24 sm:pt-48">
                <div className="rounded-3xl border border-sand/40 bg-white p-8 sm:p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-light/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-7 w-7 text-forest"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="font-display text-3xl font-normal text-forest">
                            Welcome back, {customer.firstName || customer.displayName}
                        </h1>
                        <p className="mt-2 text-base text-earth-muted">
                            You&apos;re signed in to your wholesale account.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sand/30 bg-cream/50 p-5">
                        <p className="text-sm leading-relaxed text-earth-muted">
                            To place a wholesale order or view partner pricing,
                            please reach out to our team at{" "}
                            <a
                                href="mailto:wholesale@lilyastea.com"
                                className="font-medium text-forest underline underline-offset-2 hover:text-forest-dark"
                            >
                                wholesale@lilyastea.com
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <WholesaleLogoutButton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg px-4 pt-40 pb-24 sm:pt-48">
            <div className="rounded-3xl border border-sand/40 bg-white p-8 sm:p-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-light/30">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7 text-forest"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 002.25-1.016 2.993 2.993 0 002.25 1.016m0 0a2.999 2.999 0 002.25-1.015 2.993 2.993 0 002.25 1.015m0 0a2.999 2.999 0 002.25-1.015"
                            />
                        </svg>
                    </div>
                    <h1 className="font-display text-3xl font-normal text-forest sm:text-4xl">
                        Wholesale Partners
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-earth-muted">
                        Sign in with your Shopify account to access wholesale
                        pricing and place bulk orders.
                    </p>
                </div>

                <WholesaleLoginForm />

                <p className="mt-6 text-center text-sm text-earth-muted">
                    Interested in becoming a wholesale partner?{" "}
                    <a
                        href="mailto:wholesale@lilyastea.com"
                        className="font-medium text-forest underline underline-offset-2 hover:text-forest-dark"
                    >
                        Contact us
                    </a>
                </p>
            </div>
        </div>
    );
}
