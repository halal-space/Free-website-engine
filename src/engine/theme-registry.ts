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
    id: 'playful', name: 'Playful', description: 'Warm, expressive, and full of wonder.', detail: 'Soft shapes · bright moments',
    preview: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80',
    defaults: { primary: '#D86152', secondary: '#F6EACB', accent: '#F2B758', hover: '#A94138', background: '#FAF6EC', surface: '#FFFFFF', text: '#303126', muted: '#686B5F', border: '#DCD9C9', displayFont: 'rounded', bodyFont: 'sans', headingScale: 'standard', headingWeight: 'bold', bodyLineHeight: 'relaxed', letterSpacing: 'normal', density: 'comfortable', containerWidth: 'standard', gridGap: 'standard', radius: 'soft', buttonShape: 'rounded', borderWidth: 'thin', shadow: 'soft', motion: 'subtle' },
  },
  {
    id: 'precision', name: 'Precision', description: 'Sharp product focus with a modern edge.', detail: 'Bold type · clean geometry',
    preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&q=80',
    defaults: { primary: '#2949EC', secondary: '#111822', accent: '#C7FF6B', hover: '#1939C7', background: '#F5F6F8', surface: '#FFFFFF', text: '#15181E', muted: '#656D7B', border: '#D9DDE5', displayFont: 'sans', bodyFont: 'sans', headingScale: 'large', headingWeight: 'heavy', bodyLineHeight: 'standard', letterSpacing: 'tight', density: 'compact', containerWidth: 'wide', gridGap: 'compact', radius: 'sharp', buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle' },
  },
  {
    id: 'editorial', name: 'Editorial', description: 'Image-led storytelling with quiet confidence.', detail: 'Immersive imagery · refined space',
    preview: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80',
    defaults: { primary: '#49382D', secondary: '#E9E1D6', accent: '#BC9C78', hover: '#2D211B', background: '#F6F3ED', surface: '#FFFFFF', text: '#211E1B', muted: '#766D65', border: '#D9D1C8', displayFont: 'serif', bodyFont: 'sans', headingScale: 'large', headingWeight: 'regular', bodyLineHeight: 'relaxed', letterSpacing: 'normal', density: 'comfortable', containerWidth: 'wide', gridGap: 'compact', radius: 'sharp', buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle' },
  },
];

export const THEME_DEFAULTS = Object.fromEntries(THEMES.map(theme => [theme.id, theme.defaults])) as Record<ThemeId, DesignTokens>;
export const THEME_IDS: ReadonlySet<string> = new Set(THEMES.map(theme => theme.id));
