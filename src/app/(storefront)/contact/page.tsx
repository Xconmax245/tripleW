import { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import { serverClient } from "@/lib/supabase";
import { getSettings } from "@/lib/settings";
import { getCleanWhatsAppNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Triple W Boutique. Order via WhatsApp, follow us on Instagram, or reach out by phone and email.",
};

export default async function ContactPage() {
  const client = await serverClient();
  const settings = await getSettings(client);
  const cleanPhone = getCleanWhatsAppNumber(settings?.whatsapp_number);

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight animate-fade-in-up">
          Get in Touch
        </h1>
        <p className="mt-4 text-muted font-body text-sm sm:text-base leading-relaxed max-w-md animate-fade-in-up stagger-1">
          We&apos;d love to hear from you. The fastest way to place an order or
          ask a question is through WhatsApp.
        </p>

        {/* How to order */}
        <div className="mt-10 sm:mt-14 animate-fade-in-up stagger-2">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-6">
            How to Order
          </h2>
          <ol className="space-y-4 font-body text-sm sm:text-base text-muted leading-relaxed">
            <li className="flex gap-4">
              <span className="text-foreground font-display text-lg shrink-0 w-8">
                01
              </span>
              <span>
                Browse our collection and find something you love.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-foreground font-display text-lg shrink-0 w-8">
                02
              </span>
              <span>
                Tap the &quot;Order via WhatsApp&quot; button on the product page — it
                opens a message with the item details pre-filled.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-foreground font-display text-lg shrink-0 w-8">
                03
              </span>
              <span>
                We&apos;ll confirm availability, discuss delivery, and finalise
                your order — all through WhatsApp.
              </span>
            </li>
          </ol>
        </div>

        {/* Contact methods */}
        <div className="mt-12 sm:mt-16 space-y-8 animate-fade-in-up stagger-3">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-6">
            Reach Us
          </h2>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 border border-border hover:border-whatsapp/50 transition-colors duration-200 group"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-whatsapp/10 text-whatsapp shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <p className="font-body font-medium text-sm group-hover:text-whatsapp transition-colors">
                WhatsApp
              </p>
              <p className="text-muted text-xs font-body mt-0.5">
                Message us directly — fastest way to order
              </p>
            </div>
          </a>

          {/* Instagram */}
          {settings?.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 border border-border hover:border-foreground/30 transition-colors duration-200 group"
            >
            <div className="w-12 h-12 flex items-center justify-center bg-surface shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div>
              <p className="font-body font-medium text-sm group-hover:opacity-70 transition-opacity">
                Instagram
              </p>
              <p className="text-muted text-xs font-body mt-0.5">
                Follow us for new drops and styling inspiration
              </p>
            </div>
          </a>
          )}

          {/* Email (if available) */}
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-4 p-5 border border-border hover:border-foreground/30 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-surface shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </div>
              <div>
                <p className="font-body font-medium text-sm group-hover:opacity-70 transition-opacity">
                  Email
                </p>
                <p className="text-muted text-xs font-body mt-0.5">
                  {settings?.email}
                </p>
              </div>
            </a>
          )}
        </div>
      </div>

      <WhatsAppButton
        phone={settings?.whatsapp_number || ""}
        productName="General Inquiry"
        variant="floating"
      />
    </>
  );
}
