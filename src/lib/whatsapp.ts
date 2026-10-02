/**
 * Triple W Boutique — WhatsApp number validation (directive §2.2)
 *
 * The frontend interpolates this value directly into a `wa.me` URL, so the
 * stored format must be full international, digits only: no '+', no spaces,
 * no dashes (e.g. 2348012345678).
 *
 * Mirrors the `whatsapp_number_format` CHECK constraint in migration 0001 so
 * app-level errors are readable before the DB ever rejects a write.
 */

export function validateWhatsAppNumber(raw: string): string | null {
  const v = raw.trim();
  if (!/^[1-9][0-9]{7,14}$/.test(v)) {
    return 'WhatsApp number must be 8-15 digits, digits only, no "+" and no spaces (e.g. 2348012345678).';
  }
  return null;
}
