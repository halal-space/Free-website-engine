import React, { useState } from 'react';
import { Product, ProductReview } from '../types';
import { PRODUCTS, getCategoryLabel, formatPrice } from '../data/products';
import { Rating } from './Rating';
import { ProductCard } from './ProductCard';
import { RecentlyViewed } from './RecentlyViewed';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>('benefits');
  const [visibleReviewCount, setVisibleReviewCount] = useState(4);

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.slug));
  const { navigateToHome, navigateToShop, showToast } = useUIStore();

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const unitPrice = product.price + (selectedSize?.modifier || 0);
  const totalPrice = unitPrice * quantity;

  // Sample customer reviews
  const reviews: ProductReview[] = React.useMemo(() => {
    const names = [
      'Amara C. · New York',
      'Isabelle M. · Paris',
      'Priya N. · London',
      'Sofia L. · Stockholm',
      'Camille R. · Montréal',
      'Noor A. · Dubai',
    ];
    const texts = [
      'Exactly as promised. The texture alone is worth it — my skin has never felt so considered.',
      'I was skeptical of the price until week three. Now I understand completely. Repurchasing.',
      'This has quietly replaced two steps in my routine. My skin looks rested even after short nights.',
      'The scent is subtle, the results are not. Fine lines around my eyes are visibly softer.',
      'It melts in like water and leaves the most subtle glow. I catch myself touching my cheekbones by mid-afternoon.',
      'Two weeks in I wasn’t sure. One month in, my concealer shade was suddenly too warm. It works.',
    ];
    return [
      {
        author: names[0],
        rating: 5,
        date: 'August 2026',
        title: 'A quiet revelation',
        text: texts[0],
        verified: true,
      },
      {
        author: names[1],
        rating: 5,
        date: 'July 2026',
        title: 'Worth every cent',
        text: texts[1],
        verified: true,
      },
      {
        author: names[2],
        rating: 5,
        date: 'June 2026',
        title: 'Now indispensable',
        text: texts[2],
        verified: true,
      },
      {
        author: names[3],
        rating: 4,
        date: 'May 2026',
        title: 'Beautifully made',
        text: texts[3],
        verified: true,
      },
      {
        author: names[4],
        rating: 5,
        date: 'April 2026',
        title: 'The texture is the treatment',
        text: texts[4],
        verified: true,
      },
      {
        author: names[5],
        rating: 4,
        date: 'March 2026',
        title: 'Subtle, then undeniable',
        text: texts[5],
        verified: true,
      },
    ];
  }, [product]);

  const related = React.useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.slug !== product.slug && (p.category === product.category || p.concern === product.concern)
    ).slice(0, 4);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToBag = () => {
    addToCart(product.slug, selectedSizeIndex, quantity);
    showToast(`${product.name} added to your bag.`, {
      image: product.images[0],
      action: {
        label: 'View Bag',
        onClick: () => useCartStore.getState().openCart(),
      },
    });
  };

  const handleBuyNow = () => {
    addToCart(product.slug, selectedSizeIndex, quantity);
    useCartStore.getState().openCart();
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.slug);
    showToast(
      added
        ? `${product.name} saved to wishlist.`
        : `${product.name} removed from wishlist.`,
      { image: added ? product.images[0] : undefined }
    );
  };

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-luxe pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-stone">
          <li>
            <button
              type="button"
              onClick={() => navigateToHome()}
              className="transition-colors hover:text-ink cursor-pointer"
            >
              Home
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              type="button"
              onClick={() => navigateToShop()}
              className="transition-colors hover:text-ink cursor-pointer"
            >
              Shop
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              type="button"
              onClick={() => navigateToShop(product.category)}
              className="transition-colors hover:text-ink cursor-pointer"
            >
              {getCategoryLabel(product.category)}
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-clay">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Purchase Section */}
      <section className="container-luxe grid gap-10 py-10 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Gallery */}
        <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start">
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsZoomed(!isZoomed)}
            className="img-skeleton relative aspect-[4/5] w-full flex-1 cursor-zoom-in overflow-hidden rounded-md bg-cream"
            role="button"
            tabIndex={0}
            aria-label="Zoom product image"
          >
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              width={1000}
              height={1250}
              className="h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZoomed ? 'scale(1.9)' : 'scale(1)',
              }}
            />
          </div>

          <div className="flex gap-3 lg:flex-col" role="tablist" aria-label="Product images">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                role="tab"
                aria-selected={i === selectedImageIndex}
                aria-label={`View image ${i + 1}`}
                className={`img-skeleton aspect-[4/5] w-20 overflow-hidden rounded-sm border transition-all duration-300 lg:w-24 cursor-pointer ${
                  i === selectedImageIndex
                    ? 'border-ink'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  width={160}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase panel */}
        <div className="max-w-xl lg:pt-6">
          <p className="eyebrow text-gold">{getCategoryLabel(product.category)}</p>
          <h1 className="mt-3 font-serif text-[clamp(2.3rem,4.5vw,3.4rem)] leading-[1.02]">
            {product.name}
          </h1>

          <a href="#reviews" className="mt-4 inline-block transition-opacity hover:opacity-75">
            <Rating rating={product.rating} count={product.reviewCount} />
          </a>

          <p className="mt-5 font-serif text-2xl italic text-bronze">
            {formatPrice(unitPrice)}
          </p>

          <p className="mt-5 text-[0.95rem] leading-[1.85] text-smoke">
            {product.description}
          </p>

          {/* Size */}
          <fieldset className="mt-8">
            <legend className="eyebrow mb-3 text-stone">Size — select</legend>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s, i) => {
                const isSelected = i === selectedSizeIndex;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setSelectedSizeIndex(i);
                      setQuantity(1);
                    }}
                    aria-pressed={isSelected}
                    className={`min-w-[4.5rem] border px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-line-strong text-smoke hover:border-ink hover:text-ink'
                    }`}
                  >
                    {s.label}
                    {s.modifier > 0 && <span className="ml-1 opacity-60">+${s.modifier}</span>}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Qty + actions */}
          <div className="mt-7 flex items-stretch gap-3">
            <div
              className="flex items-center border border-line-strong"
              role="group"
              aria-label="Quantity"
            >
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-full w-11 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(9, quantity + 1))}
                className="grid h-full w-11 place-items-center text-smoke transition-colors hover:text-ink cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="group/bag relative flex-1 overflow-hidden rounded-full bg-ink py-4 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:text-ink cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-500 ease-lux group-hover/bag:translate-y-0"
              />
              <span className="relative z-10">
                Add to Bag — {formatPrice(totalPrice)}
              </span>
            </button>

            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label={`Add ${product.name} to wishlist`}
              className="grid w-14 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-all duration-300 hover:border-gold hover:bg-champagne/10 cursor-pointer"
            >
              {inWishlist ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="var(--color-gold, #8a6d47)"
                  stroke="var(--color-gold, #8a6d47)"
                  strokeWidth="1.25"
                >
                  <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 0.9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 0.9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="mt-3 w-full rounded-full border border-ink py-4 text-[0.82rem] font-medium uppercase tracking-[0.16em] transition-all duration-400 hover:bg-ink hover:text-ivory cursor-pointer"
          >
            Buy It Now
          </button>

          {/* Trust row */}
          <ul className="mt-9 grid grid-cols-3 gap-3 hairline-t pt-7 text-center">
            {[
              ['Free shipping', 'on orders $100+'],
              ['30-day returns', 'no questions asked'],
              ['Radiance guarantee', 'or your money back'],
            ].map(([t, s]) => (
              <li key={t}>
                <p className="text-xs font-medium uppercase tracking-[0.12em]">{t}</p>
                <p className="mt-1 text-[0.68rem] text-stone">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Accordions */}
      <section className="container-luxe pb-20 md:pb-28" aria-label="Product details">
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {/* Benefits */}
          <div>
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
              className="flex w-full items-center justify-between py-6 pr-2 transition-colors hover:text-bronze text-left cursor-pointer"
            >
              <span className="font-serif text-xl">Benefits</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className={`shrink-0 text-stone transition-transform duration-500 ease-lux ${
                  openAccordion === 'benefits' ? 'rotate-45' : ''
                }`}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {openAccordion === 'benefits' && (
              <div className="pb-8 pr-8">
                <ul className="space-y-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-smoke">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-gold, #8a6d47)"
                        strokeWidth="1.75"
                        className="mt-1 shrink-0"
                      >
                        <path d="m4 12.5 5 5L20 6.5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div>
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'how-to-use' ? null : 'how-to-use')}
              className="flex w-full items-center justify-between py-6 pr-2 transition-colors hover:text-bronze text-left cursor-pointer"
            >
              <span className="font-serif text-xl">How to Use</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className={`shrink-0 text-stone transition-transform duration-500 ease-lux ${
                  openAccordion === 'how-to-use' ? 'rotate-45' : ''
                }`}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {openAccordion === 'how-to-use' && (
              <div className="pb-8 pr-8">
                <p className="text-sm leading-[1.85] text-smoke">{product.howToUse}</p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
              className="flex w-full items-center justify-between py-6 pr-2 transition-colors hover:text-bronze text-left cursor-pointer"
            >
              <span className="font-serif text-xl">Ingredients</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className={`shrink-0 text-stone transition-transform duration-500 ease-lux ${
                  openAccordion === 'ingredients' ? 'rotate-45' : ''
                }`}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {openAccordion === 'ingredients' && (
              <div className="pb-8 pr-8 space-y-5">
                <div>
                  <p className="eyebrow mb-3 text-clay">Hero Ingredients</p>
                  <p className="font-serif text-lg italic text-espresso">
                    {product.heroIngredients.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-clay">Full Ingredient List (INCI)</p>
                  <p className="text-xs leading-relaxed text-smoke">{product.inci}</p>
                </div>
              </div>
            )}
          </div>

          {/* Shipping & Returns */}
          <div>
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
              className="flex w-full items-center justify-between py-6 pr-2 transition-colors hover:text-bronze text-left cursor-pointer"
            >
              <span className="font-serif text-xl">Shipping & Returns</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className={`shrink-0 text-stone transition-transform duration-500 ease-lux ${
                  openAccordion === 'shipping' ? 'rotate-45' : ''
                }`}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {openAccordion === 'shipping' && (
              <div className="pb-8 pr-8 space-y-3 text-sm leading-relaxed text-smoke">
                <p>
                  Complimentary carbon-neutral shipping on all orders over $100; standard delivery $8. Orders dispatch within 24 hours, Monday–Friday.
                </p>
                <p>
                  Returns accepted within 30 days — used or unused. Refunds issued within five business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-cream/60 py-20 md:py-28 scroll-mt-24" aria-labelledby="reviews-title">
        <div className="container-luxe">
          <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
            {/* Rating summary */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <p className="eyebrow mb-4 text-gold">Reviews</p>
              <h2 id="reviews-title" className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)]">
                What skin is saying.
              </h2>
              <div className="mt-8 hairline-t pt-8">
                <p className="font-serif text-6xl">{product.rating.toFixed(1)}</p>
                <Rating rating={product.rating} showValue={false} className="mt-3" />
                <p className="mt-2 text-xs tracking-wide text-stone">
                  Based on {product.reviewCount} verified reviews
                </p>
                <div className="mt-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 82 : star === 4 ? 13 : star === 3 ? 3 : star === 2 ? 1 : 1;
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs text-stone">
                        <span className="w-3 tabular-nums">{star}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-gold, #8a6d47)" aria-hidden="true">
                          <path d="M12 2.5 14.9 8.6l6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8L12 2.5z" />
                        </svg>
                        <div className="h-px flex-1 bg-line-strong">
                          <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right tabular-nums">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-5">
              {reviews.slice(0, visibleReviewCount).map((r, i) => (
                <article
                  key={i}
                  className="rounded-md border border-line bg-surface p-7 shadow-whisper"
                >
                  <header className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-lg italic">{r.title}</h3>
                      <Rating rating={r.rating} showValue={false} className="mt-1.5" />
                    </div>
                    <p className="text-xs tracking-wide text-stone">
                      {r.author} · {r.date}
                    </p>
                  </header>
                  <p className="mt-4 text-sm leading-[1.85] text-smoke">{r.text}</p>
                  {r.verified && (
                    <p className="mt-4 flex items-center gap-2 eyebrow text-clay">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-gold, #8a6d47)"
                        strokeWidth="1.75"
                      >
                        <path d="m4 12.5 5 5L20 6.5" />
                      </svg>
                      Verified purchase
                    </p>
                  )}
                </article>
              ))}

              {visibleReviewCount < reviews.length ? (
                <button
                  type="button"
                  onClick={() => setVisibleReviewCount((prev) => Math.min(prev + 2, reviews.length))}
                  className="mx-auto block rounded-full border border-line-strong px-8 py-3.5 eyebrow text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory cursor-pointer"
                >
                  Load More Reviews
                </button>
              ) : (
                <p className="pt-4 text-center text-xs tracking-wide text-stone">
                  You’ve reached the beginning of the glow.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Section */}
      {related.length > 0 && (
        <section className="container-luxe py-20 md:py-28" aria-labelledby="related-title">
          <div className="mb-12">
            <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold/60" />
              You May Also Love
            </p>
            <h2 id="related-title" className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)]">
              Completes the ritual
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed exclude={product.slug} />
    </div>
  );
};
