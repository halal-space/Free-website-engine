import type { DesignTokens, ThemeId } from './types';

export interface ThemeManifest {
  id: ThemeId;
  name: string;
  description: string;
  detail: string;
  preview: string;
  defaults: DesignTokens;
}

export const THEMES: readonly ThemeManifest[] = [
  {
    id: 'playful', name: 'Mothercare', description: 'A gentle, considered world for little ones.', detail: 'WARMTH · SOFT FORMS',
    preview: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80',
    defaults: { primary: '#875347', secondary: '#EDE2D5', accent: '#B88661', hover: '#6E4038', background: '#F9F6F0', surface: '#FFFEFB', text: '#282B26', muted: '#64685F', border: '#D8D2C7', displayFont: 'serif', bodyFont: 'sans', headingScale: 'standard', headingWeight: 'regular', bodyLineHeight: 'relaxed', letterSpacing: 'normal', density: 'comfortable', containerWidth: 'standard', gridGap: 'standard', radius: 'soft', buttonShape: 'rounded', borderWidth: 'thin', shadow: 'soft', motion: 'subtle' },
  },
  {
    id: 'precision', name: 'Tech & gadgets', description: 'Precise, confident presentation for modern devices.', detail: 'CLARITY · PERFORMANCE',
    preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&q=80',
    defaults: { primary: '#254BC7', secondary: '#101820', accent: '#D3ED98', hover: '#193A9C', background: '#F3F5F3', surface: '#FFFFFF', text: '#18211D', muted: '#5C6761', border: '#CED5D0', displayFont: 'sans', bodyFont: 'sans', headingScale: 'large', headingWeight: 'heavy', bodyLineHeight: 'standard', letterSpacing: 'tight', density: 'compact', containerWidth: 'wide', gridGap: 'compact', radius: 'sharp', buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle' },
  },
  {
    id: 'editorial', name: 'Clothing', description: 'Fashion-led storytelling with room to breathe.', detail: 'EDITORIAL · REFINED SPACE',
    preview: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80',
    defaults: { primary: '#463A32', secondary: '#E8E0D5', accent: '#AD8F6D', hover: '#2E2621', background: '#F7F4EE', surface: '#FFFFFF', text: '#26221E', muted: '#6F675E', border: '#D9D0C5', displayFont: 'serif', bodyFont: 'sans', headingScale: 'large', headingWeight: 'regular', bodyLineHeight: 'relaxed', letterSpacing: 'normal', density: 'comfortable', containerWidth: 'wide', gridGap: 'compact', radius: 'sharp', buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle' },
  },
];

export const THEME_DEFAULTS = Object.fromEntries(THEMES.map(theme => [theme.id, theme.defaults])) as Record<ThemeId, DesignTokens>;
export const THEME_IDS: ReadonlySet<string> = new Set(THEMES.map(theme => theme.id));
