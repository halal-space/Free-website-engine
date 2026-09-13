import React, { memo } from 'react';
import { Product } from '../types';
import { money } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product: p }: ProductCardProps) {
  const navigateToProduct = useUIStore((s) => s.navigateToProduct);
  const addToCart = useCartStore((s) => s.addToCart);
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);
  const cartLine = lines.find((l) => l.id === p.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      {
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        slug: p.slug,
      },
      1
    );
  };

  return (
    <article
      data-product-card="true"
      data-slug={p.slug}
      onClick={() => navigateToProduct(p.slug)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#1B241E]/8 bg-white shadow-[0_1px_2px_rgba(27,36,30,0.05),0_8px_32px_rgba(27,36,30,0.08)] transition-all duration-200 hover:shadow-[0_2px_4px_rgba(27,36,30,0.06),0_16px_48px_rgba(27,36,30,0.14)] cursor-pointer"
    >
      <div className="relative block aspect-square overflow-hidden bg-[#F2EFE9]" aria-label={p.name}>
        <img
          src={p.image}
          alt={p.alt || p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={p.lifestyle}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {p.compareAt && (
          <span className="absolute top-3 left-3 rounded-full bg-[#C85A32] px-2.5 py-1 text-[11px] font-bold text-white">
            Save {money(p.compareAt - p.price)}
          </span>
        )}
        {p.stock <= 20 && (
          <span className="absolute top-3 right-3 rounded-full bg-[#1B241E] px-2.5 py-1 text-[11px] font-bold text-[#F3D27A]">
            Only {p.stock} left
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="flex items-center gap-1" aria-label={`Rated ${p.rating} out of 5`}>
          <Icon name="Star" size={14} fill="#C9A227" strokeWidth={0} />
          <span className="tnum text-xs font-semibold">{p.rating}</span>
          <span className="tnum text-[11px] text-[#6F7A72]">({p.reviews.toLocaleString()})</span>
        </span>

        <h3 className="mt-1.5 block font-display text-[17px] leading-snug font-semibold text-[#1B241E] hover:text-[#C85A32] transition-colors">
          {p.name}
        </h3>

        <p className="tnum mt-1 text-xs text-[#6F7A72]">
          {p.origin} · {p.volume}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {p.badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-full bg-[#F2EFE9] px-2 py-0.5 text-[11px] font-medium text-[#4A554D]"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-3 flex h-10 items-center justify-between gap-2 pt-1">
          <p className="tnum text-[15px] font-bold text-[#1B241E]">
            {money(p.price)}{' '}
            {p.compareAt && (
              <s className="text-xs font-medium text-[#6F7A72]">{money(p.compareAt)}</s>
            )}
          </p>
          {cartLine ? (
            <div
              className="flex h-10 items-center gap-1 rounded-full border border-[#1B241E]/15 bg-white px-1"
              role="group"
              aria-label={`Quantity for ${p.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQty(p.id, cartLine.qty - 1);
                }}
                aria-label="Decrease quantity"
                className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-black/5"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="tnum min-w-6 text-center text-sm font-bold" aria-live="polite">
                {cartLine.qty}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQty(p.id, cartLine.qty + 1);
                }}
                aria-label="Increase quantity"
                className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-black/5"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#C85A32] px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#A84624]"
              aria-label={`Quick add ${p.name}`}
            >
              <Icon name="Plus" size={14} /> Quick Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
