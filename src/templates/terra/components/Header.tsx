import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCartStore } from '../stores/cartStore';
import { categories } from '../data/catalog';
import Icon from './Icon';
import AnnouncementBar from './AnnouncementBar';

export default function Header() {
  const { setView, openSearch } = useUIStore();
  const { lines, openCart } = useCartStore();
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const totalCount = lines.reduce((s, l) => s + l.qty, 0);

  const menu = [
    { label: 'Oils & Vinegars', slug: 'oils-vinegars', desc: 'Single-estate, cold-pressed' },
    { label: 'Tinned Delicacies', slug: 'tinned-delicacies', desc: 'Line-caught, aged in tin' },
    { label: 'Heritage Grains', slug: 'heritage-grains', desc: 'Stone-milled landraces' },
    { label: 'Spices & Pastes', slug: 'spices-pastes', desc: 'Ferments & fresh grinds' },
    { label: 'Ready-to-Eat', slug: 'ready-to-eat', desc: 'Dinner in 10 minutes' },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-[rgba(27,36,30,0.08)] bg-[#FBF9F5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Desktop Nav */}
          <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Primary">
            <div
              className="group relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setView('shop')}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#1B241E]/5"
                aria-haspopup="true"
              >
                Shop <Icon name="ChevronDown" size={15} />
              </button>
              <div
                className={`absolute top-full left-0 w-72 pt-2 transition-all duration-200 ${
                  shopDropdownOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible translate-y-1 opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-[rgba(27,36,30,0.08)] bg-white shadow-xl">
                  {menu.map((m) => (
                    <button
                      key={m.slug}
                      type="button"
                      onClick={() => {
                        setView('category', m.slug);
                        setShopDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-[#F2EFE9]"
                    >
                      <span className="block text-sm font-semibold">{m.label}</span>
                      <span className="block text-xs text-[#6F7A72]">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setView('shop')}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#1B241E]/5 cursor-pointer"
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => setView('box')}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#1B241E]/5 cursor-pointer"
            >
              Pantry Box
            </button>
            <button
              type="button"
              onClick={() => setView('makers')}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#1B241E]/5 cursor-pointer"
            >
              Makers
            </button>
            <button
              type="button"
              onClick={() => setView('recipes')}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[#1B241E]/5 cursor-pointer"
            >
              Recipes
            </button>
          </nav>

          {/* Logo */}
          <button
            type="button"
            onClick={() => setView('home')}
            className="font-display text-xl font-bold tracking-tight sm:text-2xl cursor-pointer text-left"
            aria-label="TERRA and CRU home"
          >
            TERRA <span className="text-[#C85A32]">&</span> CRU
          </button>

          {/* Actions */}
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search pantry"
                className="cursor-pointer rounded-full p-2.5 text-[#1B241E] transition-colors duration-200 hover:bg-[#1B241E]/5"
              >
                <Icon name="Search" size={20} />
              </button>
              <button
                type="button"
                onClick={() => setView('account')}
                aria-label="Account"
                className="hidden cursor-pointer rounded-full p-2.5 text-[#1B241E] transition-colors duration-200 hover:bg-[#1B241E]/5 sm:block"
              >
                <Icon name="User" size={20} />
              </button>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open cart, ${totalCount} items`}
                className="relative cursor-pointer rounded-full bg-[#1B241E] p-2.5 text-[#FBF9F5] transition-colors duration-200 hover:bg-[#3B583E]"
              >
                <Icon name="ShoppingBag" size={20} />
                {totalCount > 0 && (
                  <span className="tnum absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C85A32] px-1 text-[11px] font-bold text-white">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile categories pills */}
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden no-scrollbar" aria-label="Mobile">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setView('category', c.slug)}
              className="shrink-0 cursor-pointer rounded-full border border-[#1B241E]/10 bg-white px-3 py-1.5 text-[13px] font-medium whitespace-nowrap"
            >
              {c.name}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}
