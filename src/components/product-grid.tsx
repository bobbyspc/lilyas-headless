import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-earth-muted">No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
