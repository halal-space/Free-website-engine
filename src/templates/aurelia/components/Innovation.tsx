import React from 'react';
import { Cpu, Sparkles, Gem, Leaf } from 'lucide-react';

const blocks = [
  {
    icon: Cpu,
    title: 'Precision Engineering',
    body: 'Every component is machined, tuned, and tested to tolerances measured in microns — then benchmarked by hand before it ships.',
  },
  {
    icon: Sparkles,
    title: 'Intelligent Technology',
    body: 'On-device intelligence learns your routines and adapts silently, so the technology gets out of the way of your day.',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    body: 'Forged titanium, sapphire glass, machined aluminum. Materials chosen for how they feel as much as how they perform.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Design',
    body: 'Recycled aluminum frames, repairable modules, and a five-year software commitment. Luxury should not cost the planet.',
  },
];

export function Innovation() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <div className="container-site space-y-16">
        <div>
          <p className="label-caps mb-3">Why AURELIA</p>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
            Engineered differently. Deliberately.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b.title} className="bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-btn bg-accent-soft text-accent">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
