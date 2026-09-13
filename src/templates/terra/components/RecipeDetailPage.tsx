import React from 'react';
import { recipes, products, money } from '../data/catalog';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import Icon from './Icon';

interface RecipeDetailPageProps {
  slug: string;
}

export default function RecipeDetailPage({ slug }: RecipeDetailPageProps) {
  const { setView } = useUIStore();
  const { addToCart, openCart } = useCartStore();

  const recipe = recipes.find((r) => r.slug === slug) || recipes[0];
  const ingredients = recipe.productIds
    .map((id) => products.find((p) => p.id === id)!)
    .filter(Boolean);

  const handleAddAll = () => {
    recipe.productIds.forEach((id) => {
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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        /{' '}
        <button
          type="button"
          onClick={() => setView('recipes')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Recipes
        </button>{' '}
        / <span className="font-medium text-[#1B241E]">{recipe.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-[20px]">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#C85A32] uppercase">
            <Icon name="Clock" size={13} /> {recipe.time} · {recipe.servings}
          </p>
          <h1 className="font-display mt-2 text-4xl leading-tight font-semibold sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#4A554D]">{recipe.intro}</p>

          <div className="mt-5 rounded-2xl border border-[#1B241E]/10 bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#6F7A72] uppercase">
              Shop this recipe
            </p>
            <ul className="mt-3 space-y-2">
              {ingredients.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-sm">
                  <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
                  <button
                    type="button"
                    onClick={() => setView('product', p.slug)}
                    className="flex-1 text-left font-semibold hover:text-[#C85A32] cursor-pointer transition-colors"
                  >
                    {p.name}
                  </button>
                  <span className="tnum text-[#6F7A72]">{money(p.price)}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddAll}
              className="mt-3 w-full cursor-pointer rounded-full bg-[#1B241E] py-2.5 text-[13px] font-bold text-white transition-colors duration-200 hover:bg-[#3B583E]"
            >
              Add all ingredients to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold">Method</h2>
        <ol className="mt-4 space-y-4">
          {recipe.steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="tnum flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B241E] text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-1 text-[15px] leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
