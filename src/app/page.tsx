import { getProducts, getCollections, getArticles } from "@/lib/shopify";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { BrandStory } from "@/components/home/brand-story";
import { BestSellers } from "@/components/home/best-sellers";
import { Testimonials } from "@/components/home/testimonials";
import { NearbyCafes } from "@/components/home/nearby-cafes";
import { BlogHighlights } from "@/components/home/blog-highlights";
import { Newsletter } from "@/components/home/newsletter";

export const revalidate = 60;

export default async function HomePage() {
  const [{ products }, collections, { articles }] = await Promise.all([
    getProducts({ first: 8 }),
    getCollections(6),
    getArticles({ first: 3 }),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollections collections={collections} />
      <BrandStory />
      <BestSellers products={products} />
      <Testimonials />
      <NearbyCafes />
      <BlogHighlights articles={articles} />
      <Newsletter />
    </>
  );
}
