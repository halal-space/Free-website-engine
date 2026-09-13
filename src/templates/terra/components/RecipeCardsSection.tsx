import React from 'react';
import { recipes, products, money } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';

export default function RecipeCardsSection() {
  const { setView } = useUIStore();
  const { addToCart, openCart } = useCartStore();

  const handleAddAll = (productIds: string[]) => {
    productIds.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p) {
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
      }
    });
    openCart();
  };

  return (
    <section id="recipes" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">Shoppable pairings</p>
          <h2 className="font-display mt-1 text-3xl font-semibold sm:text-4xl">Cook it tonight</h2>
        </div>
        <button
          type="button"
          onClick={() => setView('recipes')}
          className="hidden shrink-0 cursor-pointer text-sm font-semibold underline underline-offset-4 hover:text-[#C85A32] sm:block"
        >
          All recipes
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {recipes.map((r) => (
          <article key={r.slug} className="overflow-hidden rounded-2xl border border-[#1B241E]/8 bg-white flex flex-col justify-between">
            <div>
              <div
                onClick={() => setView('recipe-detail', r.slug)}
                className="relative cursor-pointer overflow-hidden"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#1B241E]/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                  {r.time}
                </span>
              </div>
              <div className="p-5">
                <h3
                  onClick={() => setView('recipe-detail', r.slug)}
                  className="font-display text-xl leading-tight font-semibold cursor-pointer hover:text-[#C85A32] transition-colors"
                >
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-[#6F7A72]">{r.blurb}</p>
                <ul className="mt-3 space-y-1.5">
                  {r.productIds.map((id) => {
                    const p = products.find((x) => x.id === id);
                    if (!p) return null;
                    return (
                      <li key={id} className="flex items-center gap-2 text-[13px]">
                        <img
                          src={p.image}
                          alt=""
                          className="h-7 w-7 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <span className="flex-1 truncate font-medium">{p.name}</span>
                        <span className="tnum text-[#6F7A72]">{money(p.price)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                type="button"
                onClick={() => handleAddAll(r.productIds)}
                className="w-full cursor-pointer rounded-full bg-[#1B241E] py-2.5 text-[13px] font-bold text-white transition-colors duration-200 hover:bg-[#3B583E]"
              >
                Add all ingredients to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
