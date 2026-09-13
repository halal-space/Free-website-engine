import React from 'react';
import { SectionHeading } from './SectionHeading';
import { credentials, teamMembers } from '../data/site';
import { useUIStore } from '../stores/uiStore';

export const AboutPage: React.FC = () => {
  const { navigateToQuote, navigateToProjects } = useUIStore();

  return (
    <div>
      {/* Hero */}
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            About
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            An engineering firm that installs. Not a sales firm that subcontracts.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            Founded 2009 by two roofers and an electrical engineer. Still run by engineers. Still
            employing every installer.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Story" title="Built on roofs, kept in the office." />
            <div className="text-graphite text-[16px] leading-relaxed space-y-5 mt-6">
              <p>
                Obsidian began with commercial re-roofing. In 2009 clients started asking for
                panels on the roofs we had just finished. We trained, certified, and never looked
                back.
              </p>
              <p>
                Seventeen years later the model is unchanged: employed surveyors, employed
                installers, employed service engineers. We install roughly 400 systems a year —
                deliberately fewer than we could sell — because every system carries our 25-year
                workmanship warranty.
              </p>
              <p>
                We position as premium because the work is premium: structural calculations,
                panel-level shading models, output forecasts in writing. If a roof is wrong for
                solar, we say so and walk away. About one enquiry in six ends that way.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-9">
              <div className="bg-ivory border border-line rounded-[2px] p-5 text-center">
                <p className="font-serif-display text-3xl">17</p>
                <p className="text-[13px] text-graphite mt-1">Years</p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-5 text-center">
                <p className="font-serif-display text-3xl">34</p>
                <p className="text-[13px] text-graphite mt-1">Employees</p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-5 text-center">
                <p className="font-serif-display text-3xl">0</p>
                <p className="text-[13px] text-graphite mt-1">Subcontractors</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-[2px] overflow-hidden bg-ivory border border-line min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop"
              alt="Obsidian installation crew at work"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-ivory border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Credentials"
            title="Certified. Audited. Accountable."
            copy="Certification is the floor, not the ceiling. Every credential below is independently audited annually."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {credentials.map((c, i) => (
              <article key={c.t} className="bg-cloud border border-line rounded-[2px] p-7">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-[2px] bg-onyx text-brass">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </span>
                <h3 className="font-semibold text-lg mt-5">{c.t}</h3>
                <p className="text-graphite text-[14.5px] leading-relaxed mt-2">{c.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 bg-cloud border border-line rounded-[2px] p-7 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <p className="text-[15px] text-graphite leading-relaxed max-w-2xl">
              <strong className="text-onyx">Manufacturer certified:</strong> Obsidian, Helios and
              Voltaic accredited installer — warranty claims handled directly by us.{' '}
              <strong className="text-onyx">Insured:</strong> £10M public liability, employer&apos;s
              liability and professional indemnity. Certificates available before survey.
            </p>
            <button
              type="button"
              onClick={navigateToProjects}
              className="btn btn-ghost-dark shrink-0 cursor-pointer"
            >
              See the work
            </button>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Team"
            title="The people who sign your certificate."
            copy="A sample of the team. Full crew bios and crew assignment shared before install day."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
            {teamMembers.map((m) => (
              <article
                key={m.n}
                className="bg-cloud border border-line rounded-[2px] overflow-hidden hover:border-brass transition-colors duration-200"
              >
                <div className="aspect-[4/3] bg-ivory overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.n}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif-display text-xl">{m.n}</h3>
                  <p className="text-brass-dark text-[13px] font-semibold tracking-wide mt-1">
                    {m.r}
                  </p>
                  <p className="text-graphite text-[14.5px] mt-2.5 leading-relaxed">{m.d}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 bg-onyx rounded-[2px] p-8 md:p-12 text-center">
            <h3 className="font-serif-display text-cloud text-2xl md:text-3xl max-w-2xl mx-auto leading-snug">
              “Precision, engineering, long-term value. Energy independence, delivered quietly.”
            </h3>
            <p className="eyebrow text-brass mt-5 justify-center">Our mission</p>
            <button
              type="button"
              onClick={() => navigateToQuote()}
              className="btn btn-brass mt-7 cursor-pointer"
            >
              Work with us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
