import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { serverClient } from "@/lib/supabase";
import { getProductBySlug, getProducts } from "@/lib/products";
import { getSettings } from "@/lib/settings";

/* 
  This route catches both /shop/[category] (handled by the [category] route) 
  and /shop/[category]/[slug] for product detail.
*/

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = await serverClient();
  const product = await getProductBySlug(client, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `Shop ${product.name} at Triple W Boutique.`,
  };
}

// Removed generateStaticParams for dynamic DB fetching

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const client = await serverClient();
  const product = await getProductBySlug(client, slug);

  if (!product) {
    notFound();
  }

  const settings = await getSettings(client);
  
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
