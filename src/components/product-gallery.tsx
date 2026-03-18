"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Image as ImageType } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
    images: ImageType[];
    focusImageUrl?: string;
};

export function ProductGallery({ images, focusImageUrl }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Sync to variant image when focusImageUrl changes
    useEffect(() => {
        if (!focusImageUrl) return;
        const idx = images.findIndex((img) => img.url === focusImageUrl);
        if (idx !== -1) setSelectedIndex(idx);
    }, [focusImageUrl, images]);

    if (images.length === 0) {
        return (
            <div className="aspect-square rounded-2xl bg-linen flex items-center justify-center text-earth-muted/50">
                No image
            </div>
        );
    }

    const selected = images[selectedIndex];

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-linen">
                <Image
                    src={selected.url}
                    alt={selected.altText || "Product image"}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={img.url}
                            onClick={() => setSelectedIndex(i)}
                            className={cn(
                                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                                i === selectedIndex
                                    ? "border-forest"
                                    : "border-transparent hover:border-sand"
                            )}
                        >
                            <Image
                                src={img.url}
                                alt={img.altText || `Product image ${i + 1}`}
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
