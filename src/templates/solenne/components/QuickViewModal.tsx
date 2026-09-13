import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { PRODUCTS, getCategoryLabel, formatPrice } from '../data/products';

export const QuickViewModal: React.FC = () => {
  const quickViewProductSlug = useUIStore((s) => s.quickViewProductSlug);
  const closeQuickView = useUIStore((s) => s.closeQuickView);
  const navigateToProduct = useUIStore((s) => s.navigateToProduct);
  const showToast = useUIStore((s) => s.showToast);
  const addToCart = useCartStore((s) => s.addToCart);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = React.useMemo(() => {
    if (!quickViewProductSlug) return null;
    return PRODUCTS.find((p) => p.slug === quickViewProductSlug) || null;
  }, [quickViewProductSlug]);

  if (!product) return null;

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const unitPrice = product.price + (selectedSize?.modifier || 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToBag = () => {
    addToCart(product.slug, selectedSizeIndex, quantity);
    closeQuickView();
    showToast(`${product.name} added to your bag.`, {
      image: product.images[0],
      action: {
        label: 'View Bag',
        onClick: () => useCartStore.getState().openCart(),
      },
    });
  };

  return (
    <>
      <div
        onClick={closeQuickView}
        className="backdrop fixed inset-0 z-[84] bg-ink/55 backdrop-blur-[3px] is-open"
      />

      <div
        id="quickview-modal"
        className="overlay-panel fixed inset-x-4 top-1/2 z-[85] mx-auto max-h-[90dvh] max-w-4xl -translate-y-1/2 overflow-y-auto rounded-lg bg-surface shadow-lifted is-open"
        role="dialog"
        aria-modal="true"
        aria-label="Quick view"
      >
        <button
          type="button"
          onClick={closeQuickView}
          className="sticky left-full top-0 z-10 m-4 grid h-10 w-10 place-items-center rounded-full bg-bg/80 text-ink shadow-whisper backdrop-blur-md transition-colors hover:bg-bg cursor-pointer"
          aria-label="Close quick view"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-9 pt-1 md:px-10 md:pb-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="img-skeleton aspect-[4/5] overflow-hidden rounded-md bg-cream">
              <img
                src={product.images[0]}
                alt={product.name}
                width={480}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col py-1">
              {product.badge && (
                <p className="eyebrow mb-2 text-gold">{product.badge}</p>
              )}
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-smoke">
                {product.tagline}
              </p>
              <p className="mt-4 text-lg font-medium tabular-nums">
                {formatPrice(unitPrice)}
              </p>

              {product.sizes.length > 1 && (
                <fieldset className="mt-6">
                  <legend className="eyebrow mb-3 text-stone">Size</legend>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s, i) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(i)}
                        aria-pressed={i === selectedSizeIndex}
                        className={`min-w-16 border px-4 py-2 text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                          i === selectedSizeIndex
                            ? 'border-ink bg-ink text-ivory'
                            : 'border-line-strong text-smoke hover:border-ink hover:text-ink'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex items-center border border-line-strong"
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-11 w-10 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(9, quantity + 1))}
                    aria-label="Increase quantity"
                    className="grid h-11 w-10 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="group/qv relative flex-1 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors duration-500 hover:text-ink cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-500 ease-lux group-hover/qv:translate-y-0"
                  />
                  <span className="relative z-10">
                    Add to Bag — {formatPrice(totalPrice)}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeQuickView();
                  navigateToProduct(product.slug);
                }}
                className="eyebrow mt-5 inline-flex w-fit items-center gap-2 text-gold transition-colors hover:text-ink cursor-pointer"
              >
                View full details
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>

              <ul className="mt-auto space-y-2 pt-7 text-xs text-stone hairline-t">
                <li>· Complimentary shipping over $100</li>
                <li>· Free returns within 30 days</li>
                <li>
                  · {getCategoryLabel(product.category)} · {product.skinTypes.slice(0, 3).join(', ')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
