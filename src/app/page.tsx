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
      {/* Hero — 50/50 Split */}
      <section className="relative flex min-h-[85vh] flex-col lg:flex-row">
        {/* Left Half: Text Content */}
        <div className="flex w-full flex-col justify-center bg-forest px-8 py-20 text-white lg:w-1/2 lg:px-16 xl:px-24 bg-gradient-to-br from-forest to-moss">
          <h1 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl lg:text-[5.5rem] lg:leading-[0.9]">
            The future is<br />
            clear.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-sage-light">
            No mixed signals. Just clear plant protein, prebiotic fiber, and
            smooth, fizzy flavor. A pop worth committing to.
          </p>
          <div className="mt-10">
            <Link
              href="/collections"
              className="inline-block rounded-xl bg-forest-dark px-10 py-5 font-display text-base font-bold tracking-wide text-white shadow-xl transition-all hover:bg-white hover:text-forest hover:shadow-2xl"
            >
              Pop a Lilya
            </Link>
          </div>
        </div>

        {/* Right Half: Imagery */}
        <div className="relative min-h-[50vh] w-full lg:w-1/2">
          {/* Unsplash Placeholder for colorful product stack on reflective ground */}
          <img
            src="https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=2000&auto=format&fit=crop"
            alt="Lilya's colorful cans placeholder"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </section>

      {/* Featured Marquee / Scrolling Text (Bonus to add to the vibe) */}
      <div className="flex overflow-hidden whitespace-nowrap bg-forest-dark py-4 text-white">
        <div className="animate-marquee flex items-center gap-12 font-display text-lg font-bold tracking-wide">
          <span>🌿 100% Natural</span>
          <span>•</span>
          <span>🌱 Plant-Based</span>
          <span>•</span>
          <span>✕ No Artificial Stuff</span>
          <span>•</span>
          <span>📦 Free Shipping</span>
          <span>•</span>
          <span>🌿 100% Natural</span>
          <span>•</span>
          <span>🌱 Plant-Based</span>
          <span>•</span>
          <span>✕ No Artificial Stuff</span>
          <span>•</span>
          <span>📦 Free Shipping</span>
        </div>
      </div>

      {/* Featured Collections — "Shop by Category" */}
      {collections.length > 0 && (
        <section className="bg-cream py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-5xl font-extrabold tracking-tight text-forest sm:text-6xl">
                Shop by category.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-earth-muted">
                Explore our curated collections, made with love right here from the earth.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collections.slice(0, 3).map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link
                href="/collections"
                className="inline-block rounded-xl border-2 border-forest px-10 py-5 font-display text-base font-bold tracking-wide text-forest transition-all hover:bg-forest hover:text-white"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brand Story — 50/50 Split (Image Left, Text Right) */}
      <section className="relative flex flex-col lg:flex-row border-y border-sand/30">
        {/* Left Half: Imagery */}
        <div className="relative min-h-[50vh] w-full lg:w-1/2">
          {/* Unsplash Placeholder: earthy, farm/greenery, or natural lifestyle */}
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"
            alt="Natural ingredients harvested from the earth"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Half: Text Content */}
        <div className="flex w-full flex-col justify-center bg-sage-light/40 px-8 py-20 text-forest lg:w-1/2 lg:px-16 xl:px-24">
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            From the<br />
            earth,<br />
            for you.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-earth-muted">
            We believe nourishment starts from the ground up. Every product is
            thoughtfully sourced, minimally processed, and crafted to bring you
            closer to nature&mdash;without compromising on taste.
          </p>
          <div className="mt-10">
            <Link
              href="/collections"
              className="inline-block rounded-xl bg-forest px-10 py-5 font-display text-base font-bold tracking-wide text-white shadow-lg transition-all hover:bg-forest-dark hover:shadow-xl"
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-5xl font-extrabold tracking-tight text-forest sm:text-6xl">
                Best sellers.
              </h2>
              <p className="mt-4 text-lg text-earth-muted">
                What everyone&apos;s reaching for right now.
              </p>
            </div>
            <Link
              href="/collections"
              className="hidden font-display text-base font-bold tracking-wide text-forest transition-colors hover:text-forest-dark sm:block"
            >
              Shop All &rarr;
            </Link>
          </div>
          <div className="mt-16">
            <ProductGrid products={products} />
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/collections"
              className="font-display text-base font-bold tracking-wide text-forest"
            >
              Shop All &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof — Big text and clean layout */}
      <section className="bg-linen">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-4xl font-extrabold tracking-tight text-forest sm:text-5xl">
            What people<br />are saying.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                quote: "Finally, a brand that gets it. Clean ingredients AND amazing taste? I’m hooked.",
                name: "Sarah M.",
                detail: "Verified Customer",
              },
              {
                quote: "I’ve tried every brand out there. Nothing comes close to the quality and flavor of Lilya’s.",
                name: "James K.",
                detail: "Repeat Buyer",
              },
              {
                quote: "My whole family loves these. It’s the only brand my kids actually ask for by name.",
                name: "Maria L.",
                detail: "Mom of 3",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="flex gap-1 text-moss">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-earth">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="font-display text-lg font-bold text-forest">{review.name}</p>
                  <p className="text-sm text-earth-muted">{review.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — bold blocky CTA section */}
      <section className="bg-forest">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Join the<br />family.
          </h2>
          <p className="mt-6 max-w-md text-lg text-sage-light">
            Get early access to new drops, recipes, and exclusive offers
            delivered straight to your inbox.
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-base text-white outline-none transition-all placeholder:text-white/50 focus:border-white/50 focus:bg-white/15"
            />
            <button
              type="button"
              className="rounded-xl bg-white px-8 py-4 font-display text-sm font-bold tracking-wide text-forest transition-all hover:bg-cream"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm text-sage-light/50">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
