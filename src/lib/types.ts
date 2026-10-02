/* ─── Product ─── */
export type Gender = "women" | "men" | "unisex";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  gender: Gender;
  category: string;
  sizes: string[] | null;
  images: string[];
  available: boolean;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

/* ─── Settings (single-row) ─── */
export interface SiteSettings {
  id?: string;
  boutique_name: string;
  whatsapp_number: string;
  instagram_url: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  logo_url: string | null;
}

/* ─── Categories ─── */
export const CATEGORIES: Record<Gender | "all", string[]> = {
  women: ["Dresses", "Shoes", "Jeans", "Tops", "Other"],
  men: ["T-Shirts", "Jeans", "Shoes", "Other"],
  unisex: ["T-Shirts", "Jeans", "Shoes", "Other"],
  all: ["Dresses", "Shoes", "Jeans", "Tops", "T-Shirts", "Other"],
};

/* ─── WhatsApp helper ─── */
export function buildWhatsAppUrl(
  phone: string,
  productName: string,
  size?: string,
  price?: number
): string {
  const parts = [`Hi, I'd like to order the ${productName}`];
  if (size) parts[0] += ` in Size ${size}`;
  if (price != null) parts[0] += `. Price: ₦${price.toLocaleString()}`;
  parts[0] += ".";
  const encoded = encodeURIComponent(parts[0]);
  // Strip everything except digits from phone
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

/* ─── Price formatter ─── */
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
