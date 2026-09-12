'use client';

import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import type { AureliaProduct } from '../data';
import { formatPrice, discountPercent, cn } from '../lib/utils';
import { Badge } from './ui/Badge';
import { Rating } from './ui/Rating';
import { Card3DTilt } from './ui/Card3DTilt';

function availabilityLabel(p: AureliaProduct) {
  switch (p.availability) {
    case 'low-stock':
      return { text: `Only ${p.stock ?? 3} left`, tone: 'warning' as const };
    case 'pre-order':
      return { text: 'Pre-order', tone: 'accent' as const };
    case 'sold-out':
      return { text: 'Sold out', tone: 'danger' as const };
    default:
      return null;
  }
}

export function ProductCard({
  product,
  rank,
  eager = false,
  onAddToCart,
}: {
  product: AureliaProduct;
  rank?: number;
  eager?: boolean;
  onAddToCart?: (product: AureliaProduct) => void;
}) {
  const [inWishlist, setInWishlist] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const discount = discountPercent(product.price, product.compareAt);
  const avail = availabilityLabel(product);
  const soldOut = product.availability === 'sold-out';

  const handleQuickAdd = () => {
    if (soldOut) return;
    onAddToCart?.(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <Card3DTilt maxTilt={6} scale={1.01} className="h-full">
      <article className="group relative flex h-full flex-col">
        <div className="relative overflow-hidden rounded-card bg-surface-2">
          <a href={`#product-${product.slug}`} aria-label={product.name} className="block">
            <img
              src={product.image}
              alt={product.name}
              width={600}
              height={700}
              loading={eager ? 'eager' : 'lazy'}
              className="aspect-[6/7] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </a>

          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
            {product.badges.includes('new') && <Badge tone="accent">New</Badge>}
            {product.badges.includes('best-seller') && <Badge tone="ink">Best Seller</Badge>}
            {discount !== null && <Badge tone="success">-{discount}%</Badge>}
          </div>

          {rank !== undefined && (
            <span className="pointer-events-none absolute bottom-3 left-3 font-display text-5xl font-bold leading-none text-ink/90 z-10">
              {String(rank + 1).padStart(2, '0')}
            </span>
          )}

          <button
            onClick={() => setInWishlist(!inWishlist)}
            aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={inWishlist}
            className={cn(
              'absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-ink-soft shadow-soft backdrop-blur transition-all duration-200 hover:text-ink',
              inWishlist && 'text-danger hover:text-danger',
            )}
          >
            <Heart className={cn('h-4 w-4 transition-transform', inWishlist && 'fill-current text-danger')} />
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={soldOut}
            aria-label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`}
            className="absolute inset-x-3 bottom-3 z-10 flex h-10 translate-y-2 cursor-pointer items-center justify-center gap-2 rounded-btn bg-surface/95 text-sm font-semibold text-ink opacity-0 shadow-soft backdrop-blur transition-all duration-300 hover:bg-ink hover:text-bg focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {addedNotice ? 'Added!' : soldOut ? 'Sold out' : 'Add to cart'}
          </button>
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <p className="label-caps">{product.brand}</p>
            <Rating value={product.rating} count={product.ratingCount} />
          </div>
          <a
            href={`#product-${product.slug}`}
            className="link-underline w-fit font-display text-base font-semibold text-ink transition-colors hover:text-accent"
          >
            {product.name}
          </a>
          <p className="line-clamp-1 text-[13px] text-ink-muted">{product.tagline}</p>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold tabular text-ink">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="text-xs text-ink-muted line-through tabular">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>
            {avail && (
              <Badge tone={avail.tone} className="text-[9px]">
                {avail.text}
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Card3DTilt>
  );
}
