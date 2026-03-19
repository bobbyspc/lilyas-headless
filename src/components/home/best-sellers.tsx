import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/lib/shopify/types";

interface BestSellersProps {
    products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
    return (
        <section className="bg-cream py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <h2 className="font-display text-5xl font-normal tracking-tight text-forest sm:text-6xl">
                            Best Sellers
                        </h2>
                        <p className="mt-4 text-lg text-earth-muted">
                            What everyone&apos;s reaching for right now.
                        </p>
                    </div>
                    <Link
                        href="/collections"
                        className="hidden font-display text-base font-normal tracking-wide text-forest transition-colors hover:text-forest-dark sm:block"
                    >
                        Shop All &rarr;
                    </Link>
                </div>
                <div className="mt-16">
                    <ProductGrid products={products} />
                </div>
                <div className="mt-12 text-center sm:hidden">
                    <Link
                        href="/collections"
                        className="font-display text-base font-normal tracking-wide text-forest"
                    >
                        Shop All &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
