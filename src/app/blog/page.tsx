import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/shopify";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
    title: "Blog — LILYAS",
    description: "Stories, recipes, and updates from the LILYAS journal.",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

type Props = {
    searchParams: Promise<{ after?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
    const { after } = await searchParams;
    const { articles, pageInfo } = await getArticles({ first: 12, after });

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-14">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-sage">
                    From Our Journal
                </p>
                <h1 className="mt-4 font-display text-4xl font-normal leading-[0.95] tracking-tight text-forest sm:text-5xl lg:text-6xl">
                    The LILYAS Blog
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-earth-muted sm:text-lg">
                    Recipes, stories, and behind-the-scenes updates from our kitchen and community.
                </p>
            </div>

            {/* Articles grid */}
            {articles.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-lg text-earth-muted">
                        No posts yet — check back soon!
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.handle}`}
                                className="group block rounded-4xl focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                            >
                                <article className="h-full rounded-4xl border border-forest/10 p-2 transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="relative aspect-[1.08/0.72] overflow-hidden rounded-[1.6rem] bg-sage-light/25">
                                        {article.image ? (
                                            <Image
                                                src={article.image.url}
                                                alt={article.image.altText || article.title}
                                                fill
                                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,204,176,0.6),rgba(48,74,56,0.25))]" />
                                        )}
                                    </div>

                                    <div className="px-3 pb-3 pt-5 text-forest">
                                        <div className="flex items-center gap-3 text-sm text-earth-muted">
                                            <time dateTime={article.publishedAt}>
                                                {dateFormatter.format(new Date(article.publishedAt))}
                                            </time>
                                            {article.blog && (
                                                <>
                                                    <span className="text-forest/20">·</span>
                                                    <span>{article.blog.title}</span>
                                                </>
                                            )}
                                        </div>
                                        <h2 className="mt-3 font-display text-[1.75rem] leading-[1.05] tracking-tight text-forest sm:text-[2rem]">
                                            {article.title}
                                        </h2>
                                        {article.excerpt && (
                                            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-earth-muted">
                                                {article.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageInfo.hasNextPage && pageInfo.endCursor && (
                        <div className="mt-12 flex justify-center">
                            <Link
                                href={`/blog?after=${pageInfo.endCursor}`}
                                className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-8 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
                            >
                                Load More Posts
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
