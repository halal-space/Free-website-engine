import React, { useEffect, useState } from 'react';
import { getLastOrder, type Order } from '../stores/ordersStore';
import { useUIStore } from '../stores/uiStore';
import { money } from '../data/catalog';
import Icon from './Icon';

export default function CheckoutSuccessPage() {
  const { setView } = useUIStore();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrder(getLastOrder());
  }, []);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-10 text-center">
          <p className="font-display text-2xl font-semibold">No recent order found.</p>
          <button
            type="button"
            onClick={() => setView('shop')}
            className="mt-5 inline-block cursor-pointer rounded-full bg-[#1B241E] px-7 py-3 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
          >
            Shop the pantry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3B583E] text-white">
        <Icon name="Check" size={26} />
      </span>
      <h1 className="font-display mt-4 text-4xl font-semibold">Order {order.id} confirmed</h1>
      <p className="mt-2 text-[15px] text-[#4A554D]">
        Thank you, {order.name}. A receipt is on its way to {order.email}. Your crate ships{' '}
        {order.method.toLowerCase()} from our cellar within 48 hours.
      </p>
      <div className="mt-6 rounded-2xl border border-[#1B241E]/10 bg-white p-5 text-left">
        <ul className="space-y-2">
          {order.lines.map((l) => (
            <li key={l.id} className="flex items-center gap-3 text-sm">
              <img src={l.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
              <span className="flex-1 font-semibold">
                {l.name} <span className="tnum font-normal text-[#6F7A72]">× {l.qty}</span>
              </span>
              <span className="tnum font-bold">{money(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="tnum mt-4 flex justify-between border-t border-[#1B241E]/10 pt-3 font-bold">
          <span>Charged (demo — $0 real)</span>
          <span>{money(order.total)}</span>
        </p>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setView('account')}
          className="cursor-pointer rounded-full border border-[#1B241E]/20 px-6 py-3 text-sm font-bold hover:border-[#1B241E] transition-colors"
        >
          View account
        </button>
        <button
          type="button"
          onClick={() => setView('shop')}
          className="cursor-pointer rounded-full bg-[#C85A32] px-6 py-3 text-sm font-bold text-white hover:bg-[#A84624] transition-colors"
        >
          Keep shopping
        </button>
      </div>
    </main>
  );
}
