import React, { useEffect, useState } from 'react';
import { getOrders, type Order } from '../stores/ordersStore';
import { useUIStore } from '../stores/uiStore';
import { money } from '../data/catalog';
import Icon from './Icon';

export default function AccountPage() {
  const { setView } = useUIStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const subs = orders.flatMap((o) =>
    o.lines
      .filter((l) => l.meta?.toLowerCase().includes('subscri'))
      .map((l) => ({ ...l, orderId: o.id }))
  );

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
        / <span className="font-medium text-[#1B241E]">Account</span>
      </nav>

      <h1 className="font-display mb-6 text-4xl font-semibold">Your pantry account</h1>
      <p className="mb-6 max-w-xl text-sm text-[#4A554D]">
        Demo account — orders placed on this device appear below. No sign-in required.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section aria-label="Order history">
          <h2 className="font-display text-2xl font-semibold">Order history</h2>
          {orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-[#1B241E]/10 bg-white p-8 text-center">
              <p className="font-semibold">No orders yet — your pantry story starts here.</p>
              <button
                type="button"
                onClick={() => setView('shop')}
                className="mt-4 inline-block cursor-pointer rounded-full bg-[#1B241E] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
              >
                Shop best-sellers
              </button>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold">
                      {o.id}{' '}
                      <span className="tnum font-normal text-[#6F7A72]">
                        · {new Date(o.date).toLocaleDateString()} · {o.method}
                      </span>
                    </p>
                    <p className="tnum font-bold">{money(o.total)}</p>
                  </div>
                  <p className="mt-1 text-sm text-[#6F7A72]">
                    {o.lines.reduce((s, l) => s + l.qty, 0)} items · {o.city}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside
          className="h-fit rounded-2xl border border-[#1B241E]/10 bg-white p-5 lg:sticky lg:top-28"
          aria-label="Subscriptions"
        >
          <h2 className="inline-flex items-center gap-2 font-display text-xl font-semibold">
            <Icon name="Clock" size={18} /> Subscribe & Save
          </h2>
          {subs.length === 0 ? (
            <p className="mt-2 text-sm text-[#4A554D]">
              No active subscriptions. Choose “Subscribe −10%” on any product to never run dry.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {subs.map((s, i) => (
                <li key={`${s.id}-${i}`} className="flex items-center gap-2 text-sm">
                  <img src={s.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  <span className="flex-1 font-medium">{s.name}</span>
                  <span className="text-xs text-[#6F7A72]">{s.orderId}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mt-4 block w-full cursor-pointer rounded-full bg-[#3B583E] py-2.5 text-center text-sm font-bold text-white hover:bg-[#2c4430] transition-colors"
          >
            Browse subscriptions
          </button>
        </aside>
      </div>
    </main>
  );
}
