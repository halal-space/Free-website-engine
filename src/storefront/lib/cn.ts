/**
 * Conditional class name utility — combines clsx (conditional class composition)
 * with tailwind-merge (Tailwind class deduplication).
 *
 * Used by every UI component across all templates to safely compose class strings.
 * Exists here (not in a component library) because it's also used by the
 * registry's placeholder/error components and service layer error formatting.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * What it does: Combines conditional class names and deduplicates conflicting Tailwind utility classes.
 * Why it exists: Shared utility across all storefront sections and components to prevent CSS specificity bugs.
 * How it works: Passes inputs through clsx() to handle falsy/array values, then through twMerge() to resolve collisions.
 * Limitations & Risks: Risk: N/A.
 *
 * @param inputs - Class values, objects, or arrays
 * @returns Deduplicated class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
