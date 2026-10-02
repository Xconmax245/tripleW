import { Product, SiteSettings } from "./types";

/**
 * Mock data for frontend development.
 * Will be replaced with Supabase queries once the backend is wired.
 * Uses images from the /public folder.
 */

export const mockSettings: SiteSettings = {
  boutique_name: "Triple W",
  whatsapp_number: "+2348000000000", // placeholder — replace with real number
  instagram_url: "https://instagram.com/triplewboutique",
  phone: null,
  email: null,
  address: null,
  logo_url: null,
};

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "oversized-tweed-coat",
    name: "Oversized Tweed Coat",
    description:
      "A beautifully tailored oversized tweed coat in a sophisticated grey. Perfect for layering through the cooler months, this piece brings an effortless editorial edge to any outfit.",
    price: 85000,
    gender: "women",
    category: "Tops",
    sizes: ["S", "M", "L"],
    images: ["/chyntia-juls-HlVjI5WmoQY-unsplash.jpg"],
    available: true,
    is_featured: true,
    is_new: true,
    created_at: "2026-09-28T10:00:00Z",
    updated_at: "2026-09-28T10:00:00Z",
  },
  {
    id: "2",
    slug: "diamond-knit-cardigan-cream",
    name: "Diamond Knit Cardigan — Cream",
    description:
      "A cosy diamond-pattern knit cardigan in cream with contrasting brown trim. Pair with leggings or denim for an elevated casual look.",
    price: 42000,
    gender: "women",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    images: ["/two-beautiful-women-posing-camera-fashionable-clothes.jpg"],
    available: true,
    is_featured: false,
    is_new: true,
    created_at: "2026-09-27T10:00:00Z",
    updated_at: "2026-09-27T10:00:00Z",
  },
  {
    id: "3",
    slug: "diamond-knit-cardigan-navy",
    name: "Diamond Knit Cardigan — Navy",
    description:
      "The same luxurious diamond-pattern knit in a striking navy and cream colourway. A versatile wardrobe staple that pairs back to everything.",
    price: 42000,
    gender: "women",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    images: ["/two-beautiful-women-posing-camera-fashionable-clothes.jpg"],
    available: true,
    is_featured: false,
    is_new: true,
    created_at: "2026-09-27T10:00:00Z",
    updated_at: "2026-09-27T10:00:00Z",
  },
  {
    id: "4",
    slug: "pleated-maxi-dress-rust",
    name: "Pleated Maxi Dress — Rust",
    description:
      "A show-stopping pleated maxi dress in a rich rust print. Features a cinched waist with tie detail and dramatic flowing skirt. Perfect for events and special occasions.",
    price: 68000,
    gender: "women",
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    images: ["/young-woman-beautiful-red-dress.jpg"],
    available: true,
    is_featured: true,
    is_new: true,
    created_at: "2026-09-26T10:00:00Z",
    updated_at: "2026-09-26T10:00:00Z",
  },
  {
    id: "5",
    slug: "editorial-tweed-set",
    name: "Editorial Tweed Set",
    description:
      "A modern two-piece tweed set — crop top and wide-leg trousers in a refined grey. An editorial statement that transitions from day to evening effortlessly.",
    price: 95000,
    gender: "women",
    category: "Tops",
    sizes: ["S", "M"],
    images: ["/chyntia-juls-HlVjI5WmoQY-unsplash.jpg"],
    available: false,
    is_featured: false,
    is_new: false,
    created_at: "2026-09-20T10:00:00Z",
    updated_at: "2026-09-25T10:00:00Z",
  },
  {
    id: "6",
    slug: "boho-print-midi-dress",
    name: "Boho Print Midi Dress",
    description:
      "A free-spirited midi dress with all-over botanical print, V-neckline, and flowy pleated skirt. Dress it up with heels or keep it casual with sandals.",
    price: 55000,
    gender: "women",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    images: ["/young-woman-beautiful-red-dress.jpg"],
    available: true,
    is_featured: false,
    is_new: true,
    created_at: "2026-09-25T10:00:00Z",
    updated_at: "2026-09-25T10:00:00Z",
  },
];

/* ─── Data access helpers (will become Supabase queries) ─── */

export function getSettings(): SiteSettings {
  return mockSettings;
}

export function getAllProducts(): Product[] {
  return mockProducts;
}

export function getNewArrivals(limit = 8): Product[] {
  return mockProducts
    .filter((p) => p.is_new)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit);
}

export function getProductsByGender(gender: string): Product[] {
  if (gender === "all") return mockProducts;
  return mockProducts.filter((p) => p.gender === gender || p.gender === "unisex");
}

export function getProductsByCategory(
  category: string,
  gender?: string
): Product[] {
  return mockProducts.filter((p) => {
    const matchCategory =
      p.category.toLowerCase() === category.toLowerCase();
    const matchGender = gender
      ? p.gender === gender || p.gender === "unisex"
      : true;
    return matchCategory && matchGender;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  currentId: string,
  category: string,
  limit = 4
): Product[] {
  return mockProducts
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}
