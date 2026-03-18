import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
    const hasComparePrice =
        product.compareAtPriceRange.min.amount > product.priceRange.min.amount;

    return (
        <Link
            href={`/products/${product.handle}`}
            className="group block"
        >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-linen">
                {product.featuredImage ? (
                    <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-earth-muted/50">
                        No image
                    </div>
                )}
                {!product.availableForSale && (
                    <div className="absolute inset-0 flex items-center justify-center bg-cream/70">
                        <span className="text-sm font-semibold text-earth-muted">
                            Sold Out
                        </span>
                    </div>
                )}
                {hasComparePrice && product.availableForSale && (
                    <div className="absolute left-3 top-3 rounded-full bg-terracotta px-2.5 py-0.5 text-xs font-bold text-white">
                        Sale
                    </div>
                )}
            </div>
            <div className="mt-3 space-y-1">
                {product.vendor && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-earth-muted">
                        {product.vendor}
                    </p>
                )}
                <h3 className="text-sm font-semibold text-earth group-hover:text-forest transition-colors">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2">
                    <span
                        className={`text-sm font-semibold ${hasComparePrice ? "text-terracotta" : "text-earth"}`}
                    >
                        {formatPrice(product.priceRange.min)}
                    </span>
                    {hasComparePrice && (
                        <span className="text-sm text-earth-muted/60 line-through">
                            {formatPrice(product.compareAtPriceRange.min)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
