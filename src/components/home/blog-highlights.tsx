import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/lib/shopify/types";

type BlogHighlightsProps = {
    articles: Article[];
};

const articleDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

const emptyStateCards = [
    "Your latest Shopify story will appear here.",
    "Publish a News article to fill this featured slot.",
    "The third card will update automatically from Shopify.",
];

function formatArticleDate(publishedAt: string) {
    return articleDateFormatter.format(new Date(publishedAt));
}

function getViewAllHref() {
    return "/blog";
}

export function BlogHighlights({ articles }: BlogHighlightsProps) {
    if (articles.length === 0) {
        return (
            <section className="relative overflow-x-hidden bg-cream pt-24 pb-0 sm:pt-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,197,169,0.35),transparent_55%)]" />
                <div className="absolute inset-x-0 top-12 h-40 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-36 sm:px-6 sm:pb-40 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-[0.24em] text-sage">
                                From Our Journal
                            </p>
                            <h2 className="mt-4 max-w-xl font-display text-5xl font-normal leading-[0.95] tracking-tight text-forest sm:text-6xl lg:text-[4.75rem]">
                                What&apos;s New at Our Coffee Shop
                            </h2>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-earth-muted sm:text-lg">
                                This section is live from Shopify. The store currently has a News blog but no published storefront articles yet, so these preview cards will switch to real posts automatically as soon as you publish them.
                            </p>
                        </div>

                        <span className="inline-flex h-12 items-center justify-center self-start rounded-full border border-forest/10 bg-linen px-6 text-sm font-semibold text-forest/75">
                            Awaiting Shopify posts
                        </span>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {emptyStateCards.map((copy) => (
                            <article
                                key={copy}
                                className="rounded-4xl border border-forest/10 p-2"
                            >
                                <div className="aspect-[1.08/0.72] rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(184,204,176,0.55),rgba(48,74,56,0.18))]" />
                                <div className="px-2 pb-2 pt-5 text-forest">
                                    <p className="text-sm text-earth-muted">Publish in Shopify</p>
                                    <h3 className="mt-3 font-display text-[2rem] leading-[1.02] tracking-tight sm:text-[2.15rem]">
                                        Coming Soon to the Journal
                                    </h3>
                                    <p className="mt-4 text-base leading-relaxed text-earth-muted">
                                        {copy}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Wavy edge leading into newsletter */}
                <svg
                    className="absolute inset-x-0 -bottom-px block h-10 w-full sm:h-14"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,80 L0,50 C180,10 360,0 540,20 C720,40 900,60 1080,35 C1200,18 1320,10 1440,25 L1440,80 Z"
                        fill="#304A38"
                    />
                </svg>
            </section>
        );
    }

    const viewAllHref = getViewAllHref();

    return (
        <section className="relative overflow-x-hidden bg-cream pt-24 pb-0 sm:pt-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,197,169,0.35),transparent_55%)]" />
            <div className="absolute inset-x-0 top-10 h-56 bg-[radial-gradient(circle,rgba(255,255,255,0.85),transparent_70%)] blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(240,233,221,0.32))]" />

            <div className="relative mx-auto max-w-7xl px-4 pb-36 sm:px-6 sm:pb-40 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sage">
                            From Our Journal
                        </p>
                        <h2 className="mt-4 max-w-xl font-display text-5xl font-normal leading-[0.95] tracking-tight text-forest sm:text-6xl lg:text-[4.75rem]">
                            What&apos;s New
                        </h2>
                    </div>

                    {viewAllHref ? (
                        <Link
                            href={viewAllHref}
                            className="inline-flex h-12 items-center justify-center self-start rounded-full bg-forest px-6 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
                        >
                            View All
                        </Link>
                    ) : null}
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((article) => {
                        const href = `/blog/${article.handle}`;
                        const imageAlt = article.image?.altText || article.title;

                        return (
                            <Link
                                key={article.id}
                                href={href}
                                className="group block rounded-4xl focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                            >
                                <article className="h-full rounded-4xl border border-forest/10 p-2 transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="relative aspect-[1.08/0.72] overflow-hidden rounded-[1.6rem] bg-sage-light/25">
                                        {article.image ? (
                                            <Image
                                                src={article.image.url}
                                                alt={imageAlt}
                                                fill
                                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,204,176,0.6),rgba(48,74,56,0.25))]" />
                                        )}
                                    </div>

                                    <div className="px-2 pb-2 pt-5 text-forest">
                                        <p className="text-sm text-earth-muted">
                                            {formatArticleDate(article.publishedAt)}
                                        </p>
                                        <h3 className="mt-3 font-display text-[2rem] leading-[1.02] tracking-tight text-forest sm:text-[2.15rem]">
                                            {article.title}
                                        </h3>
                                        {article.excerpt ? (
                                            <p className="mt-4 text-base leading-relaxed text-earth-muted">
                                                {article.excerpt}
                                            </p>
                                        ) : null}
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Wavy edge leading into newsletter */}
            <svg
                className="absolute inset-x-0 -bottom-px block h-10 w-full sm:h-14"
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,80 L0,50 C180,10 360,0 540,20 C720,40 900,60 1080,35 C1200,18 1320,10 1440,25 L1440,80 Z"
                    fill="#304A38"
                />
            </svg>
        </section>
    );
}