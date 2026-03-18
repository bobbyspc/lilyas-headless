import { env } from "./env";

const domain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const apiVersion = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION;
const storefrontAccessToken = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

type ShopifyFetchOptions = {
    query: string;
    variables?: Record<string, unknown>;
    /** Pass "no-store" for mutations/cart — disables all caching */
    cache?: "no-store";
    tags?: string[];
    /** Seconds before stale data is re-fetched (default: 60). Ignored when cache is "no-store" */
    revalidate?: number;
};

export async function shopifyFetch<T>({
    query,
    variables = {},
    cache,
    tags,
    revalidate = 60,
}: ShopifyFetchOptions): Promise<T> {
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables }),
        // Mutations & cart: never cache. Queries: time-based + tag-based invalidation.
        ...(cache === "no-store"
            ? { cache: "no-store" }
            : { next: { revalidate, tags: tags ?? [] } }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(
            `Shopify API error [${res.status}]: ${text}`
        );
    }

    const json = await res.json();

    if (json.errors) {
        throw new Error(
            `Shopify GraphQL error: ${JSON.stringify(json.errors)}`
        );
    }

    return json.data as T;
}
