import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div>
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Legal
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2rem,4vw,3.25rem)] mt-4">
            Quotation & warranty terms
          </h1>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 text-graphite text-[15.5px] leading-relaxed space-y-5">
          <p>
            <strong className="text-onyx">Fixed proposals.</strong> Surveyed quotes are fixed for 60
            days and include equipment, labour, scaffolding, permits, grid applications and
            commissioning. No estimate is ever presented as a quote.
          </p>
          <p>
            <strong className="text-onyx">Workmanship warranty.</strong> 25 years covering mounting,
            wiring, weatherproofing and roof integrity on our work. Manufacturer warranties (panels
            25–30 years, inverters and batteries 12–15 years) are registered in your name.
          </p>
          <p>
            <strong className="text-onyx">Deposits.</strong> No deposit to book a survey. A 20%
            deposit is due on accepting a proposal; the balance on commissioning and handover.
            Deposits are protected under the RECC consumer code.
          </p>
          <p>
            <strong className="text-onyx">Estimates on this site.</strong> The savings estimator gives
            indicative figures only and is not a quotation or financial advice. Binding figures
            appear solely in your surveyed proposal.
          </p>
          <p>
            <strong className="text-onyx">Incentives.</strong> SEG rates are set by suppliers and
            change over time. We file applications but cannot guarantee tariff levels. Confirm tax
            treatment with your own adviser.
          </p>
        </div>
      </section>
    </div>
  );
};
