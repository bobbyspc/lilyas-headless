export const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

export const MONEY_FRAGMENT = `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFields on ProductVariant {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
    price {
      ...MoneyFields
    }
    compareAtPrice {
      ...MoneyFields
    }
    image {
      ...ImageFields
    }
  }
`;

export const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    images(first: 20) {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          ...ProductVariantFields
        }
      }
    }
    featuredImage {
      ...ImageFields
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    handle
    title
    vendor
    availableForSale
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    featuredImage {
      ...ImageFields
    }
  }
`;

export const COLLECTION_FRAGMENT = `
  fragment CollectionFields on Collection {
    id
    handle
    title
    description
    image {
      ...ImageFields
    }
  }
`;

export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        ...MoneyFields
      }
      totalAmount {
        ...MoneyFields
      }
      totalTaxAmount {
        ...MoneyFields
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              image {
                ...ImageFields
              }
              price {
                ...MoneyFields
              }
              compareAtPrice {
                ...MoneyFields
              }
              product {
                id
                handle
                title
                vendor
              }
            }
          }
          cost {
            totalAmount {
              ...MoneyFields
            }
            amountPerQuantity {
              ...MoneyFields
            }
            compareAtAmountPerQuantity {
              ...MoneyFields
            }
          }
        }
      }
    }
  }
`;
