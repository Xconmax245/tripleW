import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetailClient from "@/components/ProductDetailClient";
import WhatsAppButton from "@/components/WhatsAppButton";
import { serverClient } from "@/lib/supabase";
import { getProducts, getProductBySlug } from "@/lib/products";
import { getSettings } from "@/lib/settings";

const genderCategories: Record<string, { title: string; description: string }> = {
  women: {
    title: "Women",
    description: "Curated women's fashion — dresses, tops, shoes, and more.",
  },
  men: {
    title: "Men",
    description: "Premium men's fashion — shirts, trousers, shoes, and more.",
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;

  // Check if it's a gender category
  const cat = genderCategories[category];
  if (cat) {
    return {
      title: `Shop ${cat.title}`,
      description: cat.description,
    };
  }

  const client = await serverClient();
  const product = await getProductBySlug(client, category);
  if (product) {
    return {
      title: product.name,
      description:
        product.description?.slice(0, 160) ||
        `Shop ${product.name} at Triple W Boutique.`,
    };
  }

  return {};
}

// Removed generateStaticParams to allow dynamic fetching from Supabase

export default async function CategoryOrProductPage({ params }: PageProps) {
  const { category } = await params;
  const client = await serverClient();
  const settings = await getSettings(client);

  // ─── Gender category page ───
  const cat = genderCategories[category];
  if (cat) {
    const products = await getProducts(client, { gender: category });

    return (
      <>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight animate-fade-in-up">
            {cat.title}
          </h1>
          <p className="mt-3 text-muted text-sm sm:text-base font-body animate-fade-in-up stagger-1">
            {cat.description}
          </p>

          <nav className="mt-8 flex items-center gap-6 border-b border-border overflow-x-auto pb-px animate-fade-in-up stagger-2">
            <Link
              href="/shop"
              className="text-sm font-body uppercase tracking-wider pb-3 border-b-2 border-transparent text-muted hover:text-foreground transition-colors whitespace-nowrap"
            >
              All
            </Link>
            <Link
              href="/shop/women"
              className={`text-sm font-body uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
                category === "women"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Women
            </Link>
            <Link
              href="/shop/men"
              className={`text-sm font-body uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
                category === "men"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Men
            </Link>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-24">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} whatsappNumber={settings?.whatsapp_number || ""} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl sm:text-3xl text-muted/50 mb-3">
                Nothing here yet
              </p>
              <p className="text-sm text-muted font-body">
                New pieces are added regularly. Check back soon or{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  get in touch
                </Link>{" "}
                for updates.
              </p>
            </div>
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

  // ─── Product detail page ───
  const product = await getProductBySlug(client, category);
  if (!product) {
    notFound();
  }

  // Get related products manually
  const allProducts = await getProducts(client, { category: product.category });
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      whatsappNumber={settings?.whatsapp_number || ""}
    />
  );
}
