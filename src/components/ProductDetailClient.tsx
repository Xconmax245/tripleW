"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, buildWhatsAppUrl } from "@/lib/utils";
import ProductCard from "./ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  whatsappNumber: string;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  whatsappNumber,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isSoldOut = !product.available;
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    product.name,
    selectedSize ?? undefined,
    product.price
  );


  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Breadcrumb */}
      <nav className="pt-6 sm:pt-8 pb-6 text-xs text-muted font-body flex items-center gap-2">
        <Link href="/shop" className="hover-underline hover:text-foreground transition-colors duration-300">
          Shop
        </Link>
        <span className="text-muted/40">/</span>
        <Link
          href={`/shop/${product.gender}`}
          className="hover-underline hover:text-foreground transition-colors duration-300 capitalize"
        >
          {product.gender}
        </Link>
        <span className="text-muted/40">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-16 sm:pb-24">
        {/* Images */}
        <div data-aos="fade-right">
          {/* Main image */}
          <div className="relative aspect-[3/4] bg-surface overflow-hidden rounded-3xl shadow-soft-md">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-all duration-500 ${
                isSoldOut ? "saturate-[0.35] brightness-105" : ""
              }`}
            />
            {isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                <span className="tag-pill bg-white/90 text-muted shadow-soft-sm text-xs">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-16 h-20 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                    activeImageIndex === i
                      ? "ring-2 ring-foreground ring-offset-2 ring-offset-background shadow-soft-sm"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Image ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="lg:pt-4" data-aos="fade-left" data-aos-delay="100">
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {product.is_new && product.available && (
              <span className="tag-pill bg-foreground text-background">New</span>
            )}
            <span className="tag-pill bg-surface text-muted capitalize">{product.category}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl sm:text-3xl font-body font-medium">
            {product.enquire_only ? (
              <span className="text-muted text-lg tracking-wide uppercase">Price upon request</span>
            ) : (
              formatPrice(product.price)
            )}
          </p>

          {/* Description */}
          <div className="mt-8 border-t border-border/50 pt-8">
            <p className="text-muted font-body text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.enquire_only ? (
            <div className="mt-10 bg-surface/50 p-6 rounded-2xl border border-border/50 text-center">
              <span className="inline-block bg-white text-foreground px-4 py-1 rounded-full text-xs font-medium shadow-soft-sm mb-4">
                Enquiry Only
              </span>
              <p className="text-sm font-body text-foreground/80 leading-relaxed mb-6">
                Want to know more about this product? Tap the button below to enquire on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-whatsapp text-white py-4 px-6 rounded-xl text-sm font-body font-medium hover:bg-whatsapp-hover transition-colors shadow-soft-sm"
              >
                Enquire on WhatsApp
              </a>
            </div>
          ) : (
            <>
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-widest text-muted font-body mb-4">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={isSoldOut}
                        className={`min-w-[52px] px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-foreground text-background shadow-soft-sm scale-105"
                            : "bg-surface text-foreground hover:bg-surface-hover hover:scale-105"
                        } ${isSoldOut ? "opacity-30 cursor-not-allowed" : "btn-press"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp CTA */}
              <div className="mt-10">
                <a
                  href={isSoldOut ? undefined : whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={isSoldOut}
                  className={`flex items-center justify-center gap-3 w-full py-4.5 px-8 rounded-2xl text-sm font-body font-medium uppercase tracking-wider transition-all duration-300 ${
                    isSoldOut
                      ? "bg-surface text-muted cursor-not-allowed"
                      : "bg-whatsapp text-white hover:bg-whatsapp-hover hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] btn-press"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {isSoldOut ? "Currently Sold Out" : "Order via WhatsApp"}
                </a>
              </div>
            </>
          )}

          {/* Meta */}
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-body">
            <span className="tag-pill bg-surface text-muted">
              {product.gender === "women" ? "Women's" : product.gender === "men" ? "Men's" : "Unisex"}
            </span>
            {product.sizes && (
              <span className="tag-pill bg-surface text-muted">
                Sizes: {product.sizes.join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border/50 py-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-muted font-body mb-3" data-aos="fade-up">
            More to Explore
          </p>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-12" data-aos="fade-up" data-aos-delay="100">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} whatsappNumber={whatsappNumber} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
