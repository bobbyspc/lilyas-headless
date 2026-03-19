import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleByHandle } from "@/lib/shopify";
import type { Metadata } from "next";

export const revalidate = 300;

type Props = {
    params: Promise<{ handle: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const article = await getArticleByHandle(handle);
    if (!article) return {};
    return {
        title: `${article.seo.title || article.title} — LILYAS`,
        description: article.seo.description || article.excerpt || undefined,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { handle } = await params;
    const article = await getArticleByHandle(handle);

    if (!article) notFound();

    return (
        <article className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-10">
                <ol className="flex items-center gap-2 text-sm text-earth-muted">
                    <li>
                        <Link
                            href="/blog"
                            className="transition-colors hover:text-forest"
                        >
                            Blog
                        </Link>
                    </li>
                    <li className="text-forest/25">/</li>
                    {article.blog && (
                        <>
                            <li className="text-earth-muted">
                                {article.blog.title}
                            </li>
                            <li className="text-forest/25">/</li>
                        </>
                    )}
                    <li className="truncate text-forest">{article.title}</li>
                </ol>
            </nav>

            {/* Header */}
            <header className="mx-auto max-w-3xl text-center">
                <div className="flex items-center justify-center gap-3 text-sm text-earth-muted">
                    <time dateTime={article.publishedAt}>
                        {dateFormatter.format(new Date(article.publishedAt))}
                    </time>
                    {article.author && (
                        <>
                            <span className="text-forest/20">·</span>
                            <span>{article.author}</span>
                        </>
                    )}
                </div>
                <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
                    {article.title}
                </h1>
                {article.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-forest/10 bg-linen px-3 py-1 text-xs font-medium text-earth-muted"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Featured image */}
            {article.image && (
                <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl">
                    <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        width={article.image.width}
                        height={article.image.height}
                        priority
                        className="w-full object-cover"
                        sizes="(min-width: 1024px) 56rem, 100vw"
                    />
                </div>
            )}

            {/* Article body */}
            <div
                className="prose prose-lg prose-earth mx-auto mt-12 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Back link */}
            <div className="mx-auto mt-16 max-w-3xl border-t border-forest/10 pt-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                    </svg>
                    Back to Blog
                </Link>
            </div>
        </article>
    );
}
