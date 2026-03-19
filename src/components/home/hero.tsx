import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center bg-forest overflow-hidden">
            {/* Text Content */}
            <div className="flex flex-col items-center px-6 pt-32 pb-0 text-center sm:pt-40">
                <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight text-cream sm:text-7xl lg:text-8xl">
                    Conscious Living<br />Tastes This Good
                </h1>
                <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-sage-light sm:text-lg">
                    Elevate your everyday with vibrant, sip-ready teas and fresh, flavorful bites crafted to fuel your lifestyle.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/collections"
                        className="rounded-full bg-cream px-7 py-3 text-sm font-medium tracking-wide text-forest transition-all hover:bg-white"
                    >
                        Shop Sip &amp; Go Teas
                    </Link>
                    <Link
                        href="/pages/wholesale"
                        className="rounded-full border border-cream/60 px-7 py-3 text-sm font-medium tracking-wide text-cream transition-all hover:bg-cream hover:text-forest"
                    >
                        Wholesale Partners
                    </Link>
                </div>
            </div>

            {/* Product imagery */}
            <div className="relative w-full max-w-6xl overflow-hidden px-0 sm:px-4 lg:px-6 lg:max-h-[45vh] ">
                <div className="relative left-1/2 w-[114%] max-w-none -translate-x-1/2 translate-y-6 sm:w-[110%] sm:translate-y-8 lg:w-[118%] lg:translate-y-10">
                    <Image
                        src="/hero-img5.png"
                        alt="Lilya's products"
                        width={1200}
                        height={600}
                        priority
                        sizes="(min-width: 1280px) 1152px, (min-width: 1024px) 1024px, 114vw"
                        className="relative z-10 mx-auto w-full max-w-none object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
