import type { DbClient } from './products';

/**
 * Triple W Boutique — Supabase Storage (directive §4)
 *
 * SCOPE CHANGE (flagged to frontend): Supabase Storage replaces Firebase
 * Storage. The contract the frontend cares about is unchanged — the returned
 * `url` is a PUBLIC URL to push into `products.images`, ordered, index 0 =
 * cover. Only the SDK and env vars changed.
 *
 * Path shape is preserved from the directive:
 *   bucket "products" → {productId}/{filename}      (i.e. /products/{id}/{file})
 *   bucket "branding" → logo
 *
 * Access control is in migration 0004: public read, admin-only writes,
 * 5 MB + image mime caps enforced on the bucket itself (not just here), so a
 * bypass of this module still cannot upload a 40 MB PDF.
 */

export const PRODUCT_IMAGE_BUCKET = 'products';
export const BRANDING_BUCKET = 'branding';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // must match 0005
export const IMAGE_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;

export type UploadResult = {
  /** Public URL — push into `products.images` (position 0 = cover). */
  url: string;
  /** Storage path written, e.g. `{productId}/front.jpg` in the products bucket. */
  path: string;
  bucket: string;
};

function assertUploadable(file: File): void {
  if (!IMAGE_CONTENT_TYPES.includes(file.type as (typeof IMAGE_CONTENT_TYPES)[number])) {
    throw new Error(`Unsupported image type: ${file.type || 'unknown'}. Use JPEG, PNG, WebP or AVIF.`);
  }
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be between 1 byte and 5 MB.');
  }
}

/** Keep object names safe and unique without a UUID dependency. */
function safeFileName(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const stamped = `${Date.now()}-${cleaned || 'image'}`;
  return stamped.length > 120 ? `${Date.now()}.jpg` : stamped;
}

async function upload(
  client: DbClient,
  bucket: string,
  path: string,
  file: File,
  upsert: boolean,
): Promise<UploadResult> {
  assertUploadable(file);

  const { error } = await client.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000', // storefront images are content-addressed by name
    upsert,
  });
  if (error) throw error;

  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl, path, bucket };
}

/** Upload a product image. Admin only (RLS rejects anyone else). */
export function uploadProductImage(
  client: DbClient,
  file: File,
  productId: string,
  fileName?: string,
): Promise<UploadResult> {
  return upload(client, PRODUCT_IMAGE_BUCKET, `${productId}/${safeFileName(fileName ?? file.name)}`, file, false);
}

/** Upload the boutique logo, replacing any previous one. */
export function uploadLogo(client: DbClient, file: File): Promise<UploadResult> {
  return upload(client, BRANDING_BUCKET, 'logo', file, true);
}

/** Delete a stored product image (e.g. when removing it from a product). */
export async function deleteProductImage(
  client: DbClient,
  path: string,
  bucket: string = PRODUCT_IMAGE_BUCKET,
): Promise<void> {
  const { error } = await client.storage.from(bucket).remove([path]);
  if (error) throw error;
}

/** Public URL for an already-uploaded object (no client needed). */
export function publicUrl(path: string, bucket: string = PRODUCT_IMAGE_BUCKET): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error('Missing required env var: NEXT_PUBLIC_SUPABASE_URL.');
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
