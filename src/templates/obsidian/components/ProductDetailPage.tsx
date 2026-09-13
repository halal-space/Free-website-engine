import React from 'react';
import { products, TYPE_LABELS, formatPrice } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigateToHome, navigateToProducts, navigateToProduct, navigateToQuote } = useUIStore();

  const product = products.find((p) => p.slug === slug) || products[0];

  const related = products.filter((p) => p.type === product.type && p.slug !== product.slug).slice(0, 2);
  const fallbackRelated = products.filter((p) => p.slug !== product.slug).slice(0, 2);
  const showRelated = related.length ? related : fallbackRelated;

  const compatible: Product[] =
    product.type === 'panel'
      ? products.filter((p) => ['inverter', 'battery'].includes(p.type)).slice(0, 4)
      : product.type === 'battery'
      ? products.filter((p) => p.type === 'inverter' || p.type === 'panel').slice(0, 4)
      : product.type === 'inverter'
      ? products.filter((p) => ['panel', 'battery'].includes(p.type)).slice(0, 4)
      : products.filter((p) => ['panel', 'battery', 'inverter'].includes(p.type)).slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="bg-cloud border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-[13px] text-graphite" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={navigateToHome}
              className="hover:text-onyx cursor-pointer"
            >
              Home
            </button>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              onClick={navigateToProducts}
              className="hover:text-onyx cursor-pointer"
            >
              Products
            </button>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-onyx font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main product overview */}
      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image + Quick stats */}
          <div className="reveal">
            <div className="bg-ivory border border-line rounded-[2px] overflow-hidden aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="bg-ivory border border-line rounded-[2px] p-4 text-center">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  Warranty
                </p>
                <p className="font-semibold mt-1 text-[15px]">{product.warranty}</p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-4 text-center">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  Brand
                </p>
                <p className="font-semibold mt-1 text-[15px]">{product.brand}</p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-4 text-center">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  Type
                </p>
                <p className="font-semibold mt-1 text-[15px]">{TYPE_LABELS[product.type]}</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details & CTA */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p className="eyebrow text-brass">
              {TYPE_LABELS[product.type]} · {product.brand}
            </p>
            <h1 className="font-serif-display font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] mt-3">
              {product.name}
            </h1>
            <p className="text-graphite text-lg mt-2">{product.tagline}</p>
            <p className="text-[15px] font-medium mt-4 inline-block bg-ivory border border-line rounded-[2px] px-3 py-2">
              {product.specLine}
            </p>
            <p className="text-graphite text-[16px] leading-relaxed mt-5">{product.description}</p>
            <ul className="mt-6 space-y-2.5">
              {product.specs.map((s) => (
                <li key={s} className="flex gap-3 text-[15px]">
                  <svg
                    className="text-brass shrink-0 mt-0.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex items-end gap-2 mt-8 pt-6 border-t border-line">
              <p className="font-serif-display text-4xl">£{formatPrice(product.price)}</p>
              <p className="text-graphite text-sm mb-1.5">{product.unit} · incl. install config</p>
            </div>
            <p className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-medium">
              <span className="w-2 h-2 rounded-full bg-green-700 inline-block" aria-hidden="true" />
              In stock — surveyed installs booking within 2–3 weeks
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                type="button"
                onClick={() =>
                  navigateToQuote({
                    productSlug: product.slug,
                    message: `Interested in quote for: ${product.name} (${product.specLine})`,
                  })
                }
                className="btn btn-brass flex-1 cursor-pointer text-center"
              >
                Get a Quote for This
              </button>
              <button
                type="button"
                onClick={navigateToProducts}
                className="btn btn-ghost-dark cursor-pointer text-center"
              >
                Back to All
              </button>
            </div>
            <p className="text-[13px] text-graphite mt-4 leading-relaxed">
              Price shown is equipment + standard install configuration. Final fixed price follows a
              free survey. 25-year workmanship warranty included. Heavy items (batteries, inverters)
              include two-person delivery and packaging removal.
            </p>
            <div className="mt-6 bg-ivory border border-line rounded-[2px] p-5">
              <h2 className="text-[13px] font-semibold tracking-[0.12em] uppercase">
                Included documentation
              </h2>
              <ul className="text-[14px] text-graphite space-y-1.5 mt-3">
                <li>— Manufacturer datasheet + warranty certificate</li>
                <li>— MCS certificate + DNO approval (on install jobs)</li>
                <li>— SEG export-tariff application support</li>
                <li>— Monitoring app setup + handover pack</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility section */}
      <section className="bg-cloud border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <h2 className="reveal font-serif-display text-3xl">Compatibility</h2>
          <p className="reveal text-graphite text-[15px] mt-2 max-w-2xl">
            Verified pairings from our install programme. We commission the full system, so
            mismatches never reach your roof.
          </p>
          <div className="mt-6 overflow-x-auto reveal">
            <table className="w-full text-left text-[14.5px] border border-line rounded-[2px] overflow-hidden">
              <thead>
                <tr className="bg-ivory">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Pairs with
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Key spec
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {compatible.map((c) => (
                  <tr
                    key={c.slug}
                    className="border-t border-line bg-cloud hover:bg-ivory transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => navigateToProduct(c.slug)}
                        className="font-semibold hover:text-brass-dark cursor-pointer text-left"
                      >
                        {c.name}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-graphite">{TYPE_LABELS[c.type]}</td>
                    <td className="px-4 py-3 text-graphite">{c.specLine}</td>
                    <td className="px-4 py-3 font-medium">£{formatPrice(c.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related equipment section */}
      <section className="bg-ivory border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brass">Related</p>
              <h2 className="font-serif-display text-3xl mt-1">Other options in this range</h2>
            </div>
            <button
              type="button"
              onClick={navigateToProducts}
              className="btn btn-ghost-dark shrink-0 cursor-pointer"
            >
              All equipment
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {showRelated.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
