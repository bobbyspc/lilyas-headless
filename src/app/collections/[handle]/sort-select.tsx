"use client";

import { useRouter, usePathname } from "next/navigation";

const SORT_OPTIONS = [
    { value: "best-selling", label: "Best Selling" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "a-z", label: "A — Z" },
];

export function CollectionSortSelect({
    current,
}: {
    current?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        router.push(`${pathname}?sort=${value}`);
    }

    return (
        <select
            value={current ?? "best-selling"}
            onChange={handleChange}
            className="rounded-full border border-sand bg-cream px-4 py-2 text-sm text-earth outline-none transition-colors focus:border-forest"
        >
            {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
