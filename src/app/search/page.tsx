import { searchProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search — LILYAS",
};

type Props = {
    searchParams: Promise<{ q?: string; after?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
    const { q, after } = await searchParams;
    const query = q?.trim() ?? "";

    const results = query
        ? await searchProducts(query, { first: 20, after })
        : null;

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h1 className="font-display text-3xl font-normal uppercase tracking-tight text-earth">
                    Search
                </h1>
                <form action="/search" method="GET" className="mt-4 max-w-lg">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="Search products..."
                            className="flex-1 rounded-full border border-sand bg-cream px-4 py-3 text-sm text-earth outline-none transition-colors placeholder:text-earth-muted/50 focus:border-forest focus:ring-1 focus:ring-forest"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {!query && (
                <div className="py-20 text-center">
                    <p className="text-earth-muted">
                        Enter a search term to find products.
                    </p>
                </div>
            )}

            {query && results && (
                <>
                    <p className="mb-6 text-sm text-earth-muted">
                        {results.totalCount} result{results.totalCount !== 1 ? "s" : ""} for
                        &ldquo;{query}&rdquo;
                    </p>
                    <ProductGrid products={results.products} />

                    {results.pageInfo.hasNextPage && results.pageInfo.endCursor && (
                        <div className="mt-12 text-center">
                            <a
                                href={`/search?q=${encodeURIComponent(query)}&after=${results.pageInfo.endCursor}`}
                                className="inline-block rounded-full border-2 border-forest px-6 py-3 text-sm font-bold text-forest transition-all hover:bg-forest hover:text-white"
                            >
                                Load more results
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
