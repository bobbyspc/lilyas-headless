import { IMAGE_FRAGMENT, MONEY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_CARD_FRAGMENT, COLLECTION_FRAGMENT } from "./fragments";

export const GET_PRODUCTS = `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int = 20, $after: String, $sortKey: ProductSortKeys = BEST_SELLING, $reverse: Boolean = false) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductCardFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS = `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductCardFields
    }
  }
`;

export const GET_COLLECTIONS = `
  ${IMAGE_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  query GetCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFields
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query GetCollectionByHandle(
    $handle: String!
    $first: Int = 20
    $after: String
    $sortKey: ProductCollectionSortKeys = BEST_SELLING
    $reverse: Boolean = false
  ) {
    collection(handle: $handle) {
      ...CollectionFields
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...ProductCardFields
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int = 20, $after: String) {
    search(query: $query, first: $first, after: $after, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            ...ProductCardFields
          }
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
