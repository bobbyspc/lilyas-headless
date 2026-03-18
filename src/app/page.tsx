import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import { CollectionCard } from "@/components/collection-card";

export const revalidate = 60;

export default async function HomePage() {
  const [{ products }, collections] = await Promise.all([
    getProducts({ first: 8 }),
    getCollections(6),
  ]);

  return (
    <>
      {/* Hero — bold full-width section */}
      <section className="relative overflow-hidden bg-forest text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,154,114,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,197,169,0.3),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <p className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide text-sage-light">
              Natural &amp; Plant-Based
            </p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              NOURISH
              <br />
              YOUR
              <br />
              <span className="text-sage-light">BODY.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sage-light/90 max-w-lg">
              Real ingredients, real flavor. Wholesome products rooted in nature,
              crafted for the way you actually live.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/collections"
                className="rounded-full bg-cream px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-forest transition-all hover:bg-white hover:shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/collections"
                className="rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props — icon bar on dark background */}
      <section className="bg-forest-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { title: "100% Natural", description: "Clean ingredients only", icon: "🌿" },
            { title: "Plant-Based", description: "Rooted in nature", icon: "🌱" },
            { title: "No Artificial Stuff", description: "Nothing you can\u2019t pronounce", icon: "✕" },
            { title: "Free Shipping", description: "On orders over $75", icon: "📦" },
          ].map((prop) => (
            <div key={prop.title} className="flex items-center gap-3 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl">
                {prop.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide">
                  {prop.title}
                </h3>
                <p className="text-xs text-sage-light/70">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collections — "Shop by Category" */}
      {collections.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-earth sm:text-4xl">
                Shop by Category
              </h2>
              <p className="mt-3 text-earth-muted">
                Explore our curated collections, made with love.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.slice(0, 3).map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/collections"
                className="inline-block rounded-full border-2 border-forest px-8 py-3 text-sm font-bold uppercase tracking-wider text-forest transition-all hover:bg-forest hover:text-white"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brand Story — full-width colored panel */}
      <section className="relative overflow-hidden bg-sage">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,247,242,0.3),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              FROM THE
              <br />
              EARTH,
              <br />
              FOR YOU.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              We believe nourishment starts from the ground up. Every product is
              thoughtfully sourced, minimally processed, and crafted to bring you
              closer to nature&mdash;without compromising on taste.
            </p>
            <Link
              href="/collections"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-forest transition-all hover:bg-cream hover:shadow-lg"
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-earth sm:text-4xl">
                Best Sellers
              </h2>
              <p className="mt-2 text-earth-muted">
                What everyone&apos;s reaching for.
              </p>
            </div>
            <Link
              href="/collections"
              className="hidden text-sm font-bold uppercase tracking-wider text-forest transition-colors hover:text-forest-dark sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/collections"
              className="text-sm font-bold uppercase tracking-wider text-forest"
            >
              View All →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="bg-linen py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-3xl font-extrabold uppercase tracking-tight text-earth sm:text-4xl">
            What People Are Saying
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                quote: "Finally, a brand that gets it. Clean ingredients AND amazing taste? I\u2019m hooked.",
                name: "Sarah M.",
                detail: "Verified Customer",
              },
              {
                quote: "I\u2019ve tried every brand out there. Nothing comes close to the quality and flavor of Lilya\u2019s.",
                name: "James K.",
                detail: "Repeat Buyer",
              },
              {
                quote: "My whole family loves these. It\u2019s the only brand my kids actually ask for by name.",
                name: "Maria L.",
                detail: "Mom of 3",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex gap-1 text-terracotta">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-earth-muted">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-linen pt-4">
                  <p className="text-sm font-bold text-earth">{review.name}</p>
                  <p className="text-xs text-earth-muted">{review.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — warm CTA section */}
      <section className="bg-forest py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Join the Family
          </h2>
          <p className="mt-3 text-sage-light/80">
            Get early access to new drops, recipes, and exclusive offers
            delivered straight to your inbox.
          </p>
          <div className="mt-8 flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-white/50 focus:bg-white/15"
            />
            <button
              type="button"
              className="rounded-full bg-cream px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-forest transition-all hover:bg-white"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-sage-light/50">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
