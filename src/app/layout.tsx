import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AOSProvider from "@/components/AOSProvider";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://triplew.shop"),
  title: {
    default: "Triple W Boutique | TripleW | Curated Fashion",
    template: "%s | Triple W Boutique",
  },
  description:
    "Discover curated fashion at Triple W Boutique (TripleW). Shop our exclusive collection of premium women's and men's clothing and order directly via WhatsApp.",
  keywords: ["Triple W", "TripleW", "triplew boutique", "fashion boutique", "curated fashion", "clothing store Lagos", "order via WhatsApp", "premium fashion"],
  openGraph: {
    title: "Triple W Boutique | TripleW | Curated Fashion",
    description: "Discover curated fashion at Triple W Boutique. Shop our collection of premium clothing.",
    url: "https://triplew.shop",
    siteName: "Triple W Boutique",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triple W Boutique | TripleW",
    description: "Curated fashion for the modern wardrobe. Shop Triple W.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <AOSProvider>
          {children}
        </AOSProvider>
      </body>
    </html>
  );
}
