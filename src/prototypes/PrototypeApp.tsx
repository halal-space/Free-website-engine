'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Concept, DemoProduct, concepts, formatPrice, storeProducts } from './data';

type View = 'home' | 'listing' | 'product' | 'favorites' | 'cart' | 'checkout' | 'confirmation' | 'compare';
type CartLine = { id: string; size?: string; quantity: number };

const storeLabel = { mothercare: 'Mothercare', gadgets: 'Gadgets', clothing: 'Clothing' } as const;

function filterByPath(product: DemoProduct, path: string): boolean {
  if (path === 'All' || path === 'New' || path === 'New in' || path === 'Shop') return true;
  const target = `${product.category} ${product.name} ${product.description}`.toLowerCase();
  const term = path.toLowerCase();
  if (term.includes('newborn') || term.includes('expecting') || term.includes('0–6')) return ['swaddle', 'cardigan', 'gift-set'].includes(product.id);
  if (term.includes('toddler') || term.includes('1–2') || term.includes('3+')) return ['blocks', 'cardigan', 'stroller'].includes(product.id);
  if (term.includes('baby') || term.includes('6–12')) return ['swaddle', 'cardigan', 'blocks', 'lamp'].includes(product.id);
  if (term.includes('sleep') || term.includes('nursery')) return ['swaddle', 'lamp'].includes(product.id);
  if (term.includes('bath') || term.includes('care')) return ['swaddle', 'gift-set'].includes(product.id);
  if (term.includes('on the go')) return product.id === 'stroller';
  if (term.includes('feeding')) return ['swaddle', 'gift-set'].includes(product.id);
  if (term.includes('gift')) return ['gift-set', 'blocks', 'cardigan'].includes(product.id);
  if (term.includes('work') || term.includes('desk')) return ['laptop', 'keyboard', 'headphones'].includes(product.id);
  if (term.includes('create') || term.includes('creator')) return ['camera', 'laptop', 'headphones'].includes(product.id);
  if (term.includes('travel')) return ['earbuds', 'camera', 'speaker'].includes(product.id);
  if (term.includes('gaming') || term.includes('play')) return product.store === 'gadgets' ? ['headphones', 'keyboard', 'speaker'].includes(product.id) : product.category === 'Play';
  if (term.includes('weekend')) return ['shirt', 'denim', 'tote', 'trousers'].includes(product.id);
  if (term.includes('occasion') || term.includes('evening')) return ['dress', 'blazer', 'tote'].includes(product.id);
  if (term.includes('denim')) return product.id === 'denim';
  if (term.includes('essentials')) return product.store === 'clothing' ? ['shirt', 'trousers', 'blazer'].includes(product.id) : true;
  if (term.includes('all tech') || term.includes('new arrival') || term.includes('shop by category') || term.includes('by age') || term.includes('by stage')) return true;
  if (term.includes('women') || term.includes('men') || term.includes('clothing')) return product.store === 'clothing' ? product.category !== 'Accessories' : product.category === 'Clothing';
  return target.includes(term);
}

function initialSaved(store: string): { favorites: string[]; cart: CartLine[]; compare: string[] } {
  try {
    const raw = localStorage.getItem(`rooqx:prototype:${store}`);
    if (!raw) return { favorites: [], cart: [], compare: [] };
    const value = JSON.parse(raw) as { favorites?: string[]; cart?: CartLine[]; compare?: string[] };
    return {
      favorites: Array.isArray(value.favorites) ? value.favorites : [],
      cart: Array.isArray(value.cart) ? value.cart : [],
      compare: Array.isArray(value.compare) ? value.compare : [],
    };
  } catch { return { favorites: [], cart: [], compare: [] }; }
}

