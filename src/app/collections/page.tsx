import { getCollections } from "@/lib/shopify";
import { CollectionCard } from "@/components/collection-card";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Collections — LILYAS",
    description: "Browse our curated collections",
};

export default async function CollectionsPage() {
    const collections = await getCollections(20);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h1 className="font-display text-3xl font-normal uppercase tracking-tight text-earth">
                    Collections
                </h1>
                <p className="mt-2 text-earth-muted">
                    Browse our curated collections and find what you love.
                </p>
            </div>

            {collections.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-earth-muted">No collections found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            )}
        </div>
    );
}
