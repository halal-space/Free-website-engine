import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search, ShoppingBag } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Collection, DesignTokens, PagePlan, Product, SectionConfig, StorefrontSnapshot, ThemeId } from '../types';
import { AddToCart, CartCount, CartPage, CheckoutPage, ConfirmationPage, TrackingPage } from './commerce';
import { StoreImage } from './StoreImage';
import { contrastRatio, readableInk } from '../validation';
import { formatMinorAmount } from '../money';

type Props = { snapshot: StorefrontSnapshot; plan: PagePlan; basePath: string; demo: boolean };

function path(base: string, value: string): string {
  return `${base}${value === '/' ? '' : value}` || '/';
}

function tokenStyle(tokens: DesignTokens): CSSProperties {
  const secondaryInk = readableInk(tokens.secondary);
  return {
    '--sf-primary': tokens.primary, '--sf-secondary': tokens.secondary,
    '--sf-accent': tokens.accent, '--sf-hover': tokens.hover,
    '--sf-primary-ink': readableInk(tokens.primary), '--sf-accent-ink': readableInk(tokens.accent),
    '--sf-secondary-ink': secondaryInk, '--sf-hover-ink': readableInk(tokens.hover),
    '--sf-secondary-accent': contrastRatio(tokens.accent, tokens.secondary) >= 4.5 ? tokens.accent : secondaryInk,
    '--sf-bg': tokens.background, '--sf-surface': tokens.surface,
    '--sf-text': tokens.text, '--sf-muted': tokens.muted, '--sf-border': tokens.border,
    '--sf-display': tokens.displayFont === 'serif' ? 'Georgia, Cambria, serif'
      : tokens.displayFont === 'rounded' ? 'Trebuchet MS, Arial Rounded MT Bold, sans-serif'
      : 'Arial, Helvetica, sans-serif',
    '--sf-body': tokens.bodyFont === 'serif' ? 'Georgia, Cambria, serif' : 'Arial, Helvetica, sans-serif',
    '--sf-heading-size': tokens.headingScale === 'large' ? 'clamp(40px, 4.8vw, 68px)' : 'clamp(34px, 4vw, 60px)',
    '--sf-heading-weight': tokens.headingWeight === 'heavy' ? '900' : tokens.headingWeight === 'bold' ? '700' : '400',
    '--sf-body-leading': tokens.bodyLineHeight === 'relaxed' ? '1.7' : '1.5',
    '--sf-tracking': tokens.letterSpacing === 'tight' ? '-.055em' : '-.035em',
    '--sf-radius': tokens.buttonShape === 'pill' ? '100px' : tokens.buttonShape === 'square' ? '0px' : tokens.radius === 'soft' ? '22px' : '3px',
    '--sf-card-radius': tokens.radius === 'soft' ? '22px' : '3px',
    '--sf-container': tokens.containerWidth === 'wide' ? '1500px' : '1380px',
    '--sf-grid-gap': tokens.gridGap === 'compact' ? '16px' : '24px',
    '--sf-border-width': tokens.borderWidth === 'strong' ? '2px' : '1px',
    '--sf-shadow': tokens.shadow === 'soft' ? '0 15px 40px rgba(0,0,0,.07)' : 'none',
    '--sf-motion': tokens.motion === 'none' ? '0ms' : tokens.motion === 'full' ? '350ms' : '200ms',
    '--sf-image-motion': tokens.motion === 'none' ? '0ms' : tokens.motion === 'full' ? '800ms' : '450ms',
    '--sf-section': tokens.density === 'compact' ? '72px' : '100px',
  } as CSSProperties;
}

function money(product: Product): string {
  return formatMinorAmount(product.priceMinor, product.currency);
}

