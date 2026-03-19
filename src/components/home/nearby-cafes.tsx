"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

const CAFES = [
    {
        borough: "Brooklyn",
        address: "123 Bedford Ave,",
        city: "Brooklyn, NY 11211",
        hours: "Open daily: 7AM – 7PM",
        lat: 40.7193,
        lng: -73.9573,
    },
    {
        borough: "Manhattan",
        address: "456 Spring St,",
        city: "New York, NY 10012",
        hours: "Open daily: 7AM – 8PM",
        lat: 40.7263,
        lng: -74.0037,
    },
    {
        borough: "Queens",
        address: "789 Broadway,",
        city: "Queens, NY 11106",
        hours: "Open daily: 7AM – 6PM",
        lat: 40.7614,
        lng: -73.9243,
    },
    {
        borough: "Queens",
        address: "134-16 36th Road,",
        city: "Flushing, NY 11354",
        hours: "Open daily: 8AM – 6PM",
        lat: 40.7592,
        lng: -73.8317,
    },
] as const;

function getDirectionsUrl(address: string, city: string) {
    const query = encodeURIComponent(`${address} ${city}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

function CafeMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<LeafletMap | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        let cancelled = false;

        (async () => {
            const L = (await import("leaflet")).default;
            // @ts-expect-error -- CSS module lacks type declarations
            await import("leaflet/dist/leaflet.css");

            if (cancelled || !mapRef.current) return;

            const map = L.map(mapRef.current, {
                center: [40.7328, -73.9354],
                zoom: 11,
                zoomControl: false,
                attributionControl: false,
            });

            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                { maxZoom: 19 },
            ).addTo(map);

            L.control.attribution({ position: "bottomright" }).addTo(map);
            map.attributionControl?.addAttribution(
                '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            );

            const icon = L.divIcon({
                className: "",
                html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40" fill="none">
                    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#304A38"/>
                    <circle cx="14" cy="13" r="5" fill="#FBF7F2"/>
                </svg>`,
                iconSize: [28, 40],
                iconAnchor: [14, 40],
            });

            for (const cafe of CAFES) {
                L.marker([cafe.lat, cafe.lng], { icon }).addTo(map);
            }

            mapInstance.current = map;
            setReady(true);
        })();

        return () => {
            cancelled = true;
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);

    return (
        <div className="relative z-0 h-full w-full overflow-hidden rounded-3xl">
            {!ready && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream">
                    <span className="text-sm text-earth-muted">Loading map…</span>
                </div>
            )}
            <div ref={mapRef} className="h-full w-full" />
        </div>
    );
}

export function NearbyCafes() {
    return (
        <section className="bg-forest py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center sm:mb-16">
                    <h2 className="font-display text-5xl font-normal leading-[0.95] tracking-tight text-cream sm:text-6xl lg:text-7xl">
                        Find Us Here
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-sage-light sm:text-lg">
                        Available in the shops and spaces that share our love for thoughtful, natural products.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="min-h-95 lg:row-span-2 lg:min-h-0">
                        <CafeMap />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:row-span-2">
                        {CAFES.map((cafe) => (
                            <div
                                key={`${cafe.address}-${cafe.city}`}
                                className="flex flex-col justify-between rounded-3xl bg-cream p-6 sm:p-7"
                            >
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-widest text-sage">
                                        {cafe.borough}
                                    </p>
                                    <p className="mt-3 text-base font-bold leading-snug text-forest sm:text-lg">
                                        {cafe.address}
                                        <br />
                                        {cafe.city}
                                    </p>
                                    <p className="mt-1.5 text-sm text-earth-muted">
                                        {cafe.hours}
                                    </p>
                                </div>

                                <a
                                    href={getDirectionsUrl(cafe.address, cafe.city)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-forest-dark"
                                >
                                    Get Directions
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}