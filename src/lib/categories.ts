import type { Gender } from './types';

/**
 * Triple W Boutique — category reference (directive §2.3).
 * APPLICATION CONSTANT (flagged decision — see README, Decision 1).
 *
 * The category list ships as a hardcoded constant rather than a `categories`
 * table, so adding a category is a one-line code change. Per the directive
 * this must be enforced here, at the application layer — there is no DB-level
 * constraint by design.
 */

export const CATEGORIES = {
  women: ['dresses', 'shoes', 'jeans', 'tops', 'other'],
  men: ['t-shirts', 'jeans', 'shoes', 'other'],
  unisex: ['other'],
} as const satisfies Record<Gender, readonly string[]>;

/** Flat list of every valid category value across genders (for validation). */
export const ALL_CATEGORIES = [...new Set(Object.values(CATEGORIES).flat())];

export function isGender(value: string): value is Gender {
  return value === 'women' || value === 'men' || value === 'unisex';
}

/** True if `category` is valid for `gender` (used on product create/update). */
export function isValidCategory(gender: Gender, category: string): boolean {
  return (CATEGORIES[gender] as readonly string[]).includes(category);
}
