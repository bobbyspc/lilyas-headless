import Image from "next/image";

const marqueeItems = [
    { icon: "/icon-lemon.png", label: "100% Natural" },
    { icon: "/icon-plant.png", label: "Plant-Based" },
    { icon: "/icon-x.png", label: "No Artificial Stuff" },
    { icon: "/icon-shipping.png", label: "Free Shipping" },
    { icon: "/icon-lemon.png", label: "100% Local" },
    { icon: "/icon-plant.png", label: "Plant-Based" },
    { icon: "/icon-x.png", label: "No Artificial Stuff" },
    { icon: "/icon-shipping.png", label: "Free Shipping" },
    { icon: "/icon-lemon.png", label: "100% Natural" },
    { icon: "/icon-plant.png", label: "Plant-Based" },
];

export function Marquee() {
    return (
        <div className="overflow-hidden whitespace-nowrap bg-forest-dark py-4 text-white">
            <div className="animate-marquee flex w-max items-center">
                {[0, 1].map((copyIndex) => (
                    <div
                        key={copyIndex}
                        className="flex shrink-0 items-center gap-12 pr-12 font-sans text-lg font-normal tracking-wide"
                        aria-hidden={copyIndex === 1}
                    >
                        {marqueeItems.map((item, itemIndex) => (
                            <div key={`${copyIndex}-${itemIndex}`} className="flex items-center gap-12">
                                <span className="flex items-center gap-2">
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="inline-block h-6 w-6"
                                    />
                                    {item.label}
                                </span>
                                {itemIndex < marqueeItems.length - 1 ? <span>•</span> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
