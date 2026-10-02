/**
 * Triple W Boutique — shared types (directive §5 data contract, verbatim)
 *
 * ⚠️ BINDING: the frontend is built against these shapes. Any deviation is a
 * breaking change to be flagged BEFORE the frontend is wired to real data.
 */

export type Gender = 'women' | 'men' | 'unisex';

/**
 * Display mode for a listing.
 *
 * - `full` (default): show name, description, price, sizes, images.
 * - `enquire_only`: show NOTHING but a "want to know more? click the button
 *   below" tag plus a WhatsApp button. Details are withheld deliberately —
 *   the row still holds all its data, so toggling back to `full` restores it.
 *
 * The backend stores this as the boolean column `enquire_only`
 * (`enquire_only: boolean`); this mapping is a frontend presentation concern.
 */
export type ProductDisplay = 'full' | 'enquire_only';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  gender: Gender;
  category: string;
  sizes: string[] | null;
  images: string[]; // ordered, first = cover
  available: boolean;
  is_featured: boolean;
  is_new: boolean;
  /** Show only a WhatsApp enquiry CTA instead of product details (migration 0008). */
  enquire_only: boolean;
  created_at: string;
  updated_at: string;
};

export type Settings = {
  boutique_name: string | null;
  whatsapp_number: string;
  instagram_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  logo_url: string | null;
};
