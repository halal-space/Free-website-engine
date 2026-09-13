import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { Rating } from './Rating';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

interface ProductCardProps {
  product: Product;
  className?: string;
  eager?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  eager = false,
}) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const inWishlist = useWishlistStore((s) => s.isInWishlist(product.slug));
  const { navigateToProduct, openQuickView, showToast } = useUIStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product.slug, 0, 1);
    showToast(`${product.name} added to your bag.`, {
      image: product.images[0],
      action: {
        label: 'View Bag',
        onClick: () => useCartStore.getState().openCart(),
      },
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const added = toggleWishlist(product.slug);
    showToast(
      added
        ? `${product.name} saved to wishlist.`
        : `${product.name} removed from wishlist.`,
      { image: added ? product.images[0] : undefined }
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openQuickView(product.slug);
  };

  return (
    <article
      data-product-card
      data-slug={product.slug}
      className={`group/card relative flex flex-col ${className}`}
    >
      {/* Image Container */}
      <div className="img-skeleton relative aspect-[4/5] w-full overflow-hidden rounded-md bg-cream">
        <img
          src={product.images[0]}
          alt={`${product.name} — ${product.tagline}`}
          width={600}
          height={750}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-lux group-hover/card:opacity-0"
        />
        <img
          src={product.images[1]}
          alt=""
          width={600}
          height={750}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-700 ease-lux group-hover/card:scale-100 group-hover/card:opacity-100"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3.5 py-1.5 eyebrow text-ink backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={`${inWishlist ? 'Remove' : 'Add'} ${product.name} ${inWishlist ? 'from' : 'to'} wishlist`}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-bg/85 text-ink opacity-100 shadow-whisper backdrop-blur-sm transition-all duration-300 hover:bg-surface md:translate-y-1 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 cursor-pointer"
        >
          {inWishlist ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="var(--color-gold, #8a6d47)"
              stroke="var(--color-gold, #8a6d47)"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9z" />
            </svg>
          )}
        </button>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={handleQuickView}
          className="eyebrow absolute inset-x-4 bottom-[4.25rem] hidden rounded-full bg-bg/90 py-3 text-ink shadow-whisper backdrop-blur-md transition-all duration-500 ease-lux hover:bg-surface group-hover/card:pointer-events-auto group-hover/card:opacity-100 md:block md:-translate-y-2 md:opacity-0 md:group-hover/card:translate-y-0 cursor-pointer"
        >
          Quick View
        </button>

        {/* Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="eyebrow absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-ink/92 py-3 text-ivory backdrop-blur-md transition-all duration-500 ease-lux hover:bg-champagne hover:text-ink cursor-pointer"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
          Add to Bag — {formatPrice(product.price)}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col items-start gap-1.5 px-1 pt-5">
        <p className="eyebrow text-stone">{product.heroIngredients[0]}</p>
        <h3 className="font-serif text-xl leading-snug">
          <button
            type="button"
            onClick={() => navigateToProduct(product.slug)}
            className="link-underline text-left transition-colors duration-300 hover:text-bronze cursor-pointer"
          >
            {product.name}
          </button>
        </h3>
        <Rating rating={product.rating} count={product.reviewCount} className="mt-1" />
        <p className="mt-2 line-clamp-2 max-w-xs text-[0.82rem] leading-relaxed text-smoke">
          {product.tagline}
        </p>
        <p className="mt-2 text-sm font-medium tracking-wide">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
};
