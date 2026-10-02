import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import { serverClient } from "@/lib/supabase";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Triple W Boutique — our story, our mission, and what drives our curation.",
};

export default async function AboutPage() {
  const client = await serverClient();
  const settings = await getSettings(client);

  return (
    <>
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Our Story
            </h1>
            <div className="mt-6 sm:mt-8 space-y-5 text-muted font-body text-sm sm:text-base leading-relaxed">
              <p>
                Triple W Boutique was born from a simple belief: everyone
                deserves access to beautifully crafted fashion without
                compromise. We curate pieces that bridge the gap between
                everyday wear and editorial style — the kind of wardrobe that
                makes getting dressed feel intentional, not routine.
              </p>
              <p>
                Every piece in our collection is hand-selected for its
                craftsmanship, fit, and staying power. We don&apos;t chase trends
                — we choose pieces that will be worn and loved for seasons to
                come.
              </p>
              <p>
                Based in Nigeria, we bring you the best of contemporary fashion
                from around the world, with the personal service of a boutique
                that knows its customers by name.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block mt-8 border border-foreground px-8 py-3 text-sm uppercase tracking-[0.15em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Explore the Collection
            </Link>
          </div>

          <div className="relative aspect-[3/4] animate-fade-in-up stagger-2">
            <Image
              src="/two-beautiful-women-posing-camera-fashionable-clothes.jpg"
              alt="Triple W Boutique — Fashion"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center">
            <div className="animate-fade-in-up stagger-1">
              <h3 className="font-display text-xl sm:text-2xl mb-3">
                Curated Selection
              </h3>
              <p className="text-muted font-body text-sm leading-relaxed max-w-xs mx-auto">
                Every piece is carefully chosen — we believe in quality over
                quantity, always.
              </p>
            </div>
            <div className="animate-fade-in-up stagger-2">
              <h3 className="font-display text-xl sm:text-2xl mb-3">
                Personal Service
              </h3>
              <p className="text-muted font-body text-sm leading-relaxed max-w-xs mx-auto">
                Order through WhatsApp with the same warmth as walking into a
                boutique.
              </p>
            </div>
            <div className="animate-fade-in-up stagger-3">
              <h3 className="font-display text-xl sm:text-2xl mb-3">
                Enduring Style
              </h3>
              <p className="text-muted font-body text-sm leading-relaxed max-w-xs mx-auto">
                We choose pieces that transcend seasons — fashion that stays
                with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton
        phone={settings?.whatsapp_number || ""}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}
