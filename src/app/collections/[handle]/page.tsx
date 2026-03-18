import { notFound } from "next/navigation";
import { getCollectionByHandle } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import { CollectionSortSelect } from "./sort-select";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ sort?: string; after?: string }>;
};

const SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
    "best-selling": { sortKey: "BEST_SELLING", reverse: false },
    "price-asc": { sortKey: "PRICE", reverse: false },
    "price-desc": { sortKey: "PRICE", reverse: true },
    newest: { sortKey: "CREATED", reverse: true },
    "a-z": { sortKey: "TITLE", reverse: false },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const collection = await getCollectionByHandle(handle, { first: 1 });
    if (!collection) return {};
    return {
        title: `${collection.title} — LILYAS`,
        description: collection.description || `Shop ${collection.title}`,
    };
}

export default async function CollectionPage({ params, searchParams }: Props) {
    const { handle } = await params;
    const { sort, after } = await searchParams;
    const sortOption = SORT_MAP[sort ?? ""] ?? SORT_MAP["best-selling"];

    const collection = await getCollectionByHandle(handle, {
        first: 20,
        after,
        sortKey: sortOption.sortKey,
        reverse: sortOption.reverse,
    });

    if (!collection) notFound();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-earth">
                        {collection.title}
                    </h1>
                    {collection.description && (
                        <p className="mt-2 max-w-2xl text-earth-muted">
                            {collection.description}
                        </p>
                    )}
                </div>
                <CollectionSortSelect current={sort} />
            </div>

            <ProductGrid products={collection.products} />

            {/* Load more */}
            {collection.pageInfo.hasNextPage && collection.pageInfo.endCursor && (
                <div className="mt-12 text-center">
                    <a
                        href={`/collections/${handle}?sort=${sort ?? "best-selling"}&after=${collection.pageInfo.endCursor}`}
                        className="inline-block rounded-full border-2 border-forest px-6 py-3 text-sm font-bold text-forest transition-all hover:bg-forest hover:text-white"
                    >
                        Load more products
                    </a>
                </div>
            )}
        </div>
    );
}
