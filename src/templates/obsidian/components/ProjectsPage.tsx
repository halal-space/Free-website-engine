import React from 'react';
import { projects } from '../data/projects';
import { useUIStore } from '../stores/uiStore';

export const ProjectsPage: React.FC = () => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);

  return (
    <div>
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Projects
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            Proof, not promises.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            Every project below is a real address with metered first-year output. References
            available before you sign anything.
          </p>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-6">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-cloud border border-line rounded-[2px] overflow-hidden"
            >
              <div
                className={`aspect-[16/10] lg:aspect-auto lg:min-h-[320px] bg-ivory overflow-hidden ${
                  i % 2 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={p.image}
                  alt={`${p.name}, ${p.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-brass-dark">
                  {p.location}
                </p>
                <h2 className="font-serif-display text-2xl md:text-3xl mt-2">{p.name}</h2>
                <p className="text-graphite text-[15px] mt-1.5">{p.size}</p>
                <p className="text-graphite text-[15.5px] leading-relaxed mt-4">{p.summary}</p>
                <dl className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-line">
                  <div>
                    <dt className="text-[11px] tracking-[0.14em] uppercase text-graphite font-semibold">
                      Output
                    </dt>
                    <dd className="font-serif-display text-xl mt-1">{p.output}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.14em] uppercase text-graphite font-semibold">
                      Bill change
                    </dt>
                    <dd className="font-serif-display text-xl mt-1">{p.billCut}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.14em] uppercase text-graphite font-semibold">
                      Install time
                    </dt>
                    <dd className="font-serif-display text-xl mt-1">{p.duration}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}

          <div className="bg-onyx rounded-[2px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif-display text-cloud text-2xl">Your roof could be next.</h2>
              <p className="text-cloud/70 text-[15px] mt-1.5">
                Fixed proposal with modelled output in 48 hours. Join 4,200+ metered systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateToQuote()}
                className="btn btn-brass cursor-pointer"
              >
                Get a Free Quote
              </button>
              <a href="tel:+442045771200" className="btn btn-ghost-light cursor-pointer text-center">
                Call an engineer
              </a>
            </div>
          </div>
          <p className="text-[13px] text-graphite">
            Outputs are metered first-year figures. Bill reductions depend on usage patterns and
            tariffs; your proposal models your case specifically.
          </p>
        </div>
      </section>
    </div>
  );
};
