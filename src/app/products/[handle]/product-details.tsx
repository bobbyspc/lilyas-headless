"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { VariantPicker } from "@/components/variant-picker";
import { QuantitySelector } from "@/components/quantity-selector";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductDetails({ product }: { product: Product }) {
    // Initialize selected options with first available variant
    const initialOptions = useMemo(() => {
        const firstAvailable =
            product.variants.find((v) => v.availableForSale) ?? product.variants[0];
        if (!firstAvailable) return {};
        return Object.fromEntries(
            firstAvailable.selectedOptions.map((o) => [o.name, o.value])
        );
    }, [product.variants]);

    const [selectedOptions, setSelectedOptions] =
        useState<Record<string, string>>(initialOptions);
    const [quantity, setQuantity] = useState(1);

    // Find the matching variant
    const selectedVariant = useMemo(() => {
        return product.variants.find((v) =>
            v.selectedOptions.every(
                (opt) => selectedOptions[opt.name] === opt.value
            )
        );
    }, [product.variants, selectedOptions]);

    function handleOptionSelect(name: string, value: string) {
        setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    }

    const price = selectedVariant?.price ?? product.priceRange.min;
    const compareAtPrice = selectedVariant?.compareAtPrice;
    const isOnSale = compareAtPrice && compareAtPrice.amount > price.amount;

    return (
        <div className="flex flex-col gap-6">
            {/* Vendor */}
            {product.vendor && (
                <p className="text-sm font-semibold uppercase tracking-wide text-earth-muted">
                    {product.vendor}
                </p>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-earth">
                {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${isOnSale ? "text-terracotta" : "text-earth"}`}>
                    {formatPrice(price)}
                </span>
                {isOnSale && compareAtPrice && (
                    <span className="text-lg text-earth-muted/60 line-through">
                        {formatPrice(compareAtPrice)}
                    </span>
                )}
                {isOnSale && (
                    <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-bold text-terracotta">
                        Sale
                    </span>
                )}
            </div>

            {/* Availability */}
            {selectedVariant && (
                <p className={`text-sm font-semibold ${selectedVariant.availableForSale ? "text-forest" : "text-terracotta"}`}>
                    {selectedVariant.availableForSale ? "In Stock" : "Out of Stock"}
                </p>
            )}

            {/* Description (short) */}
            {product.description && (
                <p className="text-sm text-earth-muted leading-relaxed line-clamp-4">
                    {product.description}
                </p>
            )}

            {/* Variant Picker */}
            <VariantPicker
                options={product.options}
                selectedOptions={selectedOptions}
                onSelect={handleOptionSelect}
                availableCombinations={product.variants.map((v) => ({
                    selectedOptions: v.selectedOptions,
                    availableForSale: v.availableForSale,
                }))}
            />

            {/* Quantity */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-earth">
                    Quantity
                </label>
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            {/* Add to Cart */}
            <AddToCartButton
                variantId={selectedVariant?.id ?? ""}
                availableForSale={selectedVariant?.availableForSale ?? false}
                quantity={quantity}
            />

            {/* Tags */}
            {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-sand/30">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-linen px-3 py-1 text-xs font-medium text-earth-muted"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
