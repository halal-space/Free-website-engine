import React from 'react';
import { SectionHeading } from './SectionHeading';
import { processSteps } from '../data/site';
import { useUIStore } from '../stores/uiStore';

export const ProcessStepper: React.FC = () => {
  const navigateToServices = useUIStore((s) => s.navigateToServices);

  return (
    <section className="bg-cloud">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionHeading
          eyebrow="Process"
          title="Consultation to monitoring. Four steps."
          align="center"
        />
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-14 border-t border-line">
          {processSteps.map((s, i) => (
            <li
              key={s.index}
              className="reveal relative pt-8 md:px-8 md:first:pl-0 md:last:pr-0 pb-4"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="absolute top-[-2px] left-0 w-12 h-[3px] bg-brass"
                aria-hidden="true"
              />
              <p className="font-serif-display text-brass text-lg">{s.index}</p>
              <h3 className="font-semibold text-lg mt-2">{s.title}</h3>
              <p className="text-graphite text-[14.5px] leading-relaxed mt-2">{s.description}</p>
            </li>
          ))}
        </ol>
        <div className="reveal text-center mt-10">
          <button
            type="button"
            onClick={() => navigateToServices()}
            className="btn btn-onyx cursor-pointer"
          >
            See the full process
          </button>
        </div>
      </div>
    </section>
  );
};
