import React, { useState } from 'react';
import { useCartStore, computeCartSummary } from '../stores/cartStore';
import { PRODUCTS, formatPrice } from '../data/products';
import { useUIStore } from '../stores/uiStore';

export const CartDrawer: React.FC = () => {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoError = useCartStore((s) => s.promoError);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);

  const { navigateToShop, navigateToProduct, showToast } = useUIStore();

  const [promoInput, setPromoInput] = useState('');

  const {
    lines,
    count,
    subtotal,
    discount,
    total,
    freeShipping,
    shippingProgress,
    promoApplied,
  } = computeCartSummary(items, PRODUCTS, promoCode);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      setPromoInput('');
      showToast(`Promo code ${promoInput.toUpperCase()} applied!`);
    }
  };

  const handleCheckout = () => {
    showToast('This boutique is a design preview — checkout is simulated.');
  };

  // Recommendations that are not currently in the cart
  const recommendations = React.useMemo(() => {
    const cartSlugs = items.map((i) => i.slug);
    return PRODUCTS.filter((p) => !cartSlugs.includes(p.slug)).slice(0, 2);
  }, [items]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="backdrop fixed inset-0 z-[69] bg-ink/45 backdrop-blur-[2px] is-open"
      />

      {/* Drawer */}
      <aside
        id="cart-drawer"
        className="overlay-panel fixed inset-y-0 right-0 z-[70] flex w-full max-w-[28rem] flex-col bg-bg shadow-lifted is-open"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between hairline-b px-7 py-5">
          <h2 className="font-serif text-2xl">
            Your Bag <span className="text-base text-stone">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="-mr-2 p-2 text-stone transition-colors hover:text-ink cursor-pointer"
            aria-label="Close bag"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="hairline-b px-7 py-5">
          <p className="text-xs tracking-wide text-smoke">
            {freeShipping
              ? 'You have unlocked complimentary shipping.'
              : 'Complimentary shipping on orders over $100.'}
          </p>
          <div
            className="mt-3 h-px w-full bg-line-strong"
            role="progressbar"
            aria-label="Shipping progress"
            aria-valuenow={shippingProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gold transition-all duration-700 ease-lux"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Body */}
        {lines.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-line-strong text-stone">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              >
                <path d="M5 8h14l-1 13H6L5 8Z" />
                <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-2xl">Your bag is empty.</p>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                Beautiful skin begins with a single ritual.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                closeCart();
                navigateToShop();
              }}
              className="eyebrow mt-2 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory cursor-pointer"
            >
              Explore the Collection
            </button>
          </div>
        ) : (
          /* Lines + recommendations scroll together */
          <div className="no-scrollbar flex-1 overflow-y-auto px-7 py-4 divide-y divide-line">
            {lines.map((line) => {
              const sizeLabel = line.product.sizes[line.item.sizeIndex]?.label;
              return (
                <div key={`${line.item.slug}-${line.item.sizeIndex}`} className="py-5 flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      navigateToProduct(line.product.slug);
                    }}
                    className="img-skeleton block h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream cursor-pointer"
                  >
                    <img
                      src={line.product.images[0]}
                      alt={line.product.name}
                      className="h-full w-full object-cover"
                    />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            closeCart();
                            navigateToProduct(line.product.slug);
                          }}
                          className="font-serif text-base leading-snug hover:text-bronze text-left cursor-pointer truncate"
                        >
                          {line.product.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.item.slug, line.item.sizeIndex)}
                          className="text-stone hover:text-ink cursor-pointer p-1"
                          aria-label="Remove item"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                          >
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {sizeLabel && (
                        <p className="mt-0.5 text-xs text-stone">{sizeLabel}</p>
                      )}
                      <p className="mt-1 text-xs text-smoke font-medium">
                        {formatPrice(line.unitPrice)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div
                        className="flex items-center border border-line-strong h-8"
                        role="group"
                        aria-label="Quantity"
                      >
                        <button
                          type="button"
                          onClick={() => setQty(line.item.slug, line.item.sizeIndex, line.item.qty - 1)}
                          className="grid h-full w-8 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer text-xs"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs tabular-nums">
                          {line.item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.item.slug, line.item.sizeIndex, line.item.qty + 1)}
                          className="grid h-full w-8 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold tabular-nums">
                        {formatPrice(line.lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pairs beautifully recommendations */}
            {recommendations.length > 0 && (
              <div className="py-6">
                <p className="eyebrow mb-4 text-stone">Pairs beautifully</p>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <article key={rec.slug} className="flex items-center gap-4">
                      <img
                        src={rec.images[0]}
                        alt={rec.name}
                        className="h-16 w-14 rounded-sm object-cover bg-cream"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-serif text-sm">{rec.name}</p>
                        <p className="text-xs text-stone mt-0.5">{formatPrice(rec.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(rec.slug, 0, 1);
                          showToast(`${rec.name} added to your bag.`);
                        }}
                        className="eyebrow border border-line-strong px-3 py-1.5 text-xs transition-all hover:bg-ink hover:text-ivory cursor-pointer"
                      >
                        Add
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Totals Footer */}
        {lines.length > 0 && (
          <div className="hairline-t">
            <div className="space-y-3 px-7 py-5">
              {/* Promo */}
              {!promoApplied ? (
                <form onSubmit={handleApplyPromo} className="flex items-center gap-3" noValidate>
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. RADIANT10)"
                    aria-label="Promo code"
                    className="w-full border-b border-line-strong bg-transparent pb-2 text-xs uppercase tracking-[0.14em] placeholder:text-stone focus:border-gold focus:outline-none"
                  />
                  <button type="submit" className="eyebrow shrink-0 text-gold hover:text-ink cursor-pointer">
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs text-clay">
                  <span>Code <strong>{promoApplied}</strong> applied</span>
                  <button
                    type="button"
                    onClick={clearPromo}
                    className="text-gold underline-offset-2 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-xs italic text-red-800">{promoError}</p>
              )}

              {/* Totals */}
              <div className="flex justify-between pt-1 text-sm text-smoke">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-bronze">
                  <span>Promotion</span>
                  <span className="tabular-nums">−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span className="font-serif text-lg">Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="group/co relative mt-3 w-full overflow-hidden rounded-full bg-ink py-4 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:text-ink cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-500 ease-lux group-hover/co:translate-y-0"
                />
                <span className="relative z-10">Checkout</span>
              </button>
              <p className="pt-1 text-center text-[0.68rem] tracking-wide text-stone">
                Taxes and shipping calculated at checkout · Secure payment
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
