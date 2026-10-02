# Backend Handoff — Triple W Boutique (from Freebuff)

**Read this before building `/admin/*`.** The Supabase backend is **live and verified**, not pending. Do not build against mocks and do not write mock `createProduct` / `updateProduct` / `deleteProduct` — the real ones exist and are ready to import.

## Status: the backend is done

Applied to project `qiynxpxvrokerxpporhv` and verified live (35 automated checks):

- **Schema** — `products`, `settings` (single row), indexes, `updated_at` trigger, slug trigger
- **RLS** — anonymous can SELECT; anonymous INSERT/UPDATE/DELETE **blocked** on both tables (12/12 checks pass)
- **Storage** — `products` + `branding` buckets, public read, admin-only write, 5 MB + jpeg/png/webp/avif caps enforced on the bucket (6/6 pass)
- **Admin** — `codr@example.com` exists, is allowlisted, `is_admin()` → true. A second signed-in account was tested and confirmed **blocked** (42501). There is no signup flow anywhere.
- **Admin E2E** — create → slug generated → read by slug → toggle `available`/`is_featured` → upload image → public URL → write into `images[]` → delete → gone. All pass.

## Do this first (2 commands)

```bash
npm install @supabase/ssr @supabase/supabase-js
cp ../lib/types.ts ../lib/categories.ts ../lib/whatsapp.ts \
   ../lib/supabase.ts ../lib/products.ts ../lib/settings.ts ../lib/storage.ts src/lib/
cp ../lib/middleware.ts middleware.ts
```

`triple-w/.env.local` is already written with the right values. Nothing else to configure.

## Rules that matter

1. **`src/lib/data.ts` mocks must go** when you wire real queries. §9 forbids placeholder data in anything reachable in production. Keep the file only if it's clearly dead code, otherwise delete it.
2. **`description` is `string | null`** in the DB. The contract type in the copied `types.ts` is correct — use it, don't narrow it to `string`.
3. **`category` is stored lowercase** (`dresses`, `t-shirts`, `jeans`, `tops`, `other`). Title-case for display if you like, but filter on lowercase.
4. **Never send `slug`** when creating a product. A DB trigger generates it. Read it from the returned row.
5. **`images[0]` is always the cover** shown on cards. When reordering images in the admin, keep the cover first in the array.
6. **`whatsapp_number` is digits only** (`2348012345678`) — no `+`, no spaces. The DB rejects other formats. Note `triple-w/src/lib/types.ts`'s old mock had a `+`; the copied `types.ts` and DB constraint both reject it.
7. **Admin writes require the signed-in session.** Use `serverClient()` from `src/lib/supabase.ts` in server actions. The anon key cannot write — that is RLS working correctly, not a bug.
8. **Images upload to Supabase Storage, not Firebase.** Any `NEXT_PUBLIC_FIREBASE_*` reference is stale and must be deleted. Use `uploadProductImage()` from `src/lib/storage.ts`.

## API you'll be coding against

```ts
import { serverClient } from '@/lib/supabase';
import { createProduct, updateProduct, deleteProduct, getProductBySlug,
         getAllProductsAdmin, getProducts, getNewProducts } from '@/lib/products';
import { getSettings, updateSettings } from '@/lib/settings';
import { uploadProductImage, uploadLogo, deleteProductImage } from '@/lib/storage';
import { CATEGORIES, isValidCategory } from '@/lib/categories';
```

```ts
// create: do NOT pass slug — DB generates it
const product = await createProduct(await serverClient(), {
  name: 'Pleated Maxi Dress',
  price: 68000, gender: 'women', category: 'dresses',
  sizes: ['S','M','L'], images: [coverUrl],
});

// upload returns a public URL to push into images[]
const { url } = await uploadProductImage(await serverClient(), file, productId);
```

## New feature: enquiry-only listings (migration 0008)

A product can be listed with **no details at all** — the owner decides per product from the admin dashboard. The storefront then shows ONLY a tag plus a WhatsApp button.

The flag is `enquire_only: boolean` on `products` (default `false`, so nothing existing changes).

**Admin side** — checkbox on the product form + a row toggle in the list:
```ts
import { setEnquireOnly } from '@/lib/products';
await setEnquireOnly(await serverClient(), productId, true);   // hide details
await setEnquireOnly(await serverClient(), productId, false);  // reveal again
```

**Storefront side** — branch before rendering any detail:

```tsx
{product.enquire_only ? (
  <EnquireOnlyCard onEnquire={() => { /* → wa.me link */ }} />
) : (
  <NormalProductCard product={product} />
)}
```

`EnquireOnlyCard` must render **no** name, price, description, sizes, or images — just the tag and the button:

> Want to know more about this product? Tap the button below to enquire on WhatsApp.

```tsx
<a href={buildWhatsAppUrl(whatsappNumber)} target="_blank" rel="noopener noreferrer">
  Enquire on WhatsApp
</a>
```

Notes:
- **Details are not deleted** — the row keeps everything, so toggling back on restores the full listing instantly. Verified live.
- It coexists with `is_featured`, `is_new` and `available` — an enquiry-only product can still be featured or sold out.
- Prefer `import { displayMode } from '@/lib/products'` if you want the boolean mapped to `'full' | 'enquire_only'` in one place.
- `enquire_only` is on `Product` in `src/lib/types.ts` — re-copy that file if you already imported the old one.

## Gotcha

`getSettings()` currently returns **`null`** — the settings row is intentionally empty until the real WhatsApp number and business details are provided (placeholder contact data is banned by the directive). Code defensively: the footer/WhatsApp button must not crash. Everything else works today.

## Route structure that fits the auth setup

`middleware.ts` (copied) already redirects unauthenticated `/admin/*` to `/admin/login` and refreshes the session on every request. Build against that: `/admin/login`, `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`, `/admin/settings`.