export function Storefront({ snapshot, plan, basePath, demo }: Props) {
  const { merchant, config } = snapshot;
  return (
    <div className={`sf sf-${config.themeId}`} style={tokenStyle(config.tokens)}>
      {demo && <div className="sf-demo-bar">Design preview · Products and checkout are demonstrations</div>}
      <header className="sf-header">
        <div className="sf-header-inner">
          <Link className="sf-logo" href={path(basePath, '/')}>{merchant.logoText}</Link>
          <nav className="sf-nav" aria-label="Main navigation">
            {config.navigation.map(item => {
              const active = item.href === '/shop'
                ? ['shop', 'collection', 'product'].includes(plan.route.kind)
                : item.href === `/${plan.route.kind}`;
              return <Link key={item.href} href={path(basePath, item.href)} aria-current={active ? 'page' : undefined}>{item.label}</Link>;
            })}
          </nav>
          <div className="sf-header-actions">
            <Link href={path(basePath, '/search')} aria-label="Search products"><Search size={19} strokeWidth={1.7} /></Link>
            <Link href={path(basePath, '/cart')} aria-label="Shopping bag"><ShoppingBag size={19} strokeWidth={1.7} /><CartCount storeId={merchant.id} /></Link>
          </div>
        </div>
      </header>
      {plan.route.kind === 'home' && <Home plan={plan} snapshot={snapshot} basePath={basePath} />}
      {plan.route.kind === 'shop' && <Catalog plan={plan} basePath={basePath} themeId={config.themeId} />}
      {plan.route.kind === 'collection' && <Catalog plan={plan} basePath={basePath} themeId={config.themeId} />}
      {plan.route.kind === 'product' && plan.product && <ProductDetail product={plan.product} products={plan.products} basePath={basePath} themeId={config.themeId} />}
      {plan.route.kind === 'about' && <About snapshot={snapshot} />}
      {plan.route.kind === 'contact' && <Contact snapshot={snapshot} />}
      {plan.route.kind === 'search' && <SearchResults plan={plan} basePath={basePath} themeId={config.themeId} />}
      {plan.route.kind === 'cart' && <CartPage storeId={merchant.id} products={snapshot.products} basePath={basePath} />}
      {plan.route.kind === 'checkout' && <CheckoutPage storeId={merchant.id} products={snapshot.products} basePath={basePath} demo={demo} />}
      {plan.route.kind === 'confirmation' && <ConfirmationPage storeId={merchant.id} basePath={basePath} demo={demo} />}
      {plan.route.kind === 'tracking' && <TrackingPage storeId={merchant.id} demo={demo} />}
      {plan.route.kind === 'policy' && <SimplePage title={plan.title}><p>{plan.policy}</p></SimplePage>}
      <footer className="sf-footer">
        <div className="sf-footer-main">
          <div><Link className="sf-footer-logo" href={path(basePath, '/')}>{merchant.logoText}</Link><p>{merchant.tagline}</p></div>
          <div><span className="sf-footer-heading">Explore</span><Link href={path(basePath, '/shop')}>Shop all</Link><Link href={path(basePath, '/about')}>Our story</Link><Link href={path(basePath, '/contact')}>Contact</Link></div>
          <div><span className="sf-footer-heading">Help</span><Link href={path(basePath, '/policies/shipping')}>Shipping</Link><Link href={path(basePath, '/policies/returns')}>Returns</Link><Link href={path(basePath, '/track-order')}>Track an order</Link></div>
          <div><span className="sf-footer-heading">Get in touch</span><a href={`mailto:${merchant.email}`}>{merchant.email}</a>{merchant.location && <span>{merchant.location}</span>}</div>
        </div>
        <div className="sf-footer-bottom"><span>© {new Date().getFullYear()} {merchant.name}</span><div><Link href={path(basePath, '/policies/privacy')}>Privacy</Link><Link href={path(basePath, '/policies/terms')}>Terms</Link></div></div>
      </footer>
    </div>
  );
}

function Home({ plan, snapshot, basePath }: { plan: PagePlan; snapshot: StorefrontSnapshot; basePath: string }) {
  return <main>
    {plan.sections.map(section => {
      if (section.kind === 'hero') return <Hero key={section.id} section={section} themeId={plan.themeId} basePath={basePath} merchantName={snapshot.merchant.name} />;
      if (section.kind === 'collections') return <Collections key={section.id} collections={plan.collections} title={section.title || 'Collections'} basePath={basePath} themeId={plan.themeId} />;
      if (section.kind === 'featured') return <ProductSection key={section.id} products={plan.products} title={section.title || 'Featured'} basePath={basePath} themeId={plan.themeId} />;
      if (section.kind === 'story') return <Story key={section.id} merchant={snapshot.merchant} section={section} basePath={basePath} />;
      if (section.kind === 'announcement') return <div key={section.id} className="sf-announcement">{section.text}</div>;
      return null;
    })}
  </main>;
}

