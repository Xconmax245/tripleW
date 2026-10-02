import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getNewArrivals, getSettings } from "@/lib/data";

export default function HomePage() {
  const newArrivals = getNewArrivals(8);
  const settings = getSettings();

  return (
    <>
      {/* ─── 1. Editorial Hero ─── */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
        <Image
          src="/chyntia-juls-HlVjI5WmoQY-unsplash.jpg"
          alt="Triple W Boutique — Editorial fashion"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24 max-w-7xl mx-auto w-full">
          <h1 className="font-display text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.95] animate-fade-in-up">
            Triple W
          </h1>
          <p className="mt-4 sm:mt-6 text-white/80 text-base sm:text-lg lg:text-xl font-body max-w-md animate-fade-in-up stagger-2">
            Curated fashion for the modern wardrobe
          </p>
          <div className="mt-8 animate-fade-in-up stagger-3">
            <Link
              href="/shop"
              className="inline-block border border-white/80 text-white px-8 py-3.5 text-sm uppercase tracking-[0.2em] font-body hover:bg-white hover:text-black transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. Shop Women / Shop Men ─── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Women */}
          <Link href="/shop/women" className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
            <Image
              src="/young-woman-beautiful-red-dress.jpg"
              alt="Shop Women's Collection"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Women
              </span>
              <span className="mt-3 text-white/80 text-xs uppercase tracking-[0.25em] font-body">
                Shop Collection
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link href="/shop/men" className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
            <Image
              src="/two-beautiful-women-posing-camera-fashionable-clothes.jpg"
              alt="Shop Men's Collection"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Men
              </span>
              <span className="mt-3 text-white/80 text-xs uppercase tracking-[0.25em] font-body">
                Shop Collection
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── 3. New Arrivals ─── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              New Arrivals
            </h2>
            <p className="mt-2 text-muted text-sm sm:text-base font-body">
              The latest additions to our collection
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-block text-sm text-muted hover:text-foreground underline underline-offset-4 font-body transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-block text-sm text-muted hover:text-foreground underline underline-offset-4 font-body transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* ─── 4. About Strip ─── */}
      <section className="border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16">
          <div className="flex-1">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
              The Boutique
            </h2>
            <p className="text-muted font-body text-sm sm:text-base leading-relaxed max-w-lg">
              Triple W is a curated fashion boutique bringing you carefully
              selected pieces from around the world. We believe in quality over
              quantity — every item in our collection is chosen for its
              craftsmanship, fit, and enduring style.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-sm text-foreground underline underline-offset-4 font-body hover:opacity-70 transition-opacity duration-200"
            >
              Read Our Story
            </Link>
          </div>
          <div className="relative w-full sm:w-80 lg:w-96 aspect-[4/3] shrink-0">
            <Image
              src="/two-beautiful-women-posing-camera-fashionable-clothes.jpg"
              alt="About Triple W Boutique"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── 5. WhatsApp CTA Section ─── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 text-center">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
          Ready to Order?
        </h2>
        <p className="text-muted font-body text-sm sm:text-base mb-8 max-w-md mx-auto">
          Browse our collection and message us on WhatsApp with the item name
          and size to place your order.
        </p>
        <a
          href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-whatsapp text-white px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-whatsapp-hover hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message Us on WhatsApp
        </a>
      </section>

      {/* Floating WhatsApp FAB */}
      <WhatsAppButton
        phone={settings.whatsapp_number}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}
