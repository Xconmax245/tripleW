import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";



interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  index?: number;
  key?: React.Key;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      {/* Image container */}
      <div
        className={`product-card-image hover-shine relative aspect-[3/4] bg-surface overflow-hidden rounded-2xl ${
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

        {/* New badge — pill style */}
        {product.is_new && product.available && (
          <span className="tag-pill absolute top-3 left-3 z-10 bg-white/80 text-foreground shadow-soft-sm">
            New
          </span>
        )}

        {/* Sold out badge */}
        {!product.available && (
          <span className="tag-pill absolute top-3 left-3 z-10 bg-foreground/70 text-white">
            Sold Out
          </span>
        )}

        {/* Hover overlay with quick-view hint */}
        {product.available && (
          <div className="absolute inset-0 z-[3] flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
            <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-body font-medium px-5 py-2.5 rounded-full shadow-soft-md translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
              View Details
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1 px-0.5">
        <h3 className="text-sm font-body font-normal tracking-wide leading-snug group-hover:text-muted transition-colors duration-300">
          {product.name}
        </h3>
        <p
          className={`text-sm font-body font-medium ${
            product.available ? "text-foreground" : "text-muted"
          }`}
        >
          {product.enquire_only ? (
            <span className="text-muted text-xs uppercase tracking-wider font-semibold">Enquire</span>
          ) : (
            formatPrice(product.price)
          )}
        </p>
      </div>
    </Link>
  );
}