function Hero({ section, themeId, basePath, merchantName }: { section: SectionConfig; themeId: ThemeId; basePath: string; merchantName: string }) {
  const lines = (section.title || '').split('\n');
  const image = section.image || '';
  if (themeId === 'precision') return <section className="sf-hero sf-hero-precision">
    <div className="sf-hero-copy"><h1>{lines.map((line, index) => <span key={index}>{line}<br /></span>)}</h1><p>{section.text}</p><Link className="sf-button sf-button-light" href={path(basePath, '/shop')}>Explore the collection <ArrowUpRight size={18} /></Link></div>
    <div className="sf-hero-image"><StoreImage src={image} alt="" fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div>
  </section>;
  if (themeId === 'editorial') return <section className="sf-hero sf-hero-editorial">
    <StoreImage src={image} alt="" fill priority sizes="100vw" />
    <div className="sf-hero-copy"><h1>{lines.map((line, index) => <span key={index}>{line}<br /></span>)}</h1><p>{section.text}</p><Link className="sf-text-link sf-text-link-light" href={path(basePath, '/shop')}>Discover the collection <ArrowRight size={19} /></Link></div>
    <span className="sf-hero-side">{merchantName}</span>
  </section>;
  return <section className="sf-hero sf-hero-playful">
    <div className="sf-hero-copy"><h1>{lines.map((line, index) => <span key={index}>{line}<br /></span>)}</h1><p>{section.text}</p><Link className="sf-button" href={path(basePath, '/shop')}>Explore the collection <ArrowUpRight size={18} /></Link></div>
    <div className="sf-hero-image"><StoreImage src={image} alt="" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
  </section>;
}

function SectionHeading({ title, href, basePath }: { title: string; href?: string; basePath: string }) {
  return <div className="sf-section-heading"><h2>{title}</h2>{href && <Link className="sf-text-link" href={path(basePath, href)}>View all <ArrowUpRight size={18} /></Link>}</div>;
}

function Collections({ collections, title, basePath, themeId }: { collections: Collection[]; title: string; basePath: string; themeId: ThemeId }) {
  return <section className={`sf-section sf-collections sf-collections-${themeId}`}><div className="sf-container"><SectionHeading title={title} basePath={basePath} href="/shop" /><div className="sf-collection-grid">{collections.map(item => <Link key={item.id} className="sf-collection-card" href={path(basePath, `/collections/${item.slug}`)}><div className="sf-collection-image"><StoreImage src={item.image} alt="" fill sizes="(max-width: 700px) 80vw, 33vw" /></div><div className="sf-collection-caption"><div><h3>{item.name}</h3><p>{item.description}</p></div><ArrowUpRight size={19} /></div></Link>)}</div></div></section>;
}

function ProductSection({ products, title, basePath, themeId }: { products: Product[]; title: string; basePath: string; themeId: ThemeId }) {
  return <section className="sf-section sf-products"><div className="sf-container"><SectionHeading title={title} href="/shop" basePath={basePath} /><div className={`sf-product-grid sf-product-grid-${themeId}`}>{products.map(product => <ProductCard key={product.id} product={product} basePath={basePath} />)}</div></div></section>;
}

function ProductCard({ product, basePath }: { product: Product; basePath: string }) {
  return <article className="sf-product-card"><Link href={path(basePath, `/products/${product.slug}`)} className="sf-product-image"><StoreImage src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /></Link><div className="sf-product-info"><div><Link href={path(basePath, `/products/${product.slug}`)}><h3>{product.name}</h3></Link><span>{money(product)}</span></div><AddToCart storeId={product.storeId} product={product} /></div></article>;
}

function Story({ merchant, section, basePath }: { merchant: StorefrontSnapshot['merchant']; section: SectionConfig; basePath: string }) {
  return <section className="sf-story"><div className="sf-container sf-story-inner"><h2>{section.title}</h2><p>{section.text || merchant.about}</p><Link className="sf-text-link" href={path(basePath, '/about')}>Get to know us <ArrowUpRight size={18} /></Link></div></section>;
}

