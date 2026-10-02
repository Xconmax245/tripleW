import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProductsByGender, getSettings } from "@/lib/data";

const validCategories: Record<string, { title: string; description: string }> = {
  women: {
    title: "Women",
    description: "Curated women's fashion — dresses, tops, shoes, and more.",
  },
  men: {
    title: "Men",
    description: "Premium men's fashion — shirts, trousers, shoes, and more.",
  },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = validCategories[category];
  if (!cat) return {};
  return {
    title: `Shop ${cat.title}`,
    description: cat.description,
  };
}

export function generateStaticParams() {
  return Object.keys(validCategories).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // If it's a product slug (not a gender category), let it fall through to the slug route
  const cat = validCategories[category];
  if (!cat) {
    notFound();
  }

  const products = getProductsByGender(category);
  const settings = getSettings();
  const activeTab = category;

  return (
    <>
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight animate-fade-in-up">
          {cat.title}
        </h1>
        <p className="mt-3 text-muted text-sm sm:text-base font-body animate-fade-in-up stagger-1">
          {cat.description}
        </p>

        {/* Category tabs */}
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
              activeTab === "women"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Women
          </Link>
          <Link
            href="/shop/men"
            className={`text-sm font-body uppercase tracking-wider pb-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "men"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
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
              <ProductCard key={product.id} product={product} index={i} />
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
        phone={settings.whatsapp_number}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}
