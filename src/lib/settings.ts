import type { Settings } from './types';
import type { DbClient } from './products';
import { validateWhatsAppNumber } from './whatsapp';

/**
 * Triple W Boutique — settings queries (directive §6)
 *
 * The settings table is a single row (id = 1), seeded by migration. Reads are
 * public; updates are admin-only via RLS. There is intentionally no
 * createSettings/deleteSettings — §3.2 forbids it.
 */

/** Get settings (public: footer/contact; admin: settings form). */
export async function getSettings(client: DbClient): Promise<Settings | null> {
  const { data, error } = await client.from('settings').select('*').eq('id', 1).maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export type SettingsUpdate = Partial<Omit<Settings, 'whatsapp_number'>> & {
  whatsapp_number?: string;
};

/**
 * Update settings (admin).
 *
 * `whatsapp_number` is validated against the §2.2 format before write —
 * same rule as the DB CHECK constraint, so the app fails fast with a
 * readable message instead of a raw constraint error.
 */
export async function updateSettings(client: DbClient, patch: SettingsUpdate): Promise<Settings> {
  if (patch.whatsapp_number !== undefined) {
    const problem = validateWhatsAppNumber(patch.whatsapp_number);
    if (problem) throw new Error(problem);
  }

  const { data, error } = await client.from('settings').update(patch).eq('id', 1).select().single();
  if (error) throw error;
  return data;
}
