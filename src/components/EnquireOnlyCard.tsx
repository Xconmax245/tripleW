import { buildWhatsAppUrl } from "@/lib/utils";

interface EnquireOnlyCardProps {
  whatsappNumber: string;
  index?: number;
}

export default function EnquireOnlyCard({ whatsappNumber, index = 0 }: EnquireOnlyCardProps) {
  return (
    <div
      className="group block relative aspect-[3/4] bg-surface overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-soft-sm"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <div className="space-y-4">
        <span className="inline-block bg-white text-foreground px-4 py-1 rounded-full text-xs font-medium shadow-soft-sm">
          Enquiry Only
        </span>
        <p className="text-sm font-body text-foreground/80 leading-relaxed">
          Want to know more about this product? Tap the button below to enquire on WhatsApp.
        </p>
        <a
          href={buildWhatsAppUrl(whatsappNumber, "an enquire-only product")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-whatsapp text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-whatsapp-hover transition-colors"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
