import Link from 'next/link';
import { concepts } from '@/prototypes/data';
import '@/prototypes/prototype.css';

export const metadata = { title: 'Storefront Concept Gallery | Rooqx', robots: { index: false, follow: false } };

export default function PrototypeGallery() {
  return <main className="cp-gallery"><div className="cp-gallery-head"><span>Rooqx storefront concepts</span><h1>Nine ways to shop.</h1><p>Explore three interactive directions for each store. Open any concept, browse products, save favorites, compare where relevant, and try the demo checkout.</p><div><a href="#mothercare">Mothercare</a><a href="#gadgets">Gadgets</a><a href="#clothing">Clothing</a></div></div>{(['mothercare', 'gadgets', 'clothing'] as const).map(store => <section key={store} id={store}><div className="cp-gallery-section-head"><span>0{store === 'mothercare' ? '1' : store === 'gadgets' ? '2' : '3'}</span><h2>{store === 'mothercare' ? 'Mothercare' : store === 'gadgets' ? 'Gadgets' : 'Clothing'}</h2></div><div className="cp-gallery-grid">{concepts.filter(item => item.store === store).map(item => <Link key={item.id} href={`/prototypes/${item.id}`} className={`cp-gallery-card cp-gallery-${item.id}`}><div className="cp-gallery-art"><img src={item.desktop} alt={`${item.name} desktop design`} /><img src={item.mobile} alt={`${item.name} mobile design`} /></div><div><span>{item.id.toUpperCase()}</span><h3>{item.name}</h3><p>{item.summary}</p><strong>Open interactive prototype →</strong></div></Link>)}</div></section>)}<footer>Concept previews use illustrative products and do not place real orders.</footer></main>;
}
