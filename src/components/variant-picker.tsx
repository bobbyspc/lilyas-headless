"use client";

import { cn } from "@/lib/utils";
import type { ProductOption } from "@/lib/shopify/types";

type VariantPickerProps = {
    options: ProductOption[];
    selectedOptions: Record<string, string>;
    onSelect: (name: string, value: string) => void;
    availableCombinations?: Array<{
        selectedOptions: Array<{ name: string; value: string }>;
        availableForSale: boolean;
    }>;
};

export function VariantPicker({
    options,
    selectedOptions,
    onSelect,
    availableCombinations,
}: VariantPickerProps) {
    function isOptionAvailable(optionName: string, optionValue: string) {
        if (!availableCombinations) return true;

        return availableCombinations.some(
            (combo) =>
                combo.availableForSale &&
                combo.selectedOptions.every((opt) => {
                    if (opt.name === optionName) return opt.value === optionValue;
                    return opt.value === selectedOptions[opt.name];
                })
        );
    }

    // Don't render if there's only a single "Default Title" option
    const filteredOptions = options.filter(
        (opt) => !(opt.values.length === 1 && opt.values[0] === "Default Title")
    );

    if (filteredOptions.length === 0) return null;

    return (
        <div className="space-y-4">
            {filteredOptions.map((option) => (
                <div key={option.id}>
                    <label className="mb-2 block text-sm font-semibold text-earth">
                        {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                            const isSelected = selectedOptions[option.name] === value;
                            const isAvailable = isOptionAvailable(option.name, value);

                            return (
                                <button
                                    key={value}
                                    onClick={() => onSelect(option.name, value)}
                                    disabled={!isSelected && !isAvailable}
                                    className={cn(
                                        "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                                        isSelected
                                            ? "border-forest bg-forest text-white"
                                            : isAvailable
                                                ? "border-sand bg-white text-earth hover:border-forest"
                                                : "cursor-not-allowed border-linen bg-linen text-earth-muted/40 line-through"
                                    )}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
