/**
 * Template catalog — metadata for all registered templates.
 *
 * Used by merchant onboarding UI to display available templates, and by
 * the storefront assembler to determine font preloading and component
 * namespace expectations. This is static configuration data — no API calls.
 */

import type { TemplateMetadata } from '../types/template';
import type { TemplateId } from '../types/store';

/**
 * Lookup map of all available templates.
 * Add new entries here when creating new template types.
 */
export const TEMPLATE_CATALOG: Record<TemplateId, TemplateMetadata> = {
  gadget_aurelia: {
    id: 'gadget_aurelia',
    name: 'Aurelia Tech Store',
    description:
      'Premium gadget storefront with 3D product visualization, technical spec sheets, and a dark-mode-first design language.',
    category: 'gadget',
    thumbnail: '/templates/aurelia-preview.png',
    defaultFonts: ['Inter Variable', 'Manrope Variable'],
    supportsDarkMode: true,
    componentNamespace: 'gadget',
  },
  gadget_aether: {
    id: 'gadget_aether',
    name: 'Aether Tech Store',
    description:
      'Minimalist gadget storefront with clean typography, generous whitespace, and GSAP-powered scroll animations.',
    category: 'gadget',
    thumbnail: '/templates/aether-preview.png',
    defaultFonts: ['Inter Variable', 'Manrope Variable'],
    supportsDarkMode: true,
    componentNamespace: 'gadget',
  },
  fashion_atelier: {
    id: 'fashion_atelier',
    name: 'Atelier Vélène',
    description:
      'Luxury fashion storefront with editorial layouts, lookbook-style imagery, and limited-edition collection support.',
    category: 'fashion',
    thumbnail: '/templates/atelier-preview.png',
    defaultFonts: ['Inter Variable', 'Bodoni Moda'],
    supportsDarkMode: false,
    componentNamespace: 'fashion',
  },
  dining_ember_oak: {
    id: 'dining_ember_oak',
    name: 'Ember & Oak',
    description:
      'Warm, inviting restaurant storefront with menu sections, reservation integration hooks, and dietary filter support.',
    category: 'dining',
    thumbnail: '/templates/ember-oak-preview.png',
    defaultFonts: ['Inter Variable', 'Cormorant Garamond'],
    supportsDarkMode: false,
    componentNamespace: 'dining',
  },
};

/**
 * What it does: Retrieves static metadata for a given TemplateId.
 * Why it exists: Used by onboarding UI and storefront assembler to inspect template capabilities and font requirements.
 * How it works: Performs a direct lookup in TEMPLATE_CATALOG map.
 * Limitations & Risks: Returns undefined if templateId is unrecognized.
 *
 * @param templateId - Template identifier union value
 * @returns TemplateMetadata object or undefined
 */
export function getTemplateMetadata(
  templateId: TemplateId
): TemplateMetadata | undefined {
  return TEMPLATE_CATALOG[templateId];
}

/**
 * What it does: Returns a list of all supported storefront templates.
 * Why it exists: Powers the merchant template gallery and onboarding selection UI.
 * How it works: Returns Object.values(TEMPLATE_CATALOG).
 * Limitations & Risks: Risk: N/A.
 *
 * @returns Array of TemplateMetadata records
 */
export function getAllTemplates(): TemplateMetadata[] {
  return Object.values(TEMPLATE_CATALOG);
}
