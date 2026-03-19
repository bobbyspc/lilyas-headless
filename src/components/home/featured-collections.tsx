import Link from "next/link";
import { CollectionCard } from "@/components/collection-card";
import type { Collection } from "@/lib/shopify/types";

interface FeaturedCollectionsProps {
    collections: Omit<Collection, "products" | "pageInfo">[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
    if (collections.length === 0) return null;

    return (
        <section className="bg-cream py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-5xl font-normal tracking-tight text-forest sm:text-6xl">
                        Shop by Category
                    </h2>
                    <p className="mt-6 max-w-xl text-lg text-earth-muted">
                        Explore our curated collections, made with love right here from the earth.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.slice(0, 3).map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>

            </div>
        </section>
    );
}
