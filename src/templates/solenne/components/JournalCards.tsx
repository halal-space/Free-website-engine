import React from 'react';
import { JOURNAL } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { useUIStore } from '../stores/uiStore';

export const JournalCards: React.FC = () => {
  const { navigateToJournal } = useUIStore();

  return (
    <section className="container-luxe py-20 md:py-28" aria-labelledby="journal-title">
      <SectionHeading
        id="journal-title"
        eyebrow="The Journal"
        title="Beauty stories & skin science"
        link={{
          label: 'All Stories',
          onClick: () => navigateToJournal(),
        }}
      />

      <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
        {JOURNAL.map((post) => (
          <button
            key={post.slug}
            type="button"
            onClick={() => navigateToJournal()}
            className="group block text-left cursor-pointer w-full"
          >
            <div className="img-skeleton aspect-[4/3] overflow-hidden rounded-md">
              <img
                src={post.image}
                alt={post.imageAlt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-6 flex items-center gap-3 eyebrow text-stone">
              {post.category}
              <span className="h-px w-5 bg-line-strong" />
              {post.readTime}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-snug transition-colors duration-300 group-hover:text-bronze">
              {post.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-smoke">
              {post.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 eyebrow text-gold transition-colors group-hover:text-ink">
              Read Story
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