function Catalog({ plan, basePath, themeId }: { plan: PagePlan; basePath: string; themeId: ThemeId }) {
  return <main><div className={`sf-page-intro sf-page-intro-${themeId}`}><div className="sf-container"><h1>{plan.title}</h1><p>{plan.collection?.description || 'Discover the full collection.'}</p></div></div><div className="sf-container sf-catalog"><div className="sf-catalog-bar"><span>{plan.products.length} products</span><Link href={path(basePath, '/shop')}>All products</Link></div>{plan.products.length ? <div className={`sf-product-grid sf-product-grid-${themeId}`}>{plan.products.map(product => <ProductCard key={product.id} product={product} basePath={basePath} />)}</div> : <p className="sf-empty">There are no products here yet.</p>}</div></main>;
}

function ProductDetail({ product, products, basePath, themeId }: { product: Product; products: Product[]; basePath: string; themeId: ThemeId }) {
  const related = products.filter(p => p.id !== product.id).slice(0, 3);
  return <main><div className={`sf-container sf-detail sf-detail-${themeId}`}><div className="sf-detail-gallery"><div className="sf-detail-image"><StoreImage src={product.image} alt={product.name} fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div></div><div className="sf-detail-info"><Link className="sf-back-link" href={path(basePath, '/shop')}>← Back to shop</Link><h1>{product.name}</h1><div className="sf-detail-price">{money(product)}</div><p>{product.description}</p><div className="sf-detail-rule" /><p className="sf-stock">{product.available ? '● Available now' : 'Currently unavailable'}</p><AddToCart storeId={product.storeId} product={product} large /><div className="sf-detail-note">Shipping and payment details are confirmed at checkout.</div></div></div>{related.length > 0 && <ProductSection products={related} title="You may also like" basePath={basePath} themeId={themeId} />}</main>;
}

function About({ snapshot }: { snapshot: StorefrontSnapshot }) {
  const image = snapshot.config.homepage.find(section => section.kind === 'hero')?.image;
  return <main className="sf-about"><div className="sf-container sf-about-grid"><div className="sf-about-copy"><h1>Our story</h1><p className="sf-about-lead">{snapshot.merchant.tagline}</p><p>{snapshot.merchant.about}</p></div>{image && <div className="sf-about-image"><StoreImage src={image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>}</div></main>;
}

function Contact({ snapshot }: { snapshot: StorefrontSnapshot }) {
  return <main className="sf-contact"><div className="sf-container sf-contact-grid"><div><h1>Let&apos;s talk</h1><p>A question about your order or something you have seen? We would love to hear from you.</p></div><div className="sf-contact-card"><span className="sf-eyebrow">Get in touch</span><a className="sf-contact-email" href={`mailto:${snapshot.merchant.email}`}>{snapshot.merchant.email} <ArrowUpRight size={23} /></a>{snapshot.merchant.location && <p>{snapshot.merchant.location}</p>}<a className="sf-button" href={`mailto:${snapshot.merchant.email}`}>Email us <ArrowUpRight size={18} /></a></div></div></main>;
}

function SearchResults({ plan, basePath, themeId }: { plan: PagePlan; basePath: string; themeId: ThemeId }) {
  const query = plan.route.query?.trim() || '';
  const matches = query ? plan.products.filter(p => `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())) : [];
  return <main className="sf-container sf-search-page"><h1>Search</h1><form action={path(basePath, '/search')}><label htmlFor="sf-search-input">Search products</label><div className="sf-search-field"><input id="sf-search-input" name="q" type="search" defaultValue={query} placeholder="What are you looking for?" required /><button type="submit" aria-label="Submit search"><Search size={20} /></button></div></form><p className="sf-search-result-count">{query ? `${matches.length} result${matches.length === 1 ? '' : 's'} for “${query}”` : 'Enter a product name to search.'}</p>{matches.length > 0 && <div className={`sf-product-grid sf-product-grid-${themeId}`}>{matches.map(product => <ProductCard key={product.id} product={product} basePath={basePath} />)}</div>}</main>;
}

export function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="sf-simple-page"><div className="sf-container"><h1>{title}</h1><div className="sf-simple-content">{children}</div></div></main>;
}
