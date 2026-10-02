import type { Product, ProductDisplay } from './types';
import type { SupabaseClient } from '@supabase/supabase-js';

/** Any Supabase client flavor works here (browser, SSR, or service role). */
export type DbClient = SupabaseClient;

/**
 * Triple W Boutique — product queries + admin mutations (directive §6)
 *
 * Thin wrappers over the Supabase JS client so the frontend has one place to
 * call. Pass a client explicitly:
 *   - public pages:    `browserClient()` or `await serverClient()`
 *   - admin mutations: `await serverClient()` inside server actions
 * RLS does the access control; these wrappers only encode query shape.
 */

export type ProductFilters = {
  gender?: string;
  category?: string;
};

/** Get all products (public shop page), optionally filtered by gender/category. */
export async function getProducts(client: DbClient, filters: ProductFilters = {}): Promise<Product[]> {
  let query = client
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.gender) {
    // Matches the frontend's established behavior (triple-w/src/lib/data.ts
    // getProductsByGender): women/men listings also include unisex products.
    query = query.in('gender', [filters.gender, 'unisex']);
  }
  if (filters.category) {
    // DB stores categories lowercase (directive §2.3); the frontend passes
    // URL/display values, so normalize before the exact-match filter.
    query = query.eq('category', filters.category.toLowerCase());
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/** Get a single product by slug (product detail page). Returns null if absent. */
export async function getProductBySlug(client: DbClient, slug: string): Promise<Product | null> {
  const { data, error } = await client.from('products').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

/** Products where is_new = true, newest first, limited — homepage section. */
export async function getNewProducts(client: DbClient, limit = 8): Promise<Product[]> {
  const { data, error } = await client
    .from('products')
    .select('*')
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

/** Admin list view: unfiltered, includes sold-out items. */
export async function getAllProductsAdmin(client: DbClient): Promise<Product[]> {
  const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/**
 * Create product (admin).
 *
 * `slug` is generated SERVER-SIDE by a database trigger (migration
 * 0007_slug_generation.sql): lowercased, hyphenated, special characters
 * stripped, with a short random suffix appended on name collision so
 * creation never fails. Do NOT pass a slug from the client — omit the field
 * and read it back from the returned row.
 *
 * NOTE (§2.3): category validity is enforced HERE, not in the DB — see
 * lib/categories.ts and README Decision 1.
 */
export async function createProduct(client: DbClient, input: {
  name: string;
  description?: string | null;
  price: number;
  gender: string;
  category: string;
  sizes?: string[] | null;
  images?: string[];
  available?: boolean;
  is_featured?: boolean;
  is_new?: boolean;
  enquire_only?: boolean;
}): Promise<Product> {const { data, error } = await client
    .from('products')
    .insert({
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      gender: input.gender,
      category: input.category,
      sizes: input.sizes ?? null,
      images: input.images ?? [],
      available: input.available ?? true,
      is_featured: input.is_featured ?? false,
      is_new: input.is_new ?? false,
      enquire_only: input.enquire_only ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export type ProductUpdate = {
  name?: string;
  description?: string | null;
  price?: number;
  gender?: string;
  category?: string;
  sizes?: string[] | null;
  images?: string[];
  available?: boolean;
  is_featured?: boolean;
  is_new?: boolean;
  /** Toggle the detail-free "enquire via WhatsApp" listing (migration 0008). */
  enquire_only?: boolean;
};

/**
 * Update product (admin) — covers full-form resubmits AND the lightweight
 * toggle actions (`available` / `is_featured` / `is_new`) the admin UI sends
 * as single-field updates. `updated_at` is maintained by the DB trigger.
 */
export async function updateProduct(client: DbClient, id: string, patch: ProductUpdate): Promise<Product> {
  const { data, error } = await client.from('products').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

/** Delete product (admin). Storage cleanup of /products/{id}/* is a manual step. */
export async function deleteProduct(client: DbClient, id: string): Promise<void> {
  const { error } = await client.from('products').delete().eq('id', id);
  if (error) throw error;
}

// ── Enquire-only listings (migration 0008) ────────────────────────────────
// A product can be listed with NO details at all: the storefront shows only a
// "want to know more? click the button below" tag plus a WhatsApp button.
// The data is never deleted — this is purely a display switch, so the owner
// can reveal (or re-hide) a product at any time from the admin dashboard.

/** Toggle a product into/out of detail-free mode. Lightweight update, like the other flags. */
export async function setEnquireOnly(
  client: DbClient,
  id: string,
  enquireOnly: boolean,
): Promise<Product> {
  const { data, error } = await client
    .from('products')
    .update({ enquire_only: enquireOnly })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Frontend helper: should this listing render details, or only the WhatsApp
 * CTA? (keeps the `enquire_only` → `enquire_only` / `full` mapping in one place)
 */
export function displayMode(product: Pick<Product, 'enquire_only'>): ProductDisplay {
  return product.enquire_only ? 'enquire_only' : 'full';
}
