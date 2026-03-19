// ── Shopify raw API types (GraphQL response shapes) ──

export type ShopifyImage = {
    url: string;
    altText: string | null;
    width: number;
    height: number;
};

export type ShopifyMoney = {
    amount: string;
    currencyCode: string;
};

export type ShopifyPriceRange = {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
};

export type ShopifyProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ShopifySelectedOption = {
    name: string;
    value: string;
};

export type ShopifyProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: ShopifySelectedOption[];
    price: ShopifyMoney;
    compareAtPrice: ShopifyMoney | null;
    image: ShopifyImage | null;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    vendor: string;
    productType: string;
    tags: string[];
    availableForSale: boolean;
    options: ShopifyProductOption[];
    priceRange: ShopifyPriceRange;
    compareAtPriceRange: ShopifyPriceRange;
    images: {
        edges: Array<{ node: ShopifyImage }>;
    };
    variants: {
        edges: Array<{ node: ShopifyProductVariant }>;
    };
    featuredImage: ShopifyImage | null;
};

export type ShopifyCollection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ShopifyImage | null;
    products: {
        edges: Array<{ node: ShopifyProduct }>;
        pageInfo: ShopifyPageInfo;
    };
};

export type ShopifyBlog = {
    id: string;
    handle: string;
    title: string;
    onlineStoreUrl: string | null;
};

export type ShopifyArticle = {
    id: string;
    handle: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    onlineStoreUrl: string | null;
    image: ShopifyImage | null;
    blog: ShopifyBlog | null;
};

export type ShopifyArticleAuthor = {
    name: string;
};

export type ShopifySeo = {
    title: string | null;
    description: string | null;
};

export type ShopifyArticleDetail = ShopifyArticle & {
    contentHtml: string;
    authorV2: ShopifyArticleAuthor | null;
    tags: string[];
    seo: ShopifySeo;
};

export type ShopifyBlogWithArticles = ShopifyBlog & {
    articles: {
        edges: Array<{ node: ShopifyArticle }>;
        pageInfo: ShopifyPageInfo;
    };
};

export type ShopifyPageInfo = {
    hasNextPage: boolean;
    endCursor: string | null;
};

export type ShopifyCartLineItem = {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        selectedOptions: ShopifySelectedOption[];
        image: ShopifyImage | null;
        price: ShopifyMoney;
        compareAtPrice: ShopifyMoney | null;
        product: {
            id: string;
            handle: string;
            title: string;
            vendor: string;
        };
    };
    cost: {
        totalAmount: ShopifyMoney;
        amountPerQuantity: ShopifyMoney;
        compareAtAmountPerQuantity: ShopifyMoney | null;
    };
};

export type ShopifyCart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
        subtotalAmount: ShopifyMoney;
        totalAmount: ShopifyMoney;
        totalTaxAmount: ShopifyMoney | null;
    };
    lines: {
        edges: Array<{ node: ShopifyCartLineItem }>;
    };
};

// ── Normalized frontend types ──

export type Product = {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    vendor: string;
    productType: string;
    tags: string[];
    availableForSale: boolean;
    options: ProductOption[];
    priceRange: PriceRange;
    compareAtPriceRange: PriceRange;
    images: Image[];
    variants: ProductVariant[];
    featuredImage: Image | null;
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: SelectedOption[];
    price: Money;
    compareAtPrice: Money | null;
    image: Image | null;
};

export type SelectedOption = {
    name: string;
    value: string;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Money = {
    amount: number;
    currencyCode: string;
};

export type PriceRange = {
    min: Money;
    max: Money;
};

export type Collection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: Image | null;
    products: Product[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
};

export type Blog = {
    id: string;
    handle: string;
    title: string;
    url: string | null;
};

export type Article = {
    id: string;
    handle: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    url: string | null;
    image: Image | null;
    blog: Blog | null;
};

export type ArticleDetail = Article & {
    contentHtml: string;
    author: string | null;
    tags: string[];
    seo: { title: string | null; description: string | null };
};

export type CartLineItem = {
    id: string;
    quantity: number;
    variantId: string;
    variantTitle: string;
    selectedOptions: SelectedOption[];
    image: Image | null;
    price: Money;
    compareAtPrice: Money | null;
    totalPrice: Money;
    productId: string;
    productHandle: string;
    productTitle: string;
    vendor: string;
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    subtotal: Money;
    total: Money;
    tax: Money | null;
    lines: CartLineItem[];
};
