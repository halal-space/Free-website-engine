import React from 'react';
import { SectionHeading } from './SectionHeading';
import { FaqAccordion } from './FaqAccordion';
import { processSteps } from '../data/site';
import { useUIStore } from '../stores/uiStore';

export const ServicesPage: React.FC = () => {
  const { navigateToQuote, navigateToFaq } = useUIStore();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Services
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            Installed by employees. Serviced for life.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            No subcontractors. MCS and NICEIC crews, structural surveys, panel-level design and
            remote monitoring on every job.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigateToQuote()}
              className="btn btn-brass cursor-pointer"
            >
              Get a Free Quote
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('financing')}
              className="btn btn-ghost-light cursor-pointer"
            >
              Financing options
            </button>
          </div>
        </div>
      </section>

      {/* Residential */}
      <section id="residential" className="bg-cloud scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-[2px] overflow-hidden bg-ivory border border-line aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop"
              alt="Residential home with solar installation"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Residential"
              title="Homes, from 4 to 16 kW."
              copy="Most installs complete in 1–3 days. You get a structural survey, shading model and fixed price before we touch the roof."
            />
            <ul className="mt-7 space-y-3 text-[15px]">
              <li className="flex gap-3">
                <span className="text-brass font-bold">01</span>
                <span>
                  <strong>Survey.</strong> Roof structure, electrics, shading and 12 months of bills
                  reviewed on site.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">02</span>
                <span>
                  <strong>Design.</strong> Panel-level layout with written output forecast. DNO
                  application handled.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">03</span>
                <span>
                  <strong>Install.</strong> Scaffolding, mounting, wiring, inverter and battery.
                  Commissioned same day.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">04</span>
                <span>
                  <strong>Handover.</strong> Monitoring app, MCS certificate, warranty pack and export
                  tariff setup.
                </span>
              </li>
            </ul>
            <p className="mt-6 inline-block bg-ivory border border-line rounded-[2px] px-4 py-3 text-[15px]">
              <span className="text-graphite">Typical 8 kW + battery:</span>{' '}
              <strong>£14,500 – £17,000 installed</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section id="commercial" className="bg-charcoal scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              dark
              eyebrow="Commercial"
              title="Roofs from 30 to 500 kW."
              copy="Phased installation around operations. Yield modelling your finance team can sign off, with board-level reporting."
            />
            <ul className="mt-7 space-y-3 text-[15px] text-cloud/80">
              <li className="flex gap-3">
                <span className="text-brass font-bold">01</span>
                <span>
                  <strong className="text-cloud">Feasibility.</strong> Structural, grid capacity and
                  consumption profiling. Payback modelled.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">02</span>
                <span>
                  <strong className="text-cloud">Engineering.</strong> String design, three-phase
                  inverters, G99 applications and CDM compliance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">03</span>
                <span>
                  <strong className="text-cloud">Phased install.</strong> Nights and weekends
                  available. No operational downtime.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brass font-bold">04</span>
                <span>
                  <strong className="text-cloud">Reporting.</strong> Generation dashboards, O&M
                  contract and performance guarantees.
                </span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => navigateToQuote()}
                className="btn btn-brass cursor-pointer"
              >
                Book a site assessment
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative rounded-[2px] overflow-hidden aspect-[4/3] bg-onyx">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
              alt="Commercial building rooftop system"
              loading="lazy"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Full process */}
      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Process"
            title="The same four steps, at any scale."
            align="center"
          />
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-12 border-t border-line">
            {processSteps.map((s, i) => (
              <li
                key={s.index}
                className="reveal relative pt-8 md:px-8 md:first:pl-0 pb-4"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="absolute top-[-2px] left-0 w-12 h-[3px] bg-brass" />
                <p className="font-serif-display text-brass text-lg">{s.index}</p>
                <h3 className="font-semibold text-lg mt-2">{s.title}</h3>
                <p className="text-graphite text-[14.5px] leading-relaxed mt-2">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Financing */}
      <section id="financing" className="bg-ivory border-y border-line scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Financing"
            title="Three ways to pay. Same hardware."
            copy="Quoted price is identical regardless of payment route. We do not take commission on finance."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <article className="bg-cloud border border-line rounded-[2px] p-8">
              <h3 className="font-serif-display text-2xl">Outright</h3>
              <p className="text-brass-dark font-semibold text-sm mt-1 tracking-wide">
                Lowest lifetime cost
              </p>
              <p className="text-graphite text-[15px] leading-relaxed mt-4">
                Pay on commissioning. Full MCS pack, immediate export tariff eligibility, fastest
                payback — typically 6–8 years residential.
              </p>
              <p className="text-[13px] text-graphite mt-5 pt-4 border-t border-line">
                0% deposit to book survey. Balance on handover.
              </p>
            </article>
            <article className="bg-onyx rounded-[2px] p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-2xl text-cloud">Solar loan</h3>
                <span className="bg-brass text-onyx text-[11px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-[2px]">
                  Popular
                </span>
              </div>
              <p className="text-brass font-semibold text-sm mt-1 tracking-wide">
                From 4.9% APR, 5–15 years
              </p>
              <p className="text-cloud/70 text-[15px] leading-relaxed mt-4">
                Unsecured lending via FCA-regulated partners. Most households find monthly payments
                below their prior bill plus export income.
              </p>
              <p className="text-[13px] text-cloud/50 mt-5 pt-4 border-t border-cloud/15">
                Decision in principle within 24 hours.
              </p>
            </article>
            <article className="bg-cloud border border-line rounded-[2px] p-8">
              <h3 className="font-serif-display text-2xl">Commercial PPA / Lease</h3>
              <p className="text-brass-dark font-semibold text-sm mt-1 tracking-wide">
                Zero capex options
              </p>
              <p className="text-graphite text-[15px] leading-relaxed mt-4">
                Power purchase agreements and operating leases for 30 kW+. Fixed per-kWh rate below
                grid, with buyout options from year 7.
              </p>
              <p className="text-[13px] text-graphite mt-5 pt-4 border-t border-line">
                Subject to covenant review.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Incentives */}
      <section id="incentives" className="bg-cloud scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Incentives"
              title="The Smart Export Guarantee, explained plainly."
              copy="Your system earns twice: once by displacing electricity you would have bought, once by selling the surplus."
            />
            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-graphite">
              <p>
                <strong className="text-onyx">What it is.</strong> Licensed electricity suppliers must
                offer an export tariff to small generators. You are paid per kWh you send to the grid.
                Rates currently range from around 3p to 15p depending on supplier and tariff.
              </p>
              <p>
                <strong className="text-onyx">What you need.</strong> An MCS-certified installation —
                which every one of ours is — plus an export-capable smart meter. We file the SEG
                application and DNO notification as part of handover.
              </p>
              <p>
                <strong className="text-onyx">What it is worth.</strong> A typical 8 kW home exporting
                40% of generation earns roughly £150–£350 a year on top of bill savings. Your proposal
                models both streams separately.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-ivory border border-line rounded-[2px] p-7">
              <h3 className="font-semibold">Two income streams, one system</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1.5">
                    <span>Avoided import</span>
                    <span>~70% of return</span>
                  </div>
                  <div className="h-2.5 bg-cloud border border-line rounded-[2px] overflow-hidden">
                    <div className="h-full bg-onyx" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1.5">
                    <span>SEG export payments</span>
                    <span>~30% of return</span>
                  </div>
                  <div className="h-2.5 bg-cloud border border-line rounded-[2px] overflow-hidden">
                    <div className="h-full bg-brass" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-onyx rounded-[2px] p-7">
              <p className="text-cloud/70 text-[14px] leading-relaxed">
                Commercial clients: capital allowances may apply to solar expenditure. We provide the
                documentation your accountant needs. This page is general information, not tax advice
                — confirm eligibility with your adviser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section id="maintenance" className="bg-cloud scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Maintenance"
            title="Service plans that assume responsibility."
            copy="Every install includes monitoring. Plans add scheduled servicing and guaranteed response."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <article className="border border-line rounded-[2px] p-8 bg-cloud">
              <h3 className="font-semibold tracking-wide">Monitor</h3>
              <p className="font-serif-display text-3xl mt-2">Included</p>
              <ul className="text-[14.5px] text-graphite space-y-2.5 mt-5">
                <li>— Remote monitoring for life</li>
                <li>— Annual health report</li>
                <li>— Fault alerts to our desk</li>
                <li>— Standard callout rates</li>
              </ul>
            </article>
            <article className="border-2 border-onyx rounded-[2px] p-8 bg-cloud relative">
              <span className="absolute -top-3 left-8 bg-onyx text-cloud text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-[2px]">
                Recommended
              </span>
              <h3 className="font-semibold tracking-wide">Maintain</h3>
              <p className="font-serif-display text-3xl mt-2">
                £18<span className="text-lg text-graphite">/mo</span>
              </p>
              <ul className="text-[14.5px] text-graphite space-y-2.5 mt-5">
                <li>— Everything in Monitor</li>
                <li>— Annual on-roof service + clean</li>
                <li>— Inverter firmware managed</li>
                <li>— Priority 5-day response</li>
              </ul>
              <button
                type="button"
                onClick={() =>
                  navigateToQuote({ plan: 'maintain', message: 'Interested in Maintain plan (£18/mo)' })
                }
                className="btn btn-onyx w-full mt-7 cursor-pointer"
              >
                Choose Maintain
              </button>
            </article>
            <article className="border border-line rounded-[2px] p-8 bg-cloud">
              <h3 className="font-semibold tracking-wide">
                Assure <span className="text-graphite font-normal">· commercial</span>
              </h3>
              <p className="font-serif-display text-3xl mt-2">Custom</p>
              <ul className="text-[14.5px] text-graphite space-y-2.5 mt-5">
                <li>— Everything in Maintain</li>
                <li>— Quarterly inspections</li>
                <li>— Performance guarantee</li>
                <li>— Same-week SLA, spare parts held</li>
              </ul>
              <button
                type="button"
                onClick={() =>
                  navigateToQuote({
                    plan: 'assure',
                    message: 'Interested in Assure commercial maintenance plan',
                  })
                }
                className="btn btn-ghost-dark w-full mt-7 cursor-pointer"
              >
                Talk to us
              </button>
            </article>
          </div>
          <div className="mt-10 bg-onyx rounded-[2px] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif-display text-cloud text-2xl">
                Existing system underperforming?
              </h3>
              <p className="text-cloud/70 text-[15px] mt-1.5">
                We take on systems installed by others. Health check from £149, deducted from any
                remedial work.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                navigateToQuote({ message: 'Requesting existing system health check (£149)' })
              }
              className="btn btn-brass shrink-0 cursor-pointer"
            >
              Book a health check
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <SectionHeading eyebrow="Questions" title="Service questions, answered." />
            <button
              type="button"
              onClick={navigateToFaq}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brass-dark mt-6 cursor-pointer hover:underline"
            >
              All 10 questions
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
          <div>
            <FaqAccordion limit={6} idPrefix="svc-faq" />
          </div>
        </div>
      </section>
    </div>
  );
};
