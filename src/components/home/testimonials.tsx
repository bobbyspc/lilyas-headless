import Image from "next/image";

export function Testimonials() {
    return (
        <section className="bg-linen py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-center text-4xl font-normal tracking-tight text-forest sm:text-5xl lg:text-6xl">
                    What People<br />Love About Us
                </h2>

                {/* Bento grid: 3 cols, 2 rows */}
                <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(280px,1fr)]">
                    {/* Row 1, Col 1 "Quote" */}
                    <div className="flex flex-col justify-between rounded-3xl border border-forest/15 bg-sage-light/40 p-8 lg:p-10">
                        <div>
                            <span className="font-display text-5xl leading-none text-forest">&ldquo;</span>
                            <p className="mt-2 text-base font-medium leading-relaxed text-forest sm:text-lg">
                                Finally, a brand that gets it. Clean ingredients AND amazing taste? I&apos;m hooked.
                            </p>
                        </div>
                        <p className="mt-6 text-sm text-earth-muted">
                            Sarah M. &mdash; Verified Customer
                        </p>
                    </div>

                    {/* Row 1, Col 2 "Image" */}
                    <div className="relative min-h70 overflow-hidden rounded-3xl bg-sage/20">
                        <Image
                            src="/review-img1.png"
                            alt="Lilya's Refresh Strawberry Lemon at a yoga studio"
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Row 1, Col 3 "Quote" */}
                    <div className="flex flex-col justify-between rounded-3xl border border-forest/15 bg-sage-light/40 p-8 lg:p-10">
                        <div>
                            <span className="font-display text-5xl leading-none text-forest">&ldquo;</span>
                            <p className="mt-2 text-base font-medium leading-relaxed text-forest sm:text-lg">
                                I&apos;ve tried every brand out there. Nothing comes close to the quality and flavor of Lilya&apos;s.
                            </p>
                        </div>
                        <p className="mt-6 text-sm text-earth-muted">
                            James K. &mdash; Repeat Buyer
                        </p>
                    </div>

                    {/* Row 2, Col 1 "Image" */}
                    <div className="relative min-h-70 overflow-hidden rounded-3xl bg-sage/20">
                        <Image
                            src="/review-img2.png"
                            alt="Lilya's Calm Moroccan Mint at a pilates studio"
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Row 2, Col 2 "Quote" */}
                    <div className="flex flex-col justify-between rounded-3xl border border-forest/15 bg-sage-light/40 p-8 lg:p-10">
                        <div>
                            <span className="font-display text-5xl leading-none text-forest">&ldquo;</span>
                            <p className="mt-2 text-base font-medium leading-relaxed text-forest sm:text-lg">
                                My whole family loves these. It&apos;s the only brand my kids actually ask for by name.
                            </p>
                        </div>
                        <p className="mt-6 text-sm text-earth-muted">
                            Maria L. &mdash; Mom of 3
                        </p>
                    </div>

                    {/* Row 2, Col 3 "Image" */}
                    <div className="relative min-h-70 overflow-hidden rounded-3xl bg-sage/20">
                        <Image
                            src="/review-img3.png"
                            alt="Lilya's Refresh Strawberry Lemon held up against a blue sky"
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
