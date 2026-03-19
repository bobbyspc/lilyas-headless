import { shopifyFetch } from "./client";
import {
    GET_PRODUCTS,
    GET_PRODUCT_BY_HANDLE,
    GET_PRODUCT_RECOMMENDATIONS,
    GET_COLLECTIONS,
    GET_COLLECTION_BY_HANDLE,
    GET_ARTICLES,
    GET_ARTICLE_BY_HANDLE,
    GET_BLOGS,
    SEARCH_PRODUCTS,
} from "./queries";
import {
    CREATE_CART,
    ADD_TO_CART,
    UPDATE_CART_LINES,
    REMOVE_CART_LINES,
    GET_CART,
} from "./mutations";
import {
    mapProduct,
    mapProductCard,
    mapCollection,
    mapArticle,
    mapArticleDetail,
    mapBlog,
    mapCart,
} from "./mappers";
import type {
    ShopifyProduct,
    ShopifyCart,
    ShopifyCollection,
    ShopifyArticle,
    ShopifyArticleDetail,
    ShopifyBlog,
    ShopifyPageInfo,
    Product,
    Collection,
    Article,
    ArticleDetail,
    Blog,
    Cart,
} from "./types";

// ── Products ──

type ProductCardNode = {
    id: string;
    handle: string;
    title: string;
    vendor: string;
    availableForSale: boolean;
    priceRange: ShopifyProduct["priceRange"];
    compareAtPriceRange: ShopifyProduct["compareAtPriceRange"];
    featuredImage: ShopifyProduct["featuredImage"];
};

export async function getProducts(options?: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
}): Promise<{ products: Product[]; pageInfo: ShopifyPageInfo }> {
    const data = await shopifyFetch<{
        products: {
            edges: Array<{ node: ProductCardNode }>;
            pageInfo: ShopifyPageInfo;
        };
    }>({
        query: GET_PRODUCTS,
        variables: {
            first: options?.first ?? 20,
            after: options?.after,
            sortKey: options?.sortKey ?? "BEST_SELLING",
            reverse: options?.reverse ?? false,
        },
        tags: ["products"],
    });

    return {
        products: data.products.edges.map((e) => mapProductCard(e.node)),
        pageInfo: data.products.pageInfo,
    };
}

export async function getProductByHandle(
    handle: string
): Promise<Product | null> {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
        tags: ["products"],
    });

    return data.product ? mapProduct(data.product) : null;
}

export async function getProductRecommendations(
    productId: string
): Promise<Product[]> {
    const data = await shopifyFetch<{
        productRecommendations: ProductCardNode[];
    }>({
        query: GET_PRODUCT_RECOMMENDATIONS,
        variables: { productId },
        tags: ["products"],
    });

    return data.productRecommendations.map(mapProductCard);
}

// ── Collections ──

export async function getCollections(
    first = 20
): Promise<Omit<Collection, "products" | "pageInfo">[]> {
    const data = await shopifyFetch<{
        collections: {
            edges: Array<{
                node: Omit<ShopifyCollection, "products">;
            }>;
        };
    }>({
        query: GET_COLLECTIONS,
        variables: { first },
        tags: ["collections"],
    });

    return data.collections.edges.map((e) => ({
        id: e.node.id,
        handle: e.node.handle,
        title: e.node.title,
        description: e.node.description,
        image: e.node.image
            ? {
                url: e.node.image.url,
                altText: e.node.image.altText ?? "",
                width: e.node.image.width,
                height: e.node.image.height,
            }
            : null,
    }));
}

export async function getCollectionByHandle(
    handle: string,
    options?: {
        first?: number;
        after?: string;
        sortKey?: string;
        reverse?: boolean;
    }
): Promise<Collection | null> {
    const data = await shopifyFetch<{
        collection: ShopifyCollection | null;
    }>({
        query: GET_COLLECTION_BY_HANDLE,
        variables: {
            handle,
            first: options?.first ?? 20,
            after: options?.after,
            sortKey: options?.sortKey ?? "BEST_SELLING",
            reverse: options?.reverse ?? false,
        },
        tags: ["collections"],
    });

    return data.collection ? mapCollection(data.collection) : null;
}

