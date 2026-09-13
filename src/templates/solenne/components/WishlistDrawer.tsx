import React from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { PRODUCTS, getCategoryLabel, formatPrice } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const isOpen = useWishlistStore((s) => s.isOpen);
  const closeWishlist = useWishlistStore((s) => s.closeWishlist);
  const slugs = useWishlistStore((s) => s.slugs);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const addToCart = useCartStore((s) => s.addToCart);
  const { navigateToShop, navigateToProduct, showToast } = useUIStore();

  const wishlistProducts = slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={closeWishlist}
        className="backdrop fixed inset-0 z-[69] bg-ink/45 backdrop-blur-[2px] is-open"
      />

      <aside
        id="wishlist-drawer"
        className="overlay-panel fixed inset-y-0 right-0 z-[70] flex w-full max-w-[28rem] flex-col bg-bg shadow-lifted is-open"
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        <div className="flex items-center justify-between hairline-b px-7 py-5">
          <h2 className="font-serif text-2xl">
            Wishlist <span className="text-base text-stone">({slugs.length})</span>
          </h2>
          <button
            type="button"
            onClick={closeWishlist}
            className="-mr-2 p-2 text-stone transition-colors hover:text-ink cursor-pointer"
            aria-label="Close wishlist"
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

        {wishlistProducts.length === 0 ? (
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
                <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 0.9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-2xl">Nothing saved yet.</p>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-smoke">
                Tap the heart on any product to keep it close.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                closeWishlist();
                navigateToShop();
              }}
              className="eyebrow mt-2 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory cursor-pointer"
            >
              Discover Products
            </button>
          </div>
        ) : (
          <div className="no-scrollbar flex-1 overflow-y-auto divide-y divide-line px-7 py-4">
            {wishlistProducts.map((product) => {
              if (!product) return null;
              return (
                <div key={product.slug} className="py-5 flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      closeWishlist();
                      navigateToProduct(product.slug);
                    }}
                    className="img-skeleton block h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="eyebrow text-stone">{getCategoryLabel(product.category)}</p>
                          <button
                            type="button"
                            onClick={() => {
                              closeWishlist();
                              navigateToProduct(product.slug);
                            }}
                            className="font-serif text-base leading-snug hover:text-bronze text-left cursor-pointer truncate"
                          >
                            {product.name}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.slug)}
                          className="text-stone hover:text-ink cursor-pointer p-1"
                          aria-label="Remove from wishlist"
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

                      <p className="mt-1 text-xs text-smoke font-medium">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product.slug, 0, 1);
                          showToast(`${product.name} added to your bag.`);
                        }}
                        className="eyebrow border border-line-strong px-4 py-1.5 text-xs transition-all hover:bg-ink hover:text-ivory cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="hairline-t px-7 py-5">
          <p className="text-center text-xs tracking-wide text-stone">
            Items in your wishlist are saved to this device.
          </p>
        </div>
      </aside>
    </>
  );
};
