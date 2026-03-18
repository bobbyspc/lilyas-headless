import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Shopify webhook handler for instant cache invalidation.
 *
 * In your Shopify admin, go to Settings → Notifications → Webhooks and create
 * webhooks for the events below pointing to:
 *   https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATION_SECRET
 *
 * Recommended webhook topics:
 *   - products/create, products/update, products/delete
 *   - collections/create, collections/update, collections/delete
 *   - inventory_levels/update
 */

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");

    if (!process.env.SHOPIFY_REVALIDATION_SECRET) {
        return NextResponse.json(
            { error: "SHOPIFY_REVALIDATION_SECRET is not configured" },
            { status: 500 }
        );
    }

    if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate entire layout so all pages pick up fresh Shopify data
    revalidatePath("/", "layout");

    const topic = req.headers.get("x-shopify-topic") ?? "unknown";
    return NextResponse.json({ revalidated: true, topic });
}

