import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";

type CollectionCardProps = {
    collection: Omit<Collection, "products" | "pageInfo">;
};

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link
            href={`/collections/${collection.handle}`}
            className="group relative block aspect-4/3 overflow-hidden rounded-2xl bg-linen"
        >
            {collection.image ? (
                <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full items-center justify-center bg-sage-light/30" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-forest-dark/70 via-forest-dark/0 to-forest-dark/0" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold text-white">
                    {collection.title}
                </h3>
                {collection.description && (
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                        {collection.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
