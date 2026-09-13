import React from 'react';
import { SectionHeading } from './SectionHeading';
import { projects } from '../data/projects';
import { useUIStore } from '../stores/uiStore';

export const RecentProjectsSection: React.FC = () => {
  const navigateToProjects = useUIStore((s) => s.navigateToProjects);

  return (
    <section className="bg-cloud">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Recent installs"
            title="Real roofs. Metered results."
            copy="A sample of completed systems with verified first-year output. Full reference list on request."
          />
          <button
            type="button"
            onClick={navigateToProjects}
            className="reveal btn btn-ghost-dark shrink-0 cursor-pointer"
          >
            All projects
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {projects.slice(0, 2).map((p, i) => (
            <article
              key={p.name}
              className="reveal bg-cloud border border-line rounded-[2px] overflow-hidden hover:border-brass transition-colors duration-200"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[16/9] bg-ivory overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name}, ${p.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-brass-dark">
                  {p.location}
                </p>
                <h3 className="font-serif-display text-2xl mt-1.5">
                  {p.name} — {p.size.split('·')[0].trim()}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[14px]">
                  <span>
                    <strong className="font-serif-display text-lg">{p.output}</strong>{' '}
                    <span className="text-graphite">/ year</span>
                  </span>
                  <span>
                    <strong className="font-serif-display text-lg">{p.billCut}</strong>{' '}
                    <span className="text-graphite">bill</span>
                  </span>
                  <span>
                    <strong className="font-serif-display text-lg">{p.duration}</strong>{' '}
                    <span className="text-graphite">install</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
