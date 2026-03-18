# LILYAS — Shopify Headless Storefront

A modern, production-ready headless Shopify storefront built with Next.js App Router, TypeScript, and Tailwind CSS.

## Architecture

```
src/
├── app/                          # Next.js App Router pages
│   ├── cart/page.tsx             # Cart page (full page view)
│   ├── collections/
│   │   ├── page.tsx              # All collections listing
│   │   └── [handle]/
│   │       ├── page.tsx          # Single collection page
│   │       └── sort-select.tsx   # Client-side sort dropdown
│   ├── products/
│   │   └── [handle]/
│   │       ├── page.tsx          # Product detail page
│   │       └── product-details.tsx # Client-side product interactions
│   ├── search/page.tsx           # Search results page
│   ├── layout.tsx                # Root layout (header, footer, cart drawer)
│   ├── page.tsx                  # Home page
│   ├── loading.tsx               # Global loading spinner
│   └── not-found.tsx             # 404 page
├── components/                   # Reusable UI components
│   ├── add-to-cart-button.tsx    # Add to cart with loading state
│   ├── cart-drawer.tsx           # Slide-out cart panel
│   ├── cart-provider.tsx         # Hydrates cart store from server
│   ├── collection-card.tsx       # Collection card with image
│   ├── footer.tsx                # Site footer
│   ├── header.tsx                # Site header with nav, search, cart
│   ├── product-card.tsx          # Product card for grids
│   ├── product-gallery.tsx       # Product image gallery
│   ├── product-grid.tsx          # Responsive product grid
│   ├── quantity-selector.tsx     # +/- quantity control
│   ├── search-input.tsx          # Search modal (Cmd+K)
│   └── variant-picker.tsx        # Option selector (size, color, etc.)
├── lib/
│   ├── shopify/                  # Shopify API layer
│   │   ├── client.ts             # Generic shopifyFetch helper
│   │   ├── env.ts                # Zod-validated env variables
│   │   ├── fragments.ts          # GraphQL fragments
│   │   ├── index.ts              # Public API (getProducts, createCart, etc.)
│   │   ├── mappers.ts            # Shopify → frontend type mappers
│   │   ├── mutations.ts          # Cart mutations (create, add, update, remove)
│   │   ├── queries.ts            # Product, collection, search queries
│   │   └── types.ts              # Shopify raw + normalized frontend types
│   ├── cart-actions.ts           # Server actions for cart operations
│   ├── cart-store.ts             # Zustand cart state (client)
│   └── utils.ts                  # formatPrice, cn helper
```

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions
- **TypeScript** — Full type coverage
- **Tailwind CSS v4** — Utility-first styling
- **Shopify Storefront API** — GraphQL API for products, collections, cart
- **Zustand** — Lightweight client cart state
- **Zod** — Environment variable validation

## Setup

### 1. Shopify Store Configuration

1. Go to your Shopify admin → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Under **Configuration**, enable the **Storefront API** with these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_read_content`
4. Install the app and copy the **Storefront API access token**

### 2. Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2024-10
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-public-access-token
```

**Note:** The Storefront API access token is a *public* token — it's safe to expose in the browser. Private admin tokens are never used in this project.

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com). Add the three environment variables in your Vercel project settings.

## Key Design Decisions

### Server vs Client Components

- **Server Components** (default): Product pages, collection pages, search, home page — all data fetching happens server-side
- **Client Components** (explicit): Cart drawer, variant picker, quantity selector, add-to-cart button, product gallery — only interactive state is client-side

### Cart Architecture

1. **Server Actions** (`cart-actions.ts`) handle all Shopify cart mutations server-side
2. **Cart ID** is stored in an httpOnly cookie (secure, no JS access needed)
3. **Zustand store** (`cart-store.ts`) holds client-side cart state for instant UI updates
4. **CartProvider** hydrates the store from server cart data on initial load
5. After each mutation, the server action returns the updated cart → store updates → UI reflects changes immediately

### Data Flow

```
Shopify Storefront API
  ↓ (GraphQL)
shopifyFetch (client.ts)
  ↓ (raw Shopify types)
mappers.ts
  ↓ (normalized frontend types)
Server Components / Server Actions
  ↓ (props / store)
Client Components
```

### Swapping Stores

To connect to a different Shopify store:

1. Update the 3 environment variables in `.env.local`
2. Update the brand name in `header.tsx` and `footer.tsx`
3. Update nav links if collection handles differ
4. That's it — the entire data layer adapts automatically

## Features

- ✅ Home page with hero, featured collections, products, value props, newsletter
- ✅ Collection listing page
- ✅ Single collection page with sorting and pagination
- ✅ Product page with gallery, variants, quantity, add to cart
- ✅ Related products (Shopify recommendations API)
- ✅ Cart drawer (slide-out panel)
- ✅ Cart page (full page view)
- ✅ Search page with results
- ✅ Cmd+K search shortcut
- ✅ Responsive design (mobile-first)
- ✅ Loading states and empty states
- ✅ 404 page
- ✅ Server-side rendering for SEO
- ✅ Dynamic metadata for product and collection pages

## Next Steps: Customer Accounts

The codebase is architected to cleanly layer in customer authentication:

### Planned Structure

```
src/
├── app/
│   └── account/
│       ├── layout.tsx         # Auth-protected layout
│       ├── page.tsx           # Account dashboard
│       ├── orders/page.tsx    # Order history
│       └── login/page.tsx     # Login page
├── lib/
│   ├── shopify/
│   │   ├── customer.ts        # Customer Account API queries/mutations
│   │   └── ...existing files
│   └── auth-actions.ts        # Server actions for login/logout/token refresh
```

### Implementation Plan

1. **Shopify Customer Account API** — Use the new Customer Account API (not the legacy Multipass/customer access token approach)
2. **Auth Flow** — OAuth 2.0 with PKCE via Shopify's authorization server
3. **Session Management** — Store session tokens in httpOnly cookies
4. **Protected Routes** — Middleware to check auth state and redirect to login
5. **Account Pages** — Dashboard, order history, address book, profile editing
6. **Logout** — Clear session cookies and revoke tokens

This can be added after the storefront/cart is verified working with your store.