export function PrototypeApp({ concept }: { concept: Concept }) {
  const catalog = useMemo(() => storeProducts(concept.store), [concept.store]);
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<DemoProduct>(catalog[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const [giftAge, setGiftAge] = useState('Newborn');
  const [giftBudget, setGiftBudget] = useState('Any budget');
  const [finder, setFinder] = useState<{ kind: 'gifts'; age: string; budget: string } | { kind: 'looks'; occasion: string; size: string } | null>(null);
  const [occasion, setOccasion] = useState('Work');
  const [wardrobeSize, setWardrobeSize] = useState('M');
  const [model, setModel] = useState('');
  const [modelResult, setModelResult] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    const saved = initialSaved(concept.store);
    setFavorites(saved.favorites);
    setCart(saved.cart);
    setCompare(saved.compare);
    setHydrated(true);
  }, [concept.store]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(`rooqx:prototype:${concept.store}`, JSON.stringify({ favorites, cart, compare }));
  }, [favorites, cart, compare, hydrated, concept.store]);

  function navigate(next: View) {
    setView(next);
    setMobileMenu(false);
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function browse(nextCategory = 'All') {
    setCategory(nextCategory);
    setSubmittedQuery('');
    setFinder(null);
    navigate('listing');
  }

  function findGifts() {
    setFinder({ kind: 'gifts', age: giftAge, budget: giftBudget });
    setCategory('Gifts');
    setSubmittedQuery('');
    navigate('listing');
  }

  function findLooks() {
    setFinder({ kind: 'looks', occasion, size: wardrobeSize });
    setCategory(occasion);
    setSubmittedQuery('');
    navigate('listing');
  }

  function openProduct(product: DemoProduct) {
    setSelected(product);
    setSelectedSize('');
    navigate('product');
  }

  function toggleFavorite(id: string) {
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  function addProduct(product: DemoProduct, size?: string) {
    if (product.sizes && !size) { openProduct(product); setNotice('Choose a size to add this item.'); return; }
    setCart(current => {
      const match = current.find(line => line.id === product.id && line.size === size);
      return match ? current.map(line => line === match ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { id: product.id, size, quantity: 1 }];
    });
    setNotice(`${product.name} added to bag`);
  }

  function toggleCompare(id: string) {
    setCompare(current => current.includes(id) ? current.filter(item => item !== id) : [...current.slice(-2), id]);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setCategory('All');
    setFinder(null);
    navigate('listing');
  }

  const visibleProducts = useMemo(() => {
    const filtered = catalog.filter(product => {
      if (submittedQuery) return `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(submittedQuery.toLowerCase());
      if (finder?.kind === 'gifts') {
        const byAge = finder.age === 'Toddler' ? ['blocks', 'cardigan', 'stroller'] : finder.age === '6–12 months' ? ['blocks', 'cardigan', 'swaddle'] : ['swaddle', 'cardigan', 'gift-set'];
        return byAge.includes(product.id) && (finder.budget === 'Under $50' ? product.price < 50 : finder.budget === '$50 and above' ? product.price >= 50 : true);
      }
      if (finder?.kind === 'looks') return filterByPath(product, finder.occasion) && (!product.sizes || product.sizes.includes(finder.size));
      return filterByPath(product, category);
    });
    if (sort === 'low') return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [catalog, category, finder, submittedQuery, sort]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + (catalog.find(item => item.id === line.id)?.price || 0) * line.quantity, 0);
  const favoriteProducts = catalog.filter(product => favorites.includes(product.id));
  const comparedProducts = catalog.filter(product => compare.includes(product.id));

  const cards = (list: DemoProduct[]) => <div className="cp-product-grid">{list.map(product => <ProductCard key={product.id} product={product} saved={favorites.includes(product.id)} compared={compare.includes(product.id)} compareEnabled={concept.store === 'gadgets'} onOpen={() => openProduct(product)} onFavorite={() => toggleFavorite(product.id)} onAdd={() => addProduct(product)} onCompare={() => toggleCompare(product.id)} />)}</div>;

  return <div className={`cp cp-${concept.id} cp-${concept.store}`}>
    <div className="cp-demo-bar"><Link href="/prototypes"><ArrowLeft size={15} /> All concepts</Link><span>{storeLabel[concept.store]} <span className="cp-demo-divider">/</span> {concept.name}</span><label>Switch concept <select value={concept.id} onChange={event => { window.location.href = `/prototypes/${event.target.value}`; }}>{concepts.map(item => <option key={item.id} value={item.id}>{item.id.toUpperCase()} · {item.name}</option>)}</select></label></div>
    <div className="cp-shipping-bar">Concept preview · Explore the journey · No real orders or payments</div>
    <header className="cp-header">
      <div className="cp-header-main">
        <button className="cp-icon-button cp-menu-button" type="button" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu /></button>
        <button className="cp-logo" type="button" onClick={() => navigate('home')}>{concept.storeName}</button>
        <nav className="cp-nav" aria-label="Store navigation">{concept.nav.map(item => <button key={item} type="button" onClick={() => item === 'Compare' ? navigate('compare') : browse(item)}>{item}</button>)}</nav>
        <div className="cp-actions"><button className="cp-icon-button cp-search-trigger" aria-label="Search" onClick={() => document.getElementById('cp-search')?.focus()}><Search /></button><button className="cp-icon-button" aria-label={`Favorites, ${favorites.length} saved`} onClick={() => navigate('favorites')}><Heart fill={favorites.length ? 'currentColor' : 'none'} />{favorites.length > 0 && <small>{favorites.length}</small>}</button><button className="cp-icon-button" aria-label={`Bag, ${cartCount} items`} onClick={() => navigate('cart')}><ShoppingBag />{cartCount > 0 && <small>{cartCount}</small>}</button></div>
      </div>
      <form className="cp-header-search" onSubmit={submitSearch}><Search size={18} /><input id="cp-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={concept.store === 'gadgets' ? 'Search model, product or use…' : concept.store === 'clothing' ? 'Search clothing, looks or styles…' : 'Search products, ages or gifts…'} aria-label="Search products" /><button type="submit">Search</button></form>
    </header>

    {mobileMenu && <div className="cp-menu-scrim" onClick={() => setMobileMenu(false)}><nav className="cp-mobile-menu" onClick={event => event.stopPropagation()} aria-label="Mobile store navigation"><div><strong>{concept.storeName}</strong><button aria-label="Close menu" onClick={() => setMobileMenu(false)}><X /></button></div>{concept.nav.map(item => <button key={item} onClick={() => item === 'Compare' ? navigate('compare') : browse(item)}>{item}<ArrowRight size={18} /></button>)}<button onClick={() => navigate('favorites')}>Favorites <Heart size={18} /></button><button onClick={() => navigate('cart')}>Bag <ShoppingBag size={18} /></button></nav></div>}

    {view === 'home' && <main>
      <Hero concept={concept} onPrimary={() => browse(concept.id === 'm1' ? 'Newborn' : concept.id === 'g1' ? 'Audio' : concept.id === 'c1' ? 'New' : concept.id === 'c2' ? 'New in' : 'All')} onSecondary={() => concept.store === 'gadgets' ? navigate('compare') : concept.store === 'clothing' ? browse('Essentials') : browse('Gifts')} />
      <Discovery concept={concept} browse={browse} findGifts={findGifts} findLooks={findLooks} giftAge={giftAge} setGiftAge={setGiftAge} giftBudget={giftBudget} setGiftBudget={setGiftBudget} occasion={occasion} setOccasion={setOccasion} wardrobeSize={wardrobeSize} setWardrobeSize={setWardrobeSize} model={model} setModel={setModel} modelResult={modelResult} setModelResult={setModelResult} onCompare={() => navigate('compare')} />
      <section className="cp-section cp-featured" id="featured"><SectionTitle kicker={concept.store === 'clothing' ? 'The edit' : concept.store === 'gadgets' ? 'Featured' : 'Chosen for you'} title={concept.store === 'clothing' ? concept.id === 'c3' ? 'Curated looks for a well-dressed life' : 'Pieces to come back to' : concept.store === 'gadgets' ? 'Choose with confidence' : 'Thoughtfully chosen for bright days'} action="Shop all" onAction={() => browse('All')} />{cards(catalog.slice(0, concept.id === 'g2' || concept.id === 'm3' ? 6 : 4))}</section>
      <section className="cp-editorial-band"><div><span className="cp-eyebrow">{concept.store === 'mothercare' ? 'A little help, right when you need it' : concept.store === 'gadgets' ? 'Good choices start with clarity' : 'A wardrobe that works harder'}</span><h2>{concept.store === 'mothercare' ? 'Every stage has its own story.' : concept.store === 'gadgets' ? 'Make space for better things.' : 'Wear it your way.'}</h2><p>{concept.store === 'mothercare' ? 'Start with their age, explore everyday needs, or find a gift that feels just right.' : concept.store === 'gadgets' ? 'Browse by use, check the details, and compare the products on your shortlist.' : 'Find a piece you love, check the fit, and build a look around it.'}</p><button className="cp-link-button" onClick={() => browse('All')}>Explore the collection <ArrowRight size={18} /></button></div><div className="cp-editorial-photo" style={{ backgroundImage: `url(${concept.desktop})` }} role="img" aria-label={`${concept.name} editorial imagery`} /></section>
      <section className="cp-section cp-reassurance"><div><Check size={22} /><strong>Find your fit</strong><span>{concept.store === 'gadgets' ? 'Browse by use and key specs' : concept.store === 'clothing' ? 'Size and styling guidance' : 'Shop by age and need'}</span></div><div><Heart size={22} /><strong>Save for later</strong><span>Favorites stay available in this browser</span></div><div><ShoppingBag size={22} /><strong>Try the journey</strong><span>Explore a simulated bag and checkout</span></div></section>
    </main>}

    {view === 'listing' && <main className="cp-inner-page"><div className="cp-page-heading"><span className="cp-eyebrow">{concept.storeName} / Explore</span><h1>{submittedQuery ? `Results for “${submittedQuery}”` : finder?.kind === 'gifts' ? `Gifts for ${finder.age.toLowerCase()}` : finder?.kind === 'looks' ? `${finder.occasion} looks in ${finder.size}` : category === 'All' ? 'Shop the collection' : category}</h1><p>{finder?.kind === 'gifts' ? `Showing ${finder.budget.toLowerCase()} ideas for this stage.` : finder?.kind === 'looks' ? `Pieces available in ${finder.size} for your ${finder.occasion.toLowerCase()} edit.` : submittedQuery ? 'Product matches from this demo catalog.' : 'Browse the collection, save your favorites, and compare the details that matter.'}</p></div><div className="cp-filter-bar"><div><SlidersHorizontal size={18} /><span>{visibleProducts.length} products</span><select value={category} aria-label="Filter category" onChange={event => { setCategory(event.target.value); setSubmittedQuery(''); setFinder(null); }}><option>All</option>{Array.from(new Set([...concept.nav, ...catalog.map(product => product.category)])).map(item => <option key={item}>{item}</option>)}</select></div><label>Sort <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>{visibleProducts.length ? cards(visibleProducts) : <EmptyState title="No products found" text="Try another search or explore the full collection." action="Shop all" onAction={() => browse('All')} />}</main>}

    {view === 'product' && <main className="cp-inner-page"><button className="cp-back" onClick={() => browse('All')}><ArrowLeft size={16} /> Back to shop</button><div className="cp-pdp"><div className="cp-pdp-media"><img src={selected.image} alt={selected.name} /><span>{selected.badge || selected.category}</span></div><div className="cp-pdp-info"><span className="cp-eyebrow">{selected.category}</span><h1>{selected.name}</h1><p className="cp-pdp-price">{formatPrice(selected.price)}</p><p>{selected.description}</p><div className="cp-pdp-rule" /><p>{selected.detail}</p>{selected.sizes && <div className="cp-size-picker"><div><strong>Choose size</strong><span>Size guide · concept only</span></div><div>{selected.sizes.map(size => <button type="button" className={selectedSize === size ? 'is-active' : ''} key={size} onClick={() => { setSelectedSize(size); setNotice(''); }}>{size}</button>)}</div></div>}{concept.store === 'gadgets' && <div className="cp-spec-list"><strong>At a glance</strong><span>{selected.detail}</span><button onClick={() => toggleCompare(selected.id)}>{compare.includes(selected.id) ? 'Remove from comparison' : 'Add to comparison'} <ArrowRight size={15} /></button></div>}<div className="cp-pdp-actions"><button className="cp-primary" onClick={() => addProduct(selected, selected.sizes ? selectedSize : undefined)}>Add to bag <ShoppingBag size={18} /></button><button className={`cp-save-large ${favorites.includes(selected.id) ? 'is-saved' : ''}`} aria-label={favorites.includes(selected.id) ? 'Remove from Favorites' : 'Save to Favorites'} onClick={() => toggleFavorite(selected.id)}><Heart fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} /></button></div>{notice && <p className="cp-inline-notice" role="status">{notice}</p>}<div className="cp-delivery"><span>Delivery and returns</span><p>This is a visual prototype. Final delivery terms and product details will come from the merchant.</p></div></div></div><section className="cp-related"><SectionTitle kicker="Keep exploring" title="You may also like" action="Shop all" onAction={() => browse('All')} />{cards(catalog.filter(product => product.id !== selected.id).slice(0, 3))}</section></main>}

    {view === 'favorites' && <main className="cp-inner-page"><div className="cp-page-heading"><span className="cp-eyebrow">Saved for later</span><h1>Favorites</h1><p>Keep your shortlist in one place while you explore.</p></div>{favoriteProducts.length ? cards(favoriteProducts) : <EmptyState title="Nothing saved yet" text="Tap the heart on any product to keep it here." action="Explore products" onAction={() => browse('All')} />}</main>}

    {view === 'compare' && <main className="cp-inner-page"><div className="cp-page-heading"><span className="cp-eyebrow">Side by side</span><h1>Compare your picks</h1><p>Choose up to three products to see their key details together.</p></div>{concept.store === 'gadgets' && comparedProducts.length ? <div className="cp-compare-grid">{comparedProducts.map(product => <article key={product.id}><img src={product.image} alt={product.name} /><h2>{product.name}</h2><strong>{formatPrice(product.price)}</strong><p>{product.detail}</p><button onClick={() => openProduct(product)}>View product <ArrowRight size={16} /></button><button onClick={() => toggleCompare(product.id)}>Remove</button></article>)}</div> : <EmptyState title="Build your comparison" text="Add products to compare their specs and prices." action="Browse gadgets" onAction={() => browse('All')} />}</main>}

    {view === 'cart' && <main className="cp-inner-page"><div className="cp-page-heading"><span className="cp-eyebrow">Your selection</span><h1>Shopping bag</h1></div>{cart.length ? <div className="cp-cart-layout"><div>{cart.map(line => { const product = catalog.find(item => item.id === line.id); if (!product) return null; return <article className="cp-cart-line" key={`${line.id}:${line.size || ''}`}><img src={product.image} alt="" /><div><h2>{product.name}</h2>{line.size && <p>Size {line.size}</p>}<strong>{formatPrice(product.price)}</strong><button className="cp-remove" onClick={() => setCart(current => current.filter(item => item !== line))}>Remove</button></div><div className="cp-quantity"><button aria-label={`Remove one ${product.name}`} onClick={() => setCart(current => current.map(item => item === line ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter(item => item.quantity > 0))}><Minus size={16} /></button><span>{line.quantity}</span><button aria-label={`Add one ${product.name}`} onClick={() => setCart(current => current.map(item => item === line ? { ...item, quantity: item.quantity + 1 } : item))}><Plus size={16} /></button></div></article>; })}</div><aside className="cp-order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><p>Delivery and taxes are confirmed in a real store. This prototype does not collect payment.</p><button className="cp-primary" onClick={() => navigate('checkout')}>Continue to checkout <ArrowRight size={17} /></button></aside></div> : <EmptyState title="Your bag is empty" text="Explore the collection and add something you love." action="Shop now" onAction={() => browse('All')} />}</main>}

    {view === 'checkout' && <main className="cp-inner-page"><div className="cp-page-heading"><span className="cp-eyebrow">Step 1 of 1 · demo</span><h1>Checkout preview</h1><p>No payment information is requested or processed.</p></div><div className="cp-cart-layout"><form className="cp-checkout-form" onSubmit={event => { event.preventDefault(); setOrderRef(`DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`); setCart([]); navigate('confirmation'); }}><h2>Contact and delivery</h2><label>Email<input type="email" placeholder="you@example.com" required /></label><div><label>First name<input required /></label><label>Last name<input required /></label></div><label>Address<input required /></label><div><label>City<input required /></label><label>Postcode<input required /></label></div><p>This form is only an interaction preview; entries are not sent to a server.</p><button className="cp-primary" type="submit">Place demo order <ArrowRight size={17} /></button></form><aside className="cp-order-summary"><h2>Order summary</h2>{cart.map(line => { const product = catalog.find(item => item.id === line.id); return product ? <div key={`${line.id}:${line.size || ''}`}><span>{product.name} × {line.quantity}</span><strong>{formatPrice(product.price * line.quantity)}</strong></div> : null; })}<div className="cp-summary-total"><span>Total before delivery</span><strong>{formatPrice(cartTotal)}</strong></div></aside></div></main>}

    {view === 'confirmation' && <main className="cp-inner-page"><div className="cp-confirmation"><Check size={35} /><span className="cp-eyebrow">Journey complete</span><h1>Thanks for exploring.</h1><p>Your demo reference is <strong>{orderRef}</strong>. No order was sent and no payment was taken.</p><button className="cp-primary" onClick={() => navigate('home')}>Return to storefront <ArrowRight size={17} /></button></div></main>}

    <footer className="cp-footer"><div><strong>{concept.storeName}</strong><p>{concept.store === 'mothercare' ? 'Little people. Brighter tomorrows.' : concept.store === 'gadgets' ? 'Technology worth living with.' : 'Modern pieces for living.'}</p></div><div><span>Explore</span><button onClick={() => browse('All')}>Shop all</button><button onClick={() => navigate('favorites')}>Favorites</button><button onClick={() => concept.store === 'gadgets' ? navigate('compare') : browse(concept.store === 'mothercare' ? 'Gifts' : 'Essentials')}>{concept.store === 'gadgets' ? 'Compare' : concept.store === 'mothercare' ? 'Gifts' : 'Essentials'}</button></div><div><span>Prototype</span><Link href="/prototypes">All nine directions</Link><button onClick={() => navigate('home')}>Back to top</button></div><small>Visual prototype · Product details and policies are illustrative.</small></footer>
    {notice && view !== 'product' && <div className="cp-toast" role="status">{notice}<button aria-label="Close notice" onClick={() => setNotice('')}><X size={15} /></button></div>}
    {concept.store === 'gadgets' && compare.length > 0 && view !== 'compare' && <button className="cp-compare-tray" onClick={() => navigate('compare')}>Compare {compare.length} {compare.length === 1 ? 'item' : 'items'} <ArrowRight size={16} /></button>}
  </div>;
}

function SectionTitle({ kicker, title, action, onAction }: { kicker: string; title: string; action: string; onAction: () => void }) {
  return <div className="cp-section-title"><div><span className="cp-eyebrow">{kicker}</span><h2>{title}</h2></div><button className="cp-link-button" onClick={onAction}>{action} <ArrowRight size={18} /></button></div>;
}

function Hero({ concept, onPrimary, onSecondary }: { concept: Concept; onPrimary: () => void; onSecondary: () => void }) {
  return <section className="cp-hero"><div className="cp-hero-copy"><span className="cp-eyebrow">{concept.eyebrow}</span><h1>{concept.headline}</h1><p>{concept.intro}</p><button className="cp-primary" onClick={onPrimary}>{concept.cta} <ArrowRight size={19} /></button>{(concept.id === 'g2' || concept.id === 'c3' || concept.id === 'm3') && <button className="cp-hero-secondary" onClick={onSecondary}>{concept.store === 'gadgets' ? 'Compare products' : concept.store === 'clothing' ? 'Shop essentials' : 'Find a gift'} <ArrowRight size={16} /></button>}</div><div className="cp-hero-photo" style={{ backgroundImage: `url(${concept.desktop})` }} role="img" aria-label={`${concept.storeName} ${concept.name} campaign imagery`} />{['m2', 'g3', 'c2'].includes(concept.id) && <div className="cp-hero-side-card"><span>{concept.store === 'mothercare' ? 'GOOD DAYS START HERE' : concept.store === 'gadgets' ? 'TECH FOR WHAT YOU DO' : 'THE NEW ISSUE'}</span><strong>{concept.store === 'mothercare' ? 'Play. Grow. Repeat.' : concept.store === 'gadgets' ? 'Make your setup yours.' : 'Style lives further.'}</strong><button onClick={onSecondary}>Explore more <ArrowRight size={16} /></button></div>}</section>;
}

function Discovery({ concept, browse, findGifts, findLooks, giftAge, setGiftAge, giftBudget, setGiftBudget, occasion, setOccasion, wardrobeSize, setWardrobeSize, model, setModel, modelResult, setModelResult, onCompare }: {
  concept: Concept; browse: (category: string) => void; findGifts: () => void; findLooks: () => void; giftAge: string; setGiftAge: (value: string) => void; giftBudget: string; setGiftBudget: (value: string) => void; occasion: string; setOccasion: (value: string) => void; wardrobeSize: string; setWardrobeSize: (value: string) => void; model: string; setModel: (value: string) => void; modelResult: boolean; setModelResult: (value: boolean) => void; onCompare: () => void;
}) {
  if (concept.store === 'mothercare') return <section className="cp-section cp-discovery"><SectionTitle kicker="Find your way" title={concept.id === 'm3' ? 'What do you need today?' : 'Shop by stage'} action="Shop all" onAction={() => browse('All')} /><div className="cp-stage-grid">{['Expecting', '0–6 months', '6–12 months', 'Toddler'].map((label, index) => <button className={`cp-stage-card cp-stage-${index}`} key={label} onClick={() => browse(label)}><span className="cp-stage-art">{['◌', '✳', '☼', '✿'][index]}</span><strong>{label}</strong><ArrowRight size={18} /></button>)}</div>{concept.id === 'm3' && <div className="cp-needs-grid">{['Sleep better', 'Feeding', 'On the go', 'Bath & care'].map((label, index) => <button key={label} onClick={() => browse(label)}><span>0{index + 1}</span><strong>{label}</strong><ArrowRight size={17} /></button>)}</div>}<div className="cp-gift-finder"><div><span className="cp-eyebrow">A thoughtful shortcut</span><h3>Find a gift for their stage</h3><p>Choose an age and budget to start with relevant ideas.</p></div><label>Age <select value={giftAge} onChange={event => setGiftAge(event.target.value)}><option>Newborn</option><option>6–12 months</option><option>Toddler</option></select></label><label>Budget <select value={giftBudget} onChange={event => setGiftBudget(event.target.value)}><option>Any budget</option><option>Under $50</option><option>$50 and above</option></select></label><button className="cp-primary" onClick={findGifts}>Find gifts <ArrowRight size={16} /></button></div></section>;
  if (concept.store === 'gadgets') return <section className="cp-section cp-discovery"><SectionTitle kicker="Find your fit" title={concept.id === 'g1' ? 'Explore the collection' : concept.id === 'g2' ? 'Shop by use case' : 'Build your world'} action="Compare picks" onAction={onCompare} /><div className="cp-use-grid">{(concept.id === 'g1' ? ['Audio', 'Computing', 'Cameras', 'Accessories'] : concept.id === 'g2' ? ['Work', 'Create', 'Travel', 'Play'] : ['For creators', 'Gaming', 'Audio', 'Desk setup']).map((label, index) => <button key={label} onClick={() => browse(label)}><span>0{index + 1}</span><strong>{label}</strong><p>{['The right tools, right now.', 'Make more of every moment.', 'Carry less. Do more.', 'Explore the details.'][index]}</p><ArrowRight size={19} /></button>)}</div><form className="cp-compatibility" onSubmit={event => { event.preventDefault(); setModelResult(true); }}><div><span className="cp-eyebrow">Compatibility finder</span><h3>What works with your device?</h3><p>Try a model name to preview this shopping path.</p></div><label>Device model <input value={model} onChange={event => { setModel(event.target.value); setModelResult(false); }} placeholder="e.g. AeroBook 14" required /></label><button className="cp-primary" type="submit">Check fit <ArrowRight size={16} /></button>{modelResult && <p className="cp-fit-result" role="status">Demo match for “{model}”: explore compatible accessories and confirm real specifications before purchase. <button type="button" onClick={() => browse('Accessories')}>View accessories <ArrowRight size={14} /></button></p>}</form></section>;
  return <section className="cp-section cp-discovery"><SectionTitle kicker="Discover" title={concept.id === 'c1' ? 'The essentials edit' : concept.id === 'c2' ? 'Shop by mood' : 'Build your wardrobe'} action="Shop all" onAction={() => browse('All')} /><div className="cp-fashion-paths">{(concept.id === 'c2' ? ['Denim', 'Layers', 'Essentials', 'Accessories'] : concept.id === 'c3' ? ['Work', 'Weekend', 'Occasion', 'Travel'] : ['New in', 'Clothing', 'Essentials', 'Accessories']).map((label, index) => <button key={label} onClick={() => browse(label)}><span>0{index + 1}</span><strong>{label}</strong><ArrowRight size={18} /></button>)}</div><div className="cp-wardrobe-finder"><div><span className="cp-eyebrow">Your way in</span><h3>{concept.id === 'c3' ? 'A complete look, made personal.' : 'Find pieces for your life.'}</h3><p>Choose an occasion and size, then explore pieces you can make your own.</p></div><label>Occasion <select value={occasion} onChange={event => setOccasion(event.target.value)}><option>Work</option><option>Weekend</option><option>Occasion</option></select></label><div className="cp-size-inline"><span>Size</span><div>{['XS', 'S', 'M', 'L', 'XL'].map(size => <button className={wardrobeSize === size ? 'is-active' : ''} key={size} onClick={() => setWardrobeSize(size)}>{size}</button>)}</div></div><button className="cp-primary" onClick={findLooks}>Explore looks <ArrowRight size={16} /></button></div></section>;
}

function ProductCard({ product, saved, compared, compareEnabled, onOpen, onFavorite, onAdd, onCompare }: { product: DemoProduct; saved: boolean; compared: boolean; compareEnabled: boolean; onOpen: () => void; onFavorite: () => void; onAdd: () => void; onCompare: () => void }) {
  return <article className="cp-product-card"><div className="cp-product-media"><button className="cp-product-image-button" onClick={onOpen} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /></button>{product.badge && <span className="cp-product-badge">{product.badge}</span>}<button className={`cp-favorite ${saved ? 'is-saved' : ''}`} aria-label={saved ? `Remove ${product.name} from Favorites` : `Save ${product.name} to Favorites`} onClick={onFavorite}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="cp-product-body"><span className="cp-product-category">{product.category}</span><button className="cp-product-name" onClick={onOpen}>{product.name}</button><p>{product.description}</p><div className="cp-product-bottom"><strong>{formatPrice(product.price)}</strong><button onClick={onAdd}>{product.sizes ? 'Choose size' : 'Add to bag'} <ArrowRight size={16} /></button></div>{compareEnabled && <button className="cp-card-compare" onClick={onCompare}>{compared ? '✓ Added to compare' : '+ Compare'}</button>}</div></article>;
}

function EmptyState({ title, text, action, onAction }: { title: string; text: string; action: string; onAction: () => void }) {
  return <div className="cp-empty"><Heart size={34} /><h2>{title}</h2><p>{text}</p><button className="cp-primary" onClick={onAction}>{action} <ArrowRight size={17} /></button></div>;
}
