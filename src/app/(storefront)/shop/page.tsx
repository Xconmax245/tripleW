import { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { serverClient } from "@/lib/supabase";
import { getProducts } from "@/lib/products";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full Triple W Boutique collection. Women's and men's fashion — order directly via WhatsApp.",
};

export default async function ShopPage() {
  const client = await serverClient();
  const products = await getProducts(client);
  const settings = await getSettings(client);

  return (
    <>
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight animate-fade-in-up">
          Shop
        </h1>
        <p className="mt-3 text-muted text-sm sm:text-base font-body animate-fade-in-up stagger-1">
          Our complete collection
        </p>

        {/* Category tabs */}
        <nav className="mt-8 flex items-center gap-6 border-b border-border overflow-x-auto pb-px animate-fade-in-up stagger-2">
          <Link
            href="/shop"
            className="text-sm font-body uppercase tracking-wider pb-3 border-b-2 border-foreground text-foreground whitespace-nowrap"
          >
            All
          </Link>
          <Link
            href="/shop/women"
            className="text-sm font-body uppercase tracking-wider pb-3 border-b-2 border-transparent text-muted hover:text-foreground transition-colors whitespace-nowrap"
          >
            Women
          </Link>
          <Link
            href="/shop/men"
            className="text-sm font-body uppercase tracking-wider pb-3 border-b-2 border-transparent text-muted hover:text-foreground transition-colors whitespace-nowrap"
          >
            Men
          </Link>
        </nav>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} whatsappNumber={settings?.whatsapp_number || ""} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <WhatsAppButton
        phone={settings?.whatsapp_number || ""}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <p className="font-display text-2xl sm:text-3xl text-muted/50 mb-3">
        Nothing here yet
      </p>
      <p className="text-sm text-muted font-body">
        New pieces are added regularly. Check back soon or{" "}
        <Link href="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
          get in touch
        </Link>{" "}
        for updates.
      </p>
    </div>
  );
}
