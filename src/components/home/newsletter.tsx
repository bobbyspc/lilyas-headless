export function Newsletter() {
    return (
        <section className="bg-forest">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:px-8 text-center">
                <h2 className="font-display text-5xl font-normal tracking-tight text-white sm:text-6xl">
                    Join the<br />family.
                </h2>
                <p className="mt-6 max-w-md text-lg text-sage-light">
                    Get early access to new drops, recipes, and exclusive offers
                    delivered straight to your inbox.
                </p>
                <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-base text-white outline-none transition-all placeholder:text-white/50 focus:border-white/50 focus:bg-white/15"
                    />
                    <button
                        type="button"
                        className="rounded-xl bg-white px-8 py-4 font-display text-sm font-normal tracking-wide text-forest transition-all hover:bg-cream"
                    >
                        Subscribe
                    </button>
                </div>
                <p className="mt-4 text-sm text-sage-light/50">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
