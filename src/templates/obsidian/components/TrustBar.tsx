import React from 'react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-ivory border-b border-line" aria-label="Credentials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="reveal">
            <p className="font-serif-display text-3xl md:text-4xl text-onyx">17</p>
            <p className="text-sm text-graphite mt-1.5 leading-snug">
              Years in business
              <br />
              <span className="text-graphite/60">MCS certified since 2009</span>
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '80ms' }}>
            <p className="font-serif-display text-3xl md:text-4xl text-onyx">4,200+</p>
            <p className="text-sm text-graphite mt-1.5 leading-snug">
              Panels installed
              <br />
              <span className="text-graphite/60">Residential + commercial</span>
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '160ms' }}>
            <p className="font-serif-display text-3xl md:text-4xl text-onyx">
              25<span className="text-xl">yr</span>
            </p>
            <p className="text-sm text-graphite mt-1.5 leading-snug">
              Workmanship warranty
              <br />
              <span className="text-graphite/60">Backed in writing</span>
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '240ms' }}>
            <p className="font-serif-display text-3xl md:text-4xl text-onyx">NICEIC</p>
            <p className="text-sm text-graphite mt-1.5 leading-snug">
              Approved contractor
              <br />
              <span className="text-graphite/60">RECC consumer code</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
