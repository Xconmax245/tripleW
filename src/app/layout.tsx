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
  title: {
    default: "Triple W Boutique — Curated Fashion",
    template: "%s | Triple W Boutique",
  },
  description:
    "Discover curated fashion at Triple W Boutique. Shop our collection of premium women's and men's clothing and order directly via WhatsApp.",
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
