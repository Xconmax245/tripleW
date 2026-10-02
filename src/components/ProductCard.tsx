import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const staggerClass = index < 8 ? `stagger-${index + 1}` : "";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group block animate-fade-in-up ${staggerClass}`}
    >
      {/* Image container */}
      <div
        className={`product-card-image relative aspect-[3/4] bg-surface overflow-hidden ${
          !product.available ? "sold-out-card" : ""
        }`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />

        {/* New badge */}
        {product.is_new && product.available && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.15em] font-body font-medium px-2.5 py-1 border border-foreground/80 bg-background/80 text-foreground">
            New
          </span>
        )}

        {/* Sold out badge */}
        {!product.available && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.15em] font-body font-medium px-2.5 py-1 border border-foreground/40 bg-background/90 text-muted">
            Sold Out
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-body font-normal tracking-wide leading-snug group-hover:opacity-70 transition-opacity duration-200">
          {product.name}
        </h3>
        <p
          className={`text-sm font-body ${
            product.available ? "text-foreground" : "text-muted"
          }`}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
