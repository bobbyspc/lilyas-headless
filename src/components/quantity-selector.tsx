"use client";

import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
};

export function QuantitySelector({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
    disabled = false,
}: QuantitySelectorProps) {
    return (
        <div className="inline-flex items-center rounded-full border border-sand">
            <button
                onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
                disabled={disabled || quantity <= min}
                className={cn(
                    "flex h-10 w-10 items-center justify-center text-lg transition-colors",
                    "hover:bg-linen disabled:cursor-not-allowed disabled:text-earth-muted/30"
                )}
                aria-label="Decrease quantity"
            >
                −
            </button>
            <span className="flex h-10 w-12 items-center justify-center border-x border-sand text-sm font-semibold">
                {quantity}
            </span>
            <button
                onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
                disabled={disabled || quantity >= max}
                className={cn(
                    "flex h-10 w-10 items-center justify-center text-lg transition-colors",
                    "hover:bg-linen disabled:cursor-not-allowed disabled:text-earth-muted/30"
                )}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}
