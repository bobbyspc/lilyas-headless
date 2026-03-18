import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductByHandle, getProductRecommendations } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import { ProductInteractive } from "./product-interactive";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
    params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const product = await getProductByHandle(handle);
    if (!product) return {};
    return {
        title: `${product.title} — LILYAS`,
        description: product.description?.slice(0, 160),
    };
}

export default async function ProductPage({ params }: Props) {
    const { handle } = await params;
    const product = await getProductByHandle(handle);

    if (!product) notFound();

    const recommendations = await getProductRecommendations(product.id);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Product main section */}
            <Suspense fallback={null}>
                <ProductInteractive product={product} />
            </Suspense>

            {/* Description HTML */}
            {product.descriptionHtml && (
                <div className="mt-16 border-t border-sand/50 pt-10">
                    <h2 className="font-display text-lg font-bold text-earth mb-4">
                        Details
                    </h2>
                    <div
                        className="prose prose-neutral max-w-none text-sm"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                </div>
            )}

            {/* Related Products */}
            {recommendations.length > 0 && (
                <div className="mt-16 border-t border-sand/50 pt-10">
                    <h2 className="font-display text-lg font-bold text-earth mb-6">
                        You May Also Like
                    </h2>
                    <ProductGrid products={recommendations.slice(0, 4)} />
                </div>
            )}
        </div>
    );
}
