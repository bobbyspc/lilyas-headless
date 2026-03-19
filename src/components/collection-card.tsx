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
            className="group flex flex-col items-center text-center"
        >
            <div className="aspect-square w-full rounded-2xl border-2 border-forest p-3">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
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
                </div>
            </div>
            <h3 className="mt-4 font-display text-2xl font-normal text-forest">
                {collection.title}
            </h3>
        </Link>
    );
}
