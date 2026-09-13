import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/content';

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeTestimonial = TESTIMONIALS[current];

  return (
    <section className="container-editorial py-20 md:py-32" aria-labelledby="testimonials-title">
      <div
        className="mx-auto max-w-3xl text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <p className="eyebrow mb-10 flex items-center justify-center gap-4 text-gold">
          <span className="h-px w-10 bg-gold/60" />
          <span id="testimonials-title">Voices of the Maison</span>
          <span className="h-px w-10 bg-gold/60" />
        </p>

        <div className="relative min-h-[200px]" aria-roledescription="carousel" aria-label="Customer testimonials">
          <figure className="transition-opacity duration-700">
            {/* Stars */}
            <div className="flex justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={i < activeTestimonial.rating ? 'var(--color-gold, #8a6d47)' : 'var(--color-sand, #e2d7c5)'}
                  aria-hidden="true"
                >
                  <path d="M12 2.5 14.9 8.6l6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8L12 2.5z" />
                </svg>
              ))}
            </div>

            <blockquote className="mt-7">
              <p className="font-serif text-[clamp(1.55rem,3.4vw,2.35rem)] font-light leading-[1.28] text-espresso">
                “{activeTestimonial.quote}”
              </p>
            </blockquote>

            <figcaption className="mt-9">
              <p className="text-sm font-medium uppercase tracking-[0.18em]">
                {activeTestimonial.name}
              </p>
              <p className="mt-1.5 text-xs italic text-stone">
                Purchased · <span className="not-italic text-clay">{activeTestimonial.product}</span>
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Controls */}
        <div className="mt-11 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-smoke transition-all duration-300 hover:border-ink hover:text-ink cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M19 12H5m6 6-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  i === current ? 'w-8 bg-gold' : 'w-3 bg-line-strong hover:bg-stone'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-smoke transition-all duration-300 hover:border-ink hover:text-ink cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
