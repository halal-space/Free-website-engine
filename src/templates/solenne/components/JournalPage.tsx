import React from 'react';
import { JOURNAL } from '../data/content';
import { PRODUCTS, formatPrice } from '../data/products';
import { useUIStore } from '../stores/uiStore';

export const JournalPage: React.FC = () => {
  const { navigateToProduct, showToast } = useUIStore();

  const featuredStory = JOURNAL[0];
  const gridStories = JOURNAL.slice(1);
  const iconProducts = PRODUCTS.filter((p) => p.badge === 'Best Seller').slice(0, 3);

  const handleReadStory = (title: string) => {
    showToast(`"${title}" opens in full editorial view.`);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="container-luxe pb-14 pt-14 text-center md:pb-20 md:pt-20">
        <p className="eyebrow mb-4 text-gold">The Journal</p>
        <h1 className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
          Stories worth
          <br />
          <span className="italic text-bronze">slowing down for.</span>
        </h1>
      </header>

      {/* Featured story */}
      {featuredStory && (
        <section className="container-luxe pb-16" aria-label="Featured story">
          <button
            type="button"
            onClick={() => handleReadStory(featuredStory.title)}
            className="img-skeleton group relative block overflow-hidden rounded-lg w-full text-left cursor-pointer"
          >
            <img
              src={featuredStory.image}
              alt={featuredStory.imageAlt}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-ivory md:p-14">
              <p className="eyebrow mb-3 text-champagne">
                Featured · {featuredStory.category} · {featuredStory.readTime}
              </p>
              <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.08]">
                {featuredStory.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70">
                {featuredStory.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 eyebrow text-champagne transition-colors group-hover:text-ivory">
                Read Story
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </div>
          </button>
        </section>
      )}

      {/* Article grid */}
      <section className="container-luxe grid gap-x-6 gap-y-14 pb-20 md:grid-cols-2 md:pb-28" aria-label="All stories">
        {gridStories.map((post) => (
          <article key={post.slug} className="group">
            <button
              type="button"
              onClick={() => handleReadStory(post.title)}
              className="block w-full text-left cursor-pointer"
            >
              <div className="img-skeleton aspect-[4/3] overflow-hidden rounded-md">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={1000}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-7 flex items-center gap-3 eyebrow text-stone">
                {post.category}
                <span className="h-px w-5 bg-line-strong" />
                {post.readTime}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-snug transition-colors duration-300 group-hover:text-bronze">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">{post.excerpt}</p>
              <p className="mt-5 eyebrow text-gold">{post.date}</p>
            </button>
          </article>
        ))}
      </section>

      {/* Reading ritual CTA */}
      <section className="bg-cream/60 py-20 md:py-24" aria-label="Shop the stories">
        <div className="container-editorial text-center">
          <p className="eyebrow mb-4 text-gold">From the Page</p>
          <h2 className="mx-auto max-w-xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight">
            Reading is believing.
            <br />
            Begin with the icons.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {iconProducts.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => navigateToProduct(p.slug)}
                className="group flex items-center gap-4 rounded-full border border-line bg-surface py-2 pl-2 pr-6 shadow-whisper transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft cursor-pointer"
              >
                <img
                  src={p.images[0]}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span className="text-left">
                  <span className="block font-serif text-base leading-tight group-hover:text-bronze">
                    {p.name}
                  </span>
                  <span className="text-xs text-stone">{formatPrice(p.price)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
