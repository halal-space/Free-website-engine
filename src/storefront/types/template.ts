/**
 * Template metadata type — describes each registered template's identity and capabilities.
 *
 * Used by the template catalog (config/templates.ts) to provide a browsable
 * list of available templates for merchant onboarding UI and by the storefront
 * assembler to determine which fonts to preload and which component namespace
 * to expect in the registry.
 */

import type { TemplateId } from './store';

export interface TemplateMetadata {
  /** The unique template identifier — matches a TemplateId union member. */
  id: TemplateId;

  /** Human-readable display name, e.g. "Aurelia Tech Store". */
  name: string;

  /** Brief description for template selection UI. */
  description: string;

  /** Template vertical — determines which shared component variants are available. */
  category: 'gadget' | 'fashion' | 'dining';

  /** Preview image path for the template gallery. */
  thumbnail: string;

  /** Font families to preload via next/font when this template is active. */
  defaultFonts: string[];

  /** Whether this template ships dark-mode color overrides. */
  supportsDarkMode: boolean;

  /** Registry prefix for this template's components, e.g. "gadget", "fashion". */
  componentNamespace: string;
}
