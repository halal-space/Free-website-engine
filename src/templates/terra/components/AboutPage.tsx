import React from 'react';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function AboutPage() {
  const { setView } = useUIStore();

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
        / <span className="font-medium text-[#1B241E]">Our Standard</span>
      </nav>

      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#3B583E] uppercase">Why we exist</p>
      <h1 className="font-display mt-1 max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl">
        Good pantries are grown, not manufactured.
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4A554D]">
        TERRA & CRU buys from 42 regenerative family farms and conserveras on multi-year, above-market
        contracts. Every product carries its harvest date, batch number and maker — and every batch is
        third-party lab-tested before it ships.
      </p>

      <dl className="mt-8 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <dt className="sr-only">Makers</dt>
          <dd className="font-display text-3xl font-semibold">42</dd>
          <dd className="text-sm text-[#6F7A72]">family makers on long contracts</dd>
        </div>
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <dt className="sr-only">Press time</dt>
          <dd className="font-display text-3xl font-semibold">6 hr</dd>
          <dd className="text-sm text-[#6F7A72]">grove to press, every harvest</dd>
        </div>
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <dt className="sr-only">Batches tested</dt>
          <dd className="font-display text-3xl font-semibold">100%</dd>
          <dd className="text-sm text-[#6F7A72]">of batches lab-tested for purity</dd>
        </div>
        <div className="rounded-2xl border border-[#1B241E]/10 bg-white p-5">
          <dt className="sr-only">Delivery</dt>
          <dd className="font-display text-3xl font-semibold">Net-0</dd>
          <dd className="text-sm text-[#6F7A72]">carbon-neutral chilled delivery</dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-[#1B241E] p-6 text-[#FBF9F5]">
          <Icon name="Leaf" size={22} />
          <h2 className="font-display mt-3 text-xl font-semibold">Regenerative first</h2>
          <p className="mt-1 text-sm opacity-75">
            Cover crops, composted prunings, wild field margins. Soil health is a line item in every
            contract.
          </p>
        </div>
        <div className="rounded-2xl bg-[#3B583E] p-6 text-[#FBF9F5]">
          <Icon name="Package" size={22} />
          <h2 className="font-display mt-3 text-xl font-semibold">Radical transparency</h2>
          <p className="mt-1 text-sm opacity-75">
            Maker, region, harvest, batch and full ingredients on every label — plus the lab report in your
            inbox.
          </p>
        </div>
        <div className="rounded-2xl bg-[#C85A32] p-6 text-white">
          <Icon name="Truck" size={22} />
          <h2 className="font-display mt-3 text-xl font-semibold">Chilled & carbon-neutral</h2>
          <p className="mt-1 text-sm opacity-85">
            Insulated, recyclable chill packaging. Emissions offset 110% on every route.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setView('makers')}
          className="inline-block cursor-pointer rounded-full bg-[#1B241E] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#3B583E] transition-colors"
        >
          Meet the makers
        </button>
      </div>
    </main>
  );
}
