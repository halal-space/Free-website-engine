import React, { useState, useMemo } from 'react';
import { products, brands, TYPE_LABELS } from '../data/products';
import { ProductType, Product } from '../types';
import { ProductCard } from './ProductCard';
import { useUIStore } from '../stores/uiStore';

const ALL_TYPES: ProductType[] = ['panel', 'battery', 'inverter', 'ev'];

export const ProductsCatalogPage: React.FC = () => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);

  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>(ALL_TYPES);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brands);
  const [maxPrice, setMaxPrice] = useState<number>(17000);
  const [sortOption, setSortOption] = useState<string>('featured');

  const toggleType = (t: ProductType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes(ALL_TYPES);
    setSelectedBrands(brands);
    setMaxPrice(17000);
    setSortOption('featured');
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (!selectedTypes.includes(p.type)) return false;
      if (!selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'wattage') {
      result = [...result].sort((a, b) => (b.wattage || 0) - (a.wattage || 0));
    }

    return result;
  }, [selectedTypes, selectedBrands, maxPrice, sortOption]);

  return (
    <div>
      {/* Header banner */}
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Equipment
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            Equipment we install at volume. Nothing we would not put on our own roofs.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            Every unit below is stocked, batch-tested and covered by our 25-year workmanship warranty
            when we install it.
          </p>
        </div>
      </section>

      {/* Main catalog */}
      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
            {/* Filter sidebar */}
            <aside
              className="lg:sticky lg:top-24 self-start bg-ivory border border-line rounded-[2px] p-6"
              aria-label="Filters"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[15px] tracking-wide">Filter</h2>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-[13px] font-semibold text-brass-dark hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {/* Type filter */}
              <div className="mt-5">
                <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-graphite">
                  Type
                </h3>
                <div className="mt-3 space-y-2.5">
                  {ALL_TYPES.map((t) => (
                    <label key={t} className="flex items-center gap-2.5 text-[14.5px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t)}
                        onChange={() => toggleType(t)}
                        className="w-4 h-4 accent-[#B8975A] cursor-pointer"
                      />
                      {TYPE_LABELS[t]}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand filter */}
              <div className="mt-6 pt-6 border-t border-line">
                <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-graphite">
                  Brand
                </h3>
                <div className="mt-3 space-y-2.5">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2.5 text-[14.5px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="w-4 h-4 accent-[#B8975A] cursor-pointer"
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              {/* Max price filter */}
              <div className="mt-6 pt-6 border-t border-line">
                <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-graphite">
                  Max price
                </h3>
                <input
                  id="f-price"
                  type="range"
                  min="250"
                  max="17000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full mt-3 accent-[#B8975A] cursor-pointer"
                />
                <p className="text-sm text-graphite mt-2">
                  Up to{' '}
                  <span id="f-price-label" className="font-semibold text-onyx">
                    £{maxPrice.toLocaleString('en-US')}
                  </span>
                </p>
              </div>

              {/* Sort filter */}
              <div className="mt-6 pt-6 border-t border-line">
                <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-graphite">
                  Sort
                </h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="mt-3 w-full bg-cloud border border-line rounded-[2px] px-3 py-2.5 text-sm cursor-pointer focus:border-brass outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="wattage">Highest output</option>
                </select>
              </div>
            </aside>

            {/* Grid & Results */}
            <div>
              <p className="text-sm text-graphite mb-5" role="status">
                Showing {filteredProducts.length} of {products.length} systems
              </p>

              {filteredProducts.length > 0 ? (
                <div
                  id="product-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center border border-line rounded-[2px] bg-ivory py-16 px-6">
                  <h3 className="font-serif-display text-2xl">No equipment matches those filters.</h3>
                  <p className="text-graphite text-[15px] mt-2">
                    Widen the price range or re-enable a type.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="btn btn-onyx mt-5"
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* Bottom quote banner */}
              <div className="mt-10 bg-onyx rounded-[2px] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
                <div>
                  <h3 className="font-serif-display text-cloud text-2xl">Not sure what you need?</h3>
                  <p className="text-cloud/70 text-[15px] mt-1.5">
                    Send your bill. An engineer sizes the system, fixed price in 48 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToQuote()}
                  className="btn btn-brass shrink-0 cursor-pointer"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