// ── Search ──

export async function searchProducts(
    query: string,
    options?: { first?: number; after?: string }
): Promise<{
    products: Product[];
    totalCount: number;
    pageInfo: ShopifyPageInfo;
}> {
    const data = await shopifyFetch<{
        search: {
            edges: Array<{ node: ProductCardNode }>;
            totalCount: number;
            pageInfo: ShopifyPageInfo;
        };
    }>({
        query: SEARCH_PRODUCTS,
        variables: {
            query,
            first: options?.first ?? 20,
            after: options?.after,
        },
        cache: "no-store",
    });

    return {
        products: data.search.edges.map((e) => mapProductCard(e.node)),
        totalCount: data.search.totalCount,
        pageInfo: data.search.pageInfo,
    };
}

// ── Articles ──

export async function getArticles(
    options?: { first?: number; after?: string }
): Promise<{ articles: Article[]; pageInfo: ShopifyPageInfo }> {
    const data = await shopifyFetch<{
        articles: {
            edges: Array<{ node: ShopifyArticle }>;
            pageInfo: ShopifyPageInfo;
        };
    }>({
        query: GET_ARTICLES,
        variables: {
            first: options?.first ?? 12,
            after: options?.after,
            reverse: true,
        },
        tags: ["articles"],
        revalidate: 300,
    });

    return {
        articles: data.articles.edges.map((edge) => mapArticle(edge.node)),
        pageInfo: data.articles.pageInfo,
    };
}

export async function getArticleByHandle(
    handle: string
): Promise<ArticleDetail | null> {
    const data = await shopifyFetch<{
        articles: {
            edges: Array<{ node: ShopifyArticleDetail }>;
        };
    }>({
        query: GET_ARTICLE_BY_HANDLE,
        variables: { handle: `handle:${handle}` },
        tags: ["articles"],
        revalidate: 300,
    });

    const node = data.articles.edges[0]?.node;
    return node ? mapArticleDetail(node) : null;
}

export async function getBlogs(first = 20): Promise<Blog[]> {
    const data = await shopifyFetch<{
        blogs: {
            edges: Array<{ node: ShopifyBlog }>;
        };
    }>({
        query: GET_BLOGS,
        variables: { first },
        tags: ["blogs"],
        revalidate: 300,
    });

    return data.blogs.edges.map((e) => mapBlog(e.node));
}

// ── Cart ──

export async function createCart(
    lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart> {
    const data = await shopifyFetch<{
        cartCreate: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
        };
    }>({
        query: CREATE_CART,
        variables: { input: { lines } },
        cache: "no-store",
    });

    if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors[0].message);
    }

    return mapCart(data.cartCreate.cart);
}

export async function addToCart(
    cartId: string,
    lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart> {
    const data = await shopifyFetch<{
        cartLinesAdd: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
        };
    }>({
        query: ADD_TO_CART,
        variables: { cartId, lines },
        cache: "no-store",
    });

    if (data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(data.cartLinesAdd.userErrors[0].message);
    }

    return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
    cartId: string,
    lines: Array<{ id: string; quantity: number }>
): Promise<Cart> {
    const data = await shopifyFetch<{
        cartLinesUpdate: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
        };
    }>({
        query: UPDATE_CART_LINES,
        variables: { cartId, lines },
        cache: "no-store",
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }

    return mapCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(
    cartId: string,
    lineIds: string[]
): Promise<Cart> {
    const data = await shopifyFetch<{
        cartLinesRemove: {
            cart: ShopifyCart;
            userErrors: Array<{ field: string[]; message: string }>;
        };
    }>({
        query: REMOVE_CART_LINES,
        variables: { cartId, lineIds },
        cache: "no-store",
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors[0].message);
    }

    return mapCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
        query: GET_CART,
        variables: { cartId },
        cache: "no-store",
    });

    return data.cart ? mapCart(data.cart) : null;
}
