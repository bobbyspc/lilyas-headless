import { MarqueeAnimation } from "@/components/ui/marquee-effect";

export function MarqueeEffectDoubleExample() {
    return (
        <div className="flex flex-col gap-4">
            <MarqueeAnimation
                direction="left"
                baseVelocity={-3}
                className="bg-forest text-white py-2 text-3xl sm:text-4xl"
            >
                LILYAS
            </MarqueeAnimation>
            <MarqueeAnimation
                direction="right"
                baseVelocity={-3}
                className="bg-sage-light py-2 text-3xl text-forest-dark sm:text-4xl"
            >
                Earthy • Natural • Delicious
            </MarqueeAnimation>
        </div>
    );
}