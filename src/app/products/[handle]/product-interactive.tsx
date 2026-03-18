"use client";

import { useState, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductDetails } from "./product-details";
import type { Product, ProductVariant } from "@/lib/shopify/types";

type Props = {
    product: Product;
};

export function ProductInteractive({ product }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // Read variant id from URL once on mount — won't cause server re-renders
    const initialVariantId = searchParams.get("variant") ?? undefined;
    const [focusImageUrl, setFocusImageUrl] = useState<string | undefined>();

    const handleVariantChange = useCallback(
        (variant: ProductVariant | undefined) => {
            // Sync gallery to variant image
            setFocusImageUrl(variant?.image?.url ?? undefined);

            // Update URL without triggering Next.js router / server re-render
            const shortId = variant?.id.split("/").pop();
            const url = shortId ? `${pathname}?variant=${shortId}` : pathname;
            window.history.replaceState(null, "", url);
        },
        [pathname]
    );

    return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.images} focusImageUrl={focusImageUrl} />
            <ProductDetails
                product={product}
                initialVariantId={initialVariantId}
                onVariantChange={handleVariantChange}
            />
        </div>
    );
}

