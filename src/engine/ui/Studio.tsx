'use client';

import { ArrowDown, ArrowUp, Check, ChevronRight, ExternalLink, Eye, LayoutTemplate, Monitor, Palette, PanelsTopLeft, RotateCcw, Smartphone, Tablet, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { THEMES, THEME_DEFAULTS } from '../theme-registry';
import { assertSnapshot, contrastRatio } from '../validation';
import type { DesignTokens, SectionConfig, StorefrontConfig, StorefrontSnapshot } from '../types';

type Step = 'theme' | 'brand' | 'homepage' | 'review';
type Device = 'desktop' | 'tablet' | 'mobile';

const STEPS: { id: Step; name: string; hint: string; icon: typeof LayoutTemplate }[] = [
  { id: 'theme', name: 'Choose a look', hint: 'Start with a design direction', icon: LayoutTemplate },
  { id: 'brand', name: 'Make it yours', hint: 'Colors, type, and feel', icon: Palette },
  { id: 'homepage', name: 'Shape the homepage', hint: 'Content and sections', icon: PanelsTopLeft },
  { id: 'review', name: 'Preview & publish', hint: 'Check everything together', icon: Eye },
];

const DEVICE_WIDTH: Record<Device, number | string> = { desktop: '100%', tablet: 768, mobile: 390 };
const STORAGE_PREFIX = 'rooqx:studio:draft:';

export function Studio({ stores, canPublish }: { stores: Record<string, StorefrontSnapshot>; canPublish: boolean }) {
  const storeIds = Object.keys(stores);
  const [storeId, setStoreId] = useState(storeIds[0]);
  const [step, setStep] = useState<Step>('theme');
  const [device, setDevice] = useState<Device>('desktop');
  const [draft, setDraft] = useState<StorefrontConfig>(stores[storeIds[0]].config);
  const [publishedConfig, setPublishedConfig] = useState<StorefrontConfig>(stores[storeIds[0]].config);
  const [publishedVersion, setPublishedVersion] = useState(stores[storeIds[0]].config.publishedVersion);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const snapshot = stores[storeId];
  const basePath = `/stores/${storeId}`;
  const theme = THEMES.find(item => item.id === draft.themeId) || THEMES[0];
  const contrastOkay = useMemo(() => contrastRatio(draft.tokens.text, draft.tokens.background) >= 4.5
    && contrastRatio(draft.tokens.text, draft.tokens.surface) >= 4.5
    && contrastRatio(draft.tokens.muted, draft.tokens.background) >= 4.5,
  [draft.tokens.text, draft.tokens.background, draft.tokens.surface, draft.tokens.muted]);
  const ready = contrastOkay && draft.homepage.some(s => s.kind === 'hero' && s.enabled && s.title?.trim()) && draft.homepage.some(s => s.kind === 'featured' && s.enabled);

  useEffect(() => {
    const current = stores[storeId];
    let next = current.config;
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + storeId);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        const candidate = { ...current, config: parsed };
        assertSnapshot(candidate, storeId);
        next = candidate.config;
      }
    } catch { /* A corrupt local draft falls back to published configuration. */ }
    setDraft(next);
    setPublishedConfig(current.config);
    setPublishedVersion(current.config.publishedVersion);
    setMessage('');
  }, [storeId, stores]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_PREFIX + storeId, JSON.stringify(draft)); }
    catch { /* The editor still works for this session if storage is unavailable. */ }
  }, [draft, storeId]);

  const sendPreview = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'rooqx-preview', storeId, config: draft }, window.location.origin);
  }, [draft, storeId]);
  useEffect(() => { sendPreview(); }, [sendPreview]);

  function updateTokens(patch: Partial<DesignTokens>) { setDraft(current => ({ ...current, tokens: { ...current.tokens, ...patch } })); }
  function updateSection(id: string, patch: Partial<SectionConfig>) { setDraft(current => ({ ...current, homepage: current.homepage.map(s => s.id === id ? { ...s, ...patch } : s) })); }
  function moveSection(index: number, offset: number) {
    setDraft(current => {
      const target = index + offset;
      if (target < 0 || target >= current.homepage.length) return current;
      const sections = [...current.homepage];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...current, homepage: sections };
    });
  }
  async function publish() {
    if (!ready || busy || !canPublish) return;
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/demo/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ storeId, config: draft }) });
      const result = await response.json() as { version?: number; error?: string };
      if (!response.ok || !result.version) throw new Error(result.error || 'Could not publish');
      setPublishedVersion(result.version);
      const nextConfig = { ...draft, publishedVersion: result.version };
      setDraft(nextConfig);
      setPublishedConfig(nextConfig);
      setMessage(`Demo version ${result.version} published. It stays available until the local server restarts.`);
      frame.current?.contentWindow?.location.reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not publish'); }
    finally { setBusy(false); }
  }

  return <div className="studio">
    <header className="studio-topbar"><div className="studio-brand"><span className="studio-mark">R.</span><span>Rooqx <strong>Storefront Studio</strong></span></div><div className="studio-top-actions"><label className="studio-store-select">Preview store <select value={storeId} onChange={event => setStoreId(event.target.value)}>{storeIds.map(id => <option key={id} value={id}>{stores[id].merchant.name}</option>)}</select></label><span className="studio-status"><span /> Draft · Live v{publishedVersion}</span><a className="studio-open-link" href={basePath} target="_blank" rel="noopener noreferrer">Open storefront <ExternalLink size={15} /></a></div></header>
    <div className="studio-body"><aside className="studio-sidebar"><div className="studio-intro"><span className="studio-eyebrow">YOUR STORE, YOUR WAY</span><h1>Make a great first impression.</h1><p>Choose a look, add your voice, and see it come to life. Your products stay right where they are.</p></div><nav className="studio-steps" aria-label="Store setup steps">{STEPS.map((item, index) => <button key={item.id} type="button" className={`studio-step ${step === item.id ? 'active' : ''}`} onClick={() => setStep(item.id)}><span className="studio-step-number">0{index + 1}</span><span><strong>{item.name}</strong><small>{item.hint}</small></span><ChevronRight size={16} /></button>)}</nav><div className="studio-panel">
      {step === 'theme' && <><div className="studio-panel-title"><span className="studio-eyebrow">STEP 01</span><h2>Choose a look</h2><p>Three considered directions. See each one with your own products.</p></div><div className="studio-theme-list">{THEMES.map(item => <button type="button" key={item.id} className={`studio-theme ${draft.themeId === item.id ? 'selected' : ''}`} onClick={() => setDraft(current => ({ ...current, themeId: item.id, tokens: THEME_DEFAULTS[item.id] }))}><span className="studio-theme-art" style={{ backgroundImage: `url('${item.preview}')` }} /><span className="studio-theme-copy"><strong>{item.name}</strong><small>{item.description}</small><em>{item.detail}</em></span><span className="studio-theme-check">{draft.themeId === item.id && <Check size={15} />}</span></button>)}</div></>}
      {step === 'brand' && <>
        <div className="studio-panel-title"><span className="studio-eyebrow">STEP 02</span><h2>Make it yours</h2><p>A few thoughtful choices make the design feel like your business.</p></div>
        <div className="studio-fields">
          <h3>Colors</h3>
          {([['primary', 'Brand color'], ['accent', 'Accent color'], ['background', 'Page background'], ['text', 'Text color']] as const).map(([key, label]) =>
            <label key={key} className="studio-color-row"><span>{label}</span><span><input type="color" value={draft.tokens[key]} onChange={event => updateTokens({ [key]: event.target.value })} /><code>{draft.tokens[key]}</code></span></label>)}
          {!contrastOkay && <p className="studio-warning">Text needs more contrast against the page and card backgrounds before publishing.</p>}
          <h3>Type and shape</h3>
          <label className="studio-field">Headline style<select value={draft.tokens.displayFont} onChange={event => updateTokens({ displayFont: event.target.value as DesignTokens['displayFont'] })}><option value="rounded">Friendly</option><option value="sans">Modern</option><option value="serif">Editorial</option></select></label>
          <label className="studio-field">Spacing<select value={draft.tokens.density} onChange={event => updateTokens({ density: event.target.value as DesignTokens['density'] })}><option value="comfortable">Airy</option><option value="compact">Compact</option></select></label>
          <label className="studio-field">Corners<select value={draft.tokens.radius} onChange={event => updateTokens({ radius: event.target.value as DesignTokens['radius'] })}><option value="soft">Soft</option><option value="sharp">Sharp</option></select></label>
          <details className="studio-advanced"><summary>Advanced design controls</summary>
            <h3>More colors</h3>
            {([['secondary', 'Secondary color'], ['hover', 'Hover color'], ['surface', 'Card background'], ['muted', 'Supporting text'], ['border', 'Border color']] as const).map(([key, label]) =>
              <label key={key} className="studio-color-row"><span>{label}</span><span><input type="color" value={draft.tokens[key]} onChange={event => updateTokens({ [key]: event.target.value })} /><code>{draft.tokens[key]}</code></span></label>)}
            <h3>Typography</h3>
            <label className="studio-field">Body font<select value={draft.tokens.bodyFont} onChange={event => updateTokens({ bodyFont: event.target.value as DesignTokens['bodyFont'] })}><option value="sans">Sans serif</option><option value="serif">Serif</option></select></label>
            <label className="studio-field">Section heading size<select value={draft.tokens.headingScale} onChange={event => updateTokens({ headingScale: event.target.value as DesignTokens['headingScale'] })}><option value="standard">Standard</option><option value="large">Large</option></select></label>
            <label className="studio-field">Headline weight<select value={draft.tokens.headingWeight} onChange={event => updateTokens({ headingWeight: event.target.value as DesignTokens['headingWeight'] })}><option value="regular">Regular</option><option value="bold">Bold</option><option value="heavy">Heavy</option></select></label>
            <label className="studio-field">Body line spacing<select value={draft.tokens.bodyLineHeight} onChange={event => updateTokens({ bodyLineHeight: event.target.value as DesignTokens['bodyLineHeight'] })}><option value="standard">Standard</option><option value="relaxed">Relaxed</option></select></label>
            <label className="studio-field">Letter spacing<select value={draft.tokens.letterSpacing} onChange={event => updateTokens({ letterSpacing: event.target.value as DesignTokens['letterSpacing'] })}><option value="normal">Normal</option><option value="tight">Tight</option></select></label>
            <h3>Layout and effects</h3>
            <label className="studio-field">Page width<select value={draft.tokens.containerWidth} onChange={event => updateTokens({ containerWidth: event.target.value as DesignTokens['containerWidth'] })}><option value="standard">Standard</option><option value="wide">Wide</option></select></label>
            <label className="studio-field">Grid spacing<select value={draft.tokens.gridGap} onChange={event => updateTokens({ gridGap: event.target.value as DesignTokens['gridGap'] })}><option value="standard">Standard</option><option value="compact">Compact</option></select></label>
            <label className="studio-field">Button shape<select value={draft.tokens.buttonShape} onChange={event => updateTokens({ buttonShape: event.target.value as DesignTokens['buttonShape'] })}><option value="rounded">Rounded</option><option value="pill">Pill</option><option value="square">Square</option></select></label>
            <label className="studio-field">Border weight<select value={draft.tokens.borderWidth} onChange={event => updateTokens({ borderWidth: event.target.value as DesignTokens['borderWidth'] })}><option value="thin">Thin</option><option value="strong">Strong</option></select></label>
            <label className="studio-field">Shadows<select value={draft.tokens.shadow} onChange={event => updateTokens({ shadow: event.target.value as DesignTokens['shadow'] })}><option value="none">None</option><option value="soft">Soft</option></select></label>
            <label className="studio-field">Motion<select value={draft.tokens.motion} onChange={event => updateTokens({ motion: event.target.value as DesignTokens['motion'] })}><option value="subtle">Subtle</option><option value="none">None</option><option value="full">Expressive</option></select></label>
          </details>
        </div>
      </>}

      {step === 'homepage' && <><div className="studio-panel-title"><span className="studio-eyebrow">STEP 03</span><h2>Shape the homepage</h2><p>Turn sections on or off and arrange them in the order that tells your story.</p></div><div className="studio-section-list">{draft.homepage.map((section, index) => <div className="studio-section-row" key={section.id}><div><strong>{section.kind === 'hero' ? 'Opening banner' : section.kind === 'featured' ? 'Featured products' : section.kind === 'collections' ? 'Collections' : 'Your story'}</strong><label><input type="checkbox" checked={section.enabled} onChange={event => updateSection(section.id, { enabled: event.target.checked })} /> Show section</label></div><div className="studio-order"><button type="button" disabled={index === 0} aria-label={`Move ${section.kind} up`} onClick={() => moveSection(index, -1)}><ArrowUp size={16} /></button><button type="button" disabled={index === draft.homepage.length - 1} aria-label={`Move ${section.kind} down`} onClick={() => moveSection(index, 1)}><ArrowDown size={16} /></button></div></div>)}</div><div className="studio-fields"><h3>Opening banner</h3><label className="studio-field">Headline<textarea rows={3} maxLength={110} value={draft.homepage.find(s => s.kind === 'hero')?.title || ''} onChange={event => updateSection('hero', { title: event.target.value })} /></label><label className="studio-field">Supporting text<textarea rows={4} maxLength={250} value={draft.homepage.find(s => s.kind === 'hero')?.text || ''} onChange={event => updateSection('hero', { text: event.target.value })} /></label></div></>}
      {step === 'review' && <><div className="studio-panel-title"><span className="studio-eyebrow">STEP 04</span><h2>Ready when you are</h2><p>Check your store, then publish this design. Your existing product data stays intact.</p></div><div className="studio-checklist"><div><Check size={16} /> Theme selected: {theme.name}</div><div className={contrastOkay ? '' : 'needs-work'}><Check size={16} /> Text is easy to read</div><div className={ready ? '' : 'needs-work'}><Check size={16} /> Homepage has an opening and products</div></div><div className="studio-publish-box"><span>Current live design</span><strong>Version {publishedVersion}</strong><p>{canPublish ? 'Publishing updates the local development storefront. A production release will use the Rooqx backend.' : 'Publishing is available in the development demo. This production preview cannot change shared store data.'}</p><button type="button" disabled={!ready || busy || !canPublish} onClick={publish}><UploadCloud size={18} /> {busy ? 'Publishing…' : 'Publish demo design'}</button>{message && <p role="status">{message}</p>}</div></>}
    </div><div className="studio-sidebar-bottom"><button type="button" onClick={() => setDraft(publishedConfig)}><RotateCcw size={15} /> Reset to published design</button><span>Saved locally as a draft</span></div></aside>
    <main className="studio-preview"><div className="studio-preview-bar"><div><span className="studio-live-dot" /><strong>Live preview</strong><span>{snapshot.merchant.name} · {theme.name}</span></div><div className="studio-device-switch" aria-label="Preview size">{(['desktop', 'tablet', 'mobile'] as const).map(value => { const Icon = value === 'desktop' ? Monitor : value === 'tablet' ? Tablet : Smartphone; return <button key={value} type="button" aria-label={`${value} preview`} aria-pressed={device === value} onClick={() => setDevice(value)}><Icon size={17} /></button>; })}</div></div><div className="studio-preview-stage"><iframe key={storeId} ref={frame} title={`${snapshot.merchant.name} storefront preview`} src={basePath} onLoad={sendPreview} style={{ width: DEVICE_WIDTH[device] }} /></div></main></div>
  </div>;
}
