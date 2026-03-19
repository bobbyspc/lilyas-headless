import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <h1 className="font-display text-6xl font-normal text-earth">404</h1>
            <p className="mt-4 text-lg text-earth-muted">Page not found</p>
            <Link
                href="/"
                className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
            >
                Back to Home
            </Link>
        </div>
    );
}
