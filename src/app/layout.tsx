import type { Metadata } from "next";
import { Cabin_Condensed, Calistoga, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { getServerCart } from "@/lib/cart-actions";

const cabinCondensed = Cabin_Condensed({
  variable: "--font-cabin-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const calistoga = Calistoga({
  variable: "--font-calistoga",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LILYAS — Earthy. Natural. Delicious.",
  description: "Premium natural products crafted with care",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getServerCart();

  return (
    <html lang="en">
      <body
        className={`${cabinCondensed.variable} ${calistoga.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider cart={cart}>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
