import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div>
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Legal
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2rem,4vw,3.25rem)] mt-4">
            Privacy notice
          </h1>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 text-graphite text-[15.5px] leading-relaxed space-y-5">
          <p>
            We collect only what a survey requires: your name, contact details, property address and
            energy usage. Bill photos you upload are used solely to size your system.
          </p>
          <p>
            We never sell data or add you to marketing lists. The newsletter is opt-in only, one email
            per quarter, with one-click unsubscribe.
          </p>
          <p>
            Monitoring data from installed systems is used for fault detection and annual reports. It
            is never shared with third parties except where required for warranty claims, with your
            consent.
          </p>
          <p>
            You may request a copy or deletion of your data at any time:{' '}
            <a
              href="mailto:quotes@obsidiansolar.example"
              className="font-semibold text-brass-dark cursor-pointer hover:underline"
            >
              quotes@obsidiansolar.example
            </a>
            . We respond within 30 days.
          </p>
          <p className="text-[13.5px]">
            Last updated January 2026. This is a summary; full GDPR documentation is available on
            request.
          </p>
        </div>
      </section>
    </div>
  );
};
