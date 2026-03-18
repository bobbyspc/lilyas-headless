import { z } from "zod/v4";

const envSchema = z.object({
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION: z.string().min(1),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
});

const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION:
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

if (!parsed.success) {
    console.error(
        "❌ Missing Shopify environment variables:",
        parsed.error.flatten().fieldErrors
    );
    throw new Error("Missing required Shopify environment variables");
}

export const env = parsed.data;
