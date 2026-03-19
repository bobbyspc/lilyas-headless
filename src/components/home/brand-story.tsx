import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
    return (
        <>
            {/* Wavy top divider */}
            <div className="relative z-10 -mb-1 bg-cream">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
                    <path d="M0 0H1440V30C1200 10 960 60 720 30C480 0 240 70 0 30V0Z" className="fill-cream" />
                    <path d="M0 30C240 70 480 0 720 30C960 60 1200 10 1440 30V80H0V30Z" className="fill-sage-light/40" />
                </svg>
            </div>

            <section className="relative bg-sage-light/40 overflow-hidden">
                {/* Topographical line background */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
                    viewBox="0 0 1000 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <path d="M-50 200C100 180 200 260 350 220S550 140 700 200S900 300 1050 250" stroke="currentColor" strokeWidth="2" className="text-forest" />
                    <path d="M-50 260C120 240 250 310 380 280S560 200 720 260S880 350 1050 310" stroke="currentColor" strokeWidth="1.5" className="text-forest" />
                    <path d="M-50 320C80 300 220 370 400 340S580 260 740 320S920 400 1050 370" stroke="currentColor" strokeWidth="2" className="text-forest" />
                    <path d="M-50 390C140 370 260 440 410 400S600 330 750 390S900 460 1050 430" stroke="currentColor" strokeWidth="1.5" className="text-forest" />
                    <path d="M-50 460C100 440 230 500 370 470S570 400 730 460S890 530 1050 490" stroke="currentColor" strokeWidth="2" className="text-forest" />
                    <path d="M-50 530C130 510 280 570 420 540S610 470 760 530S920 590 1050 560" stroke="currentColor" strokeWidth="1.5" className="text-forest" />
                    <path d="M-50 600C90 580 210 640 380 610S580 540 740 600S910 660 1050 630" stroke="currentColor" strokeWidth="2" className="text-forest" />
                </svg>

                <div className="relative mx-auto max-w-7xl grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 px-4 sm:px-6 lg:px-8">
                    <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                            src="/bloom-lemonade-in park.png"
                            alt="Lilya's Bloom Lavender Lemonade in the park"
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover p-3 object-center rounded-[40px]"
                        />
                    </div>

                    <div className="flex flex-col justify-center py-20 text-forest">
                        <h2 className="font-display text-5xl font-normal leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                            From the earth, for you.
                        </h2>
                        <p className="mt-8 max-w-md text-lg leading-relaxed text-earth-muted">
                            We believe nourishment starts from the ground up. Every product is
                            thoughtfully sourced, minimally processed, and crafted to bring you
                            closer to nature&mdash;without compromising on taste.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/collections"
                                className="inline-block rounded-xl bg-forest px-10 py-5 font-display text-base font-normal tracking-wide text-white shadow-lg transition-all hover:bg-forest-dark hover:shadow-xl"
                            >
                                Discover More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Wavy bottom divider */}
            <div className="relative z-10 -mt-1 bg-cream">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full -scale-x-100" preserveAspectRatio="none">
                    <path d="M0 0C240 40 480 -10 720 30C960 70 1200 0 1440 20V0H0Z" className="fill-sage-light/40" />
                    <path d="M0 80H1440V20C1200 0 960 70 720 30C480 -10 240 40 0 0V80Z" className="fill-cream" />
                </svg>
            </div>
        </>
    );
}
