import type {
    ShopifyMoney,
    ShopifyImage,
    ShopifyPriceRange,
    ShopifyProduct,
    ShopifyProductVariant,
    ShopifyCollection,
    ShopifyBlog,
    ShopifyArticle,
    ShopifyArticleDetail,
    ShopifyCart,
    ShopifyCartLineItem,
    Money,
    Image,
    PriceRange,
    Product,
    ProductVariant,
    Collection,
    Blog,
    Article,
    ArticleDetail,
    Cart,
    CartLineItem,
} from "./types";

export function mapMoney(m: ShopifyMoney): Money {
    return {
        amount: parseFloat(m.amount),
        currencyCode: m.currencyCode,
    };
}

export function mapImage(img: ShopifyImage | null): Image | null {
    if (!img) return null;
    return {
        url: img.url,
        altText: img.altText ?? "",
        width: img.width,
        height: img.height,
    };
}

export function mapPriceRange(pr: ShopifyPriceRange): PriceRange {
    return {
        min: mapMoney(pr.minVariantPrice),
        max: mapMoney(pr.maxVariantPrice),
    };
}

export function mapVariant(v: ShopifyProductVariant): ProductVariant {
    return {
        id: v.id,
        title: v.title,
        availableForSale: v.availableForSale,
        selectedOptions: v.selectedOptions,
        price: mapMoney(v.price),
        compareAtPrice: v.compareAtPrice ? mapMoney(v.compareAtPrice) : null,
        image: mapImage(v.image),
    };
}

export function mapProduct(p: ShopifyProduct): Product {
    return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        description: p.description,
        descriptionHtml: p.descriptionHtml,
        vendor: p.vendor,
        productType: p.productType,
        tags: p.tags,
        availableForSale: p.availableForSale,
        options: p.options,
        priceRange: mapPriceRange(p.priceRange),
        compareAtPriceRange: mapPriceRange(p.compareAtPriceRange),
        images: p.images.edges.map((e) => mapImage(e.node)!),
        variants: p.variants.edges.map((e) => mapVariant(e.node)),
        featuredImage: mapImage(p.featuredImage),
    };
}

// Map a "card" product (no variants/images edges) for grids/listings
export function mapProductCard(p: {
    id: string;
    handle: string;
    title: string;
    vendor: string;
    availableForSale: boolean;
    priceRange: ShopifyPriceRange;
    compareAtPriceRange: ShopifyPriceRange;
    featuredImage: ShopifyImage | null;
}): Product {
    return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        description: "",
        descriptionHtml: "",
        vendor: p.vendor,
        productType: "",
        tags: [],
        availableForSale: p.availableForSale,
        options: [],
        priceRange: mapPriceRange(p.priceRange),
        compareAtPriceRange: mapPriceRange(p.compareAtPriceRange),
        images: p.featuredImage ? [mapImage(p.featuredImage)!] : [],
        variants: [],
        featuredImage: mapImage(p.featuredImage),
    };
}

export function mapCollection(c: ShopifyCollection): Collection {
    return {
        id: c.id,
        handle: c.handle,
        title: c.title,
        description: c.description,
        image: mapImage(c.image),
        products: c.products?.edges?.map((e) => mapProductCard(e.node)) ?? [],
        pageInfo: c.products?.pageInfo ?? { hasNextPage: false, endCursor: null },
    };
}

export function mapBlog(blog: ShopifyBlog): Blog {
    return {
        id: blog.id,
        handle: blog.handle,
        title: blog.title,
        url: blog.onlineStoreUrl,
    };
}

export function mapArticle(article: ShopifyArticle): Article {
    return {
        id: article.id,
        handle: article.handle,
        title: article.title,
        excerpt: article.excerpt,
        publishedAt: article.publishedAt,
        url: article.onlineStoreUrl,
        image: mapImage(article.image),
        blog: article.blog ? mapBlog(article.blog) : null,
    };
}

export function mapArticleDetail(article: ShopifyArticleDetail): ArticleDetail {
    return {
        ...mapArticle(article),
        contentHtml: article.contentHtml,
        author: article.authorV2?.name ?? null,
        tags: article.tags,
        seo: {
            title: article.seo?.title ?? null,
            description: article.seo?.description ?? null,
        },
    };
}

export function mapCartLine(line: ShopifyCartLineItem): CartLineItem {
    return {
        id: line.id,
        quantity: line.quantity,
        variantId: line.merchandise.id,
        variantTitle: line.merchandise.title,
        selectedOptions: line.merchandise.selectedOptions,
        image: mapImage(line.merchandise.image),
        price: mapMoney(line.merchandise.price),
        compareAtPrice: line.merchandise.compareAtPrice
            ? mapMoney(line.merchandise.compareAtPrice)
            : null,
        totalPrice: mapMoney(line.cost.totalAmount),
        productId: line.merchandise.product.id,
        productHandle: line.merchandise.product.handle,
        productTitle: line.merchandise.product.title,
        vendor: line.merchandise.product.vendor,
    };
}

export function mapCart(c: ShopifyCart): Cart {
    return {
        id: c.id,
        checkoutUrl: c.checkoutUrl,
        totalQuantity: c.totalQuantity,
        subtotal: mapMoney(c.cost.subtotalAmount),
        total: mapMoney(c.cost.totalAmount),
        tax: c.cost.totalTaxAmount ? mapMoney(c.cost.totalTaxAmount) : null,
        lines: c.lines.edges.map((e) => mapCartLine(e.node)),
    };
}
