import type { DesignTokens, ThemeId } from './types';

export type ThemeFamily = 'care' | 'tech' | 'fashion';

export interface ThemeManifest {
  id: ThemeId;
  family: ThemeFamily;
  name: string;
  description: string;
  detail: string;
  preview: string;
  defaults: DesignTokens;
}

const careBase: DesignTokens = {
  primary: '#4E644D', secondary: '#F0E9DE', accent: '#587058', hover: '#354B38',
  background: '#F7F5EF', surface: '#FFFFFF', text: '#19231D', muted: '#59635C', border: '#D4D8CE',
  displayFont: 'serif', bodyFont: 'sans', headingScale: 'large', headingWeight: 'regular', bodyLineHeight: 'relaxed',
  letterSpacing: 'tight', density: 'comfortable', containerWidth: 'wide', gridGap: 'standard', radius: 'soft',
  buttonShape: 'rounded', borderWidth: 'thin', shadow: 'none', motion: 'subtle',
};

const techBase: DesignTokens = {
  primary: '#214D88', secondary: '#E6E9EB', accent: '#E85B2A', hover: '#16365F',
  background: '#F7F8F6', surface: '#FFFFFF', text: '#171E24', muted: '#58626A', border: '#D8DDE0',
  displayFont: 'sans', bodyFont: 'sans', headingScale: 'large', headingWeight: 'heavy', bodyLineHeight: 'standard',
  letterSpacing: 'tight', density: 'compact', containerWidth: 'wide', gridGap: 'compact', radius: 'sharp',
  buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle',
};

const fashionBase: DesignTokens = {
  primary: '#263B31', secondary: '#EAE7DF', accent: '#375B46', hover: '#172A20',
  background: '#F7F5F0', surface: '#FFFFFF', text: '#25231F', muted: '#66615A', border: '#DCD8D0',
  displayFont: 'serif', bodyFont: 'sans', headingScale: 'large', headingWeight: 'regular', bodyLineHeight: 'relaxed',
  letterSpacing: 'tight', density: 'comfortable', containerWidth: 'wide', gridGap: 'standard', radius: 'sharp',
  buttonShape: 'square', borderWidth: 'thin', shadow: 'none', motion: 'subtle',
};

// The family is a design recommendation. Every manifest accepts the same merchant contract.
export const THEMES: readonly ThemeManifest[] = [
  { id: 'm1', family: 'care', name: 'The Caring Journal', description: 'Warm editorial shopping guided by life stage.', detail: 'MOTHERCARE · EDITORIAL', preview: '/prototypes/mothercare-1-editorial-desktop.png', defaults: careBase },
  { id: 'm2', family: 'care', name: 'The Playroom Map', description: 'Joyful, expressive discovery for every category.', detail: 'MOTHERCARE · PLAYFUL', preview: '/prototypes/mothercare-2-playful-desktop.png', defaults: { ...careBase, primary: '#1747B7', secondary: '#DCEFE8', accent: '#F0C634', hover: '#123989', background: '#FFFCF2', text: '#17284A', muted: '#4F5C6C', border: '#D6E1E2', displayFont: 'rounded', headingWeight: 'heavy', buttonShape: 'pill', motion: 'full' } },
  { id: 'm3', family: 'care', name: "The Parent's Checklist", description: 'Calm, clear shopping by need and stage.', detail: 'MOTHERCARE · GUIDED', preview: '/prototypes/mothercare-3-utility-desktop.png', defaults: { ...careBase, primary: '#183A50', secondary: '#E7F1F5', accent: '#26556B', hover: '#102B40', background: '#F7FBFC', text: '#142B3B', muted: '#556C79', border: '#D4E2E8', displayFont: 'sans', headingWeight: 'bold', density: 'compact', radius: 'sharp' } },
  { id: 'g1', family: 'tech', name: 'Cinematic Object', description: 'Immersive, product-led technology.', detail: 'GADGETS · CINEMATIC', preview: '/prototypes/gadgets-1-cinematic-desktop.png', defaults: { ...techBase, primary: '#3689F3', secondary: '#111B25', accent: '#4F9AFF', hover: '#2674D4', background: '#080D12', surface: '#111922', text: '#F6FAFF', muted: '#B6C5D1', border: '#31404D', shadow: 'soft' } },
  { id: 'g2', family: 'tech', name: 'The Product Lab', description: 'Compare and explore products with clarity.', detail: 'GADGETS · PRODUCT LAB', preview: '/prototypes/gadgets-2-lab-desktop.png', defaults: techBase },
  { id: 'g3', family: 'tech', name: 'Electric Culture', description: 'Bold discovery for creators and explorers.', detail: 'GADGETS · ELECTRIC', preview: '/prototypes/gadgets-3-electric-desktop.png', defaults: { ...techBase, primary: '#164DC9', secondary: '#D9E4FF', accent: '#D5F04B', hover: '#123D9E', background: '#FAFAF4', text: '#111D46', muted: '#4E5A75', border: '#D8DFF1', displayFont: 'rounded', motion: 'full' } },
  { id: 'c1', family: 'fashion', name: 'The Atelier', description: 'Quiet luxury with considered imagery.', detail: 'CLOTHING · ATELIER', preview: '/prototypes/clothing-1-atelier-desktop.png', defaults: { ...fashionBase, primary: '#2C2A26', accent: '#554B40', hover: '#1B1916', text: '#28231F', muted: '#69615A' } },
  { id: 'c2', family: 'fashion', name: 'Fashion Issue', description: 'A bold, magazine-like way to shop.', detail: 'CLOTHING · ISSUE', preview: '/prototypes/clothing-2-fashion-issue-desktop.png', defaults: { ...fashionBase, primary: '#C92420', secondary: '#F4EAE2', accent: '#D12B25', hover: '#9E1C18', background: '#FCFBF8', text: '#221E1B', muted: '#645D57', displayFont: 'sans', headingWeight: 'heavy', motion: 'full' } },
  { id: 'c3', family: 'fashion', name: 'The Wardrobe Studio', description: 'Complete looks for occasions and everyday life.', detail: 'CLOTHING · WARDROBE', preview: '/prototypes/clothing-3-wardrobe-desktop.png', defaults: { ...fashionBase, primary: '#1D4B35', secondary: '#E8EEE7', accent: '#285A3E', hover: '#143927', background: '#F5F7F1', text: '#173B2A', muted: '#566A5C', border: '#D5E0D3', radius: 'soft', buttonShape: 'pill' } },
];

export const THEME_DEFAULTS = Object.fromEntries(THEMES.map(theme => [theme.id, theme.defaults])) as Record<ThemeId, DesignTokens>;
export const THEME_IDS: ReadonlySet<string> = new Set(THEMES.map(theme => theme.id));
export const THEME_BY_ID = Object.fromEntries(THEMES.map(theme => [theme.id, theme])) as Record<ThemeId, ThemeManifest>;
