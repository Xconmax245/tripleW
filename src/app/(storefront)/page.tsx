import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCleanWhatsAppNumber } from "@/lib/utils";
import { serverClient } from "@/lib/supabase";
import { getNewProducts } from "@/lib/products";
import { getSettings } from "@/lib/settings";

export default async function HomePage() {
  const client = await serverClient();
  const newArrivals = await getNewProducts(client, 8);
  const settings = await getSettings(client);

  return (
    <>
      {/* ─── 1. Full-bleed Editorial Hero ─── */}
      <section className="relative w-full h-[92vh] sm:h-[95vh] overflow-hidden -mt-16 sm:-mt-20">
        {/* Background video */}
        <video
          src="/gemini_generated_video_278c702b.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top scale-105"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Floating decorative elements */}
        <div className="glow-blob w-[600px] h-[600px] bg-white/20 -top-40 -right-40" />

        {/* Hero content — asymmetric editorial positioning */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 pb-20 sm:pb-28 lg:pb-32">
          {/* Eyebrow removed as requested */}

          {/* Main heading — large editorial serif */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="font-display text-white text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-tight max-w-3xl"
          >
            Triple W
          </h1>

          {/* Tagline */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 sm:mt-6 text-white/70 text-base sm:text-lg lg:text-xl font-body max-w-md leading-relaxed"
          >
            Curated fashion for the modern wardrobe. Discover pieces that move
            with you.
          </p>

          {/* CTAs */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-8 sm:mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 rounded-full text-sm font-body font-medium uppercase tracking-wider hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-soft-lg btn-press"
            >
              Explore Collection
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/shop/women"
              className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-full text-sm font-body uppercase tracking-wider hover:bg-white/10 hover:border-white/70 transition-all duration-300"
            >
              Shop Women
            </Link>
          </div>
        </div>

        {/* Scroll indicator removed as requested */}
      </section>

      {/* ─── Marquee Ticker ─── */}
      <div className="overflow-hidden py-5 border-b border-border bg-surface/50">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {[
                "New Arrivals",
                "✦",
                "Order via WhatsApp",
                "✦",
                "Curated Fashion",
                "✦",
                "Premium Quality",
                "✦",
                "Shop Now",
                "✦",
              ].map((text, j) => (
                <span
                  key={`${i}-${j}`}
                  className={`whitespace-nowrap text-xs uppercase tracking-[0.2em] font-body ${
                    text === "✦" ? "text-muted/40 text-[8px]" : "text-muted"
                  }`}
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. Shop Women / Shop Men — Asymmetric Editorial Grid ─── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <p
            data-aos="fade-up"
            className="text-xs uppercase tracking-[0.3em] text-muted font-body mb-3"
          >
            Collections
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight"
          >
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
          {/* Women — larger card */}
          <Link
            href="/shop/women"
            className="group sm:col-span-7 relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-3xl hover-lift"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <Image
              src="/young-woman-beautiful-red-dress.jpg"
              alt="Shop Women's Collection"
              fill
              sizes="(max-width: 640px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="tag-pill bg-white/15 text-white/80 backdrop-blur-sm mb-3">
                Women&apos;s
              </span>
              <h3 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-2">
                Women
              </h3>
              <div className="mt-4 flex items-center gap-2 text-white/70 text-sm font-body opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                <span>Shop Collection</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Men — smaller card */}
          <Link
            href="/shop/men"
            className="group sm:col-span-5 relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-3xl hover-lift"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <Image
              src="/brian-lawson-R4O8mJeih1w-unsplash.jpg"
              alt="Shop Men's Collection"
              fill
              sizes="(max-width: 640px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="tag-pill bg-white/15 text-white/80 backdrop-blur-sm mb-3">
                Men&apos;s
              </span>
              <h3 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-2">
                Men
              </h3>
              <div className="mt-4 flex items-center gap-2 text-white/70 text-sm font-body opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                <span>Shop Collection</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── 3. New Arrivals ─── */}
      <section className="relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/50 to-surface/0 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-12 sm:mb-16">
            <div>
              <p
                data-aos="fade-up"
                className="text-xs uppercase tracking-[0.3em] text-muted font-body mb-3"
              >
                Just Dropped
              </p>
              <h2
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight"
              >
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop"
              data-aos="fade-left"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-muted hover:text-foreground font-body transition-colors duration-300 group"
            >
              View All
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} whatsappNumber={settings?.whatsapp_number || ""} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground font-body transition-colors group"
            >
              View All Products
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="section-divider mx-auto max-w-7xl" />

      {/* ─── 4. About Strip — Full-width immersive ─── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div data-aos="fade-right">
              <p className="text-xs uppercase tracking-[0.3em] text-muted font-body mb-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
                The Boutique
              </h2>
              <p className="text-muted font-body text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                Triple W is a curated fashion boutique bringing you carefully
                selected pieces from around the world. We believe in quality
                over quantity — every item in our collection is chosen for its
                craftsmanship, fit, and enduring style.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-foreground font-body font-medium hover:gap-3 transition-all duration-300 group"
              >
                <span className="hover-underline">Read Our Story</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="relative"
            >
              {/* Stacked image composition */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-square mt-8 lg:mt-0">
                <div className="absolute top-0 right-0 w-[80%] sm:w-[75%] aspect-[3/4] rounded-3xl overflow-hidden shadow-soft-xl z-10 hover-lift">
                  <Image
                    src="/photo_2026-10-02_15-47-33.jpg"
                    alt="Triple W fashion"
                    fill
                    sizes="(max-width: 1024px) 80vw, 35vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[60%] sm:w-[55%] aspect-[3/4] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-background z-20 hover-lift">
                  <Image
                    src="/photo_2026-10-02_15-47-59.jpg"
                    alt="Triple W collection"
                    fill
                    sizes="(max-width: 1024px) 60vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WhatsApp CTA — Premium card style ─── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 sm:pb-32">
        <div
          data-aos="zoom-in-up"
          className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 sm:px-16 py-16 sm:py-20 text-center"
        >
          {/* Decorative blobs */}
          <div className="glow-blob w-[400px] h-[400px] bg-whatsapp/40 -top-20 -left-20 opacity-20" />
          <div className="glow-blob w-[300px] h-[300px] bg-white/20 -bottom-20 -right-20 opacity-10" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-background/50 font-body mb-4">
              Ready to Shop?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Let&apos;s Get You Styled
            </h2>
            <p className="text-background/60 font-body text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Browse our collection and message us on WhatsApp with the item
              name and size to place your order. It&apos;s that simple.
            </p>
            <a
              href={`https://wa.me/${getCleanWhatsAppNumber(settings?.whatsapp_number)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-whatsapp text-white px-10 py-4.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-whatsapp-hover hover:scale-105 hover:shadow-soft-xl active:scale-95 transition-all duration-300 btn-press"
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
          </div>
        </div>
      </section>

      {/* Floating WhatsApp FAB */}
      <WhatsAppButton
        phone={settings?.whatsapp_number || ""}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}
