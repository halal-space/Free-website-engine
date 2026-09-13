import React from 'react';
import { useCalculatorStore } from '../stores/calculatorStore';
import { useUIStore } from '../stores/uiStore';

export const SavingsCalculatorSection: React.FC = () => {
  const bill = useCalculatorStore((s) => s.bill);
  const includeBattery = useCalculatorStore((s) => s.includeBattery);
  const result = useCalculatorStore((s) => s.result);
  const setBill = useCalculatorStore((s) => s.setBill);
  const setIncludeBattery = useCalculatorStore((s) => s.setIncludeBattery);

  const navigateToQuote = useUIStore((s) => s.navigateToQuote);

  const fmt = (n: number) => n.toLocaleString('en-GB');

  return (
    <div id="savings" className="bg-onyx scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Input Form */}
        <div className="reveal">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" aria-hidden="true" />
            Savings estimator
          </p>
          <h2 className="font-serif-display text-cloud font-medium text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] mt-4">
            What could your roof be worth?
          </h2>
          <p className="text-cloud/70 text-[16px] leading-relaxed mt-4 max-w-md">
            Enter your monthly bill. Get an instant estimate of system size, cost, payback and 25-year
            savings. A surveyed fixed proposal follows.
          </p>
          <form
            id="calc-form"
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 space-y-5 max-w-md"
            noValidate
          >
            <div>
              <label
                htmlFor="calc-bill-input"
                className="block text-[13px] font-semibold text-cloud mb-1.5"
              >
                Average monthly electricity bill (£)
              </label>
              <input
                id="calc-bill-input"
                name="bill"
                type="number"
                min="30"
                max="2000"
                step="5"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                required
                inputMode="decimal"
                className="w-full bg-charcoal border border-line-dark rounded-[2px] px-4 py-3.5 text-lg text-cloud placeholder:text-cloud/30 focus:border-brass outline-none"
              />
            </div>
            <fieldset>
              <legend className="text-[13px] font-semibold text-cloud mb-2">
                Include battery storage?
              </legend>
              <div className="flex gap-2" role="radiogroup" aria-label="Include battery storage">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="battery"
                    value="no"
                    checked={!includeBattery}
                    onChange={() => setIncludeBattery(false)}
                    className="sr-only peer"
                  />
                  <span
                    className={`block text-center text-sm font-semibold border rounded-[2px] px-4 py-3 transition-colors duration-200 ${
                      !includeBattery
                        ? 'bg-brass text-onyx border-brass'
                        : 'border-line-dark text-cloud/70 hover:text-cloud'
                    }`}
                  >
                    Panels only
                  </span>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="battery"
                    value="yes"
                    checked={includeBattery}
                    onChange={() => setIncludeBattery(true)}
                    className="sr-only peer"
                  />
                  <span
                    className={`block text-center text-sm font-semibold border rounded-[2px] px-4 py-3 transition-colors duration-200 ${
                      includeBattery
                        ? 'bg-brass text-onyx border-brass'
                        : 'border-line-dark text-cloud/70 hover:text-cloud'
                    }`}
                  >
                    + Vault battery
                  </span>
                </label>
              </div>
            </fieldset>
            <p className="text-[12.5px] text-cloud/40 leading-relaxed">
              Estimate only, based on £0.245/kWh import, 850 kWh per kWp yield, SEG 7p/kWh. Not
              financial advice. Your surveyed proposal carries the binding figures.
            </p>
          </form>
        </div>

        {/* Right: Results Card */}
        <div
          className="reveal bg-cloud rounded-[2px] p-7 md:p-9"
          style={{ transitionDelay: '120ms' }}
          aria-live="polite"
          aria-atomic="true"
        >
          <div id="calc-results">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-ivory border border-line rounded-[2px] p-5">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  System size
                </p>
                <p className="font-serif-display text-3xl mt-1">
                  <span id="r-kw">{result.kw.toFixed(1)}</span>
                  <span className="text-lg"> kW</span>
                </p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-5">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  Est. cost
                </p>
                <p className="font-serif-display text-3xl mt-1">
                  £<span id="r-cost">{fmt(result.cost)}</span>
                </p>
              </div>
              <div className="bg-ivory border border-line rounded-[2px] p-5">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-graphite">
                  Payback
                </p>
                <p className="font-serif-display text-3xl mt-1">
                  <span id="r-payback">{result.payback.toFixed(1)}</span>
                  <span className="text-lg"> yrs</span>
                </p>
              </div>
              <div className="bg-onyx rounded-[2px] p-5">
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-brass">
                  25-yr savings
                </p>
                <p className="font-serif-display text-3xl mt-1 text-cloud">
                  £<span id="r-save">{fmt(result.save25)}</span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[13px] font-medium mb-2">
                <span>
                  Year 1 saving <strong id="r-yr1">£{fmt(result.yr1)}</strong>
                </span>
                <span className="text-graphite">
                  Annual generation <strong id="r-kwh">{fmt(result.gen)} kWh</strong>
                </span>
              </div>
              <div
                className="h-3 bg-ivory border border-line rounded-[2px] overflow-hidden"
                role="img"
                aria-label="Payback progress bar"
              >
                <div
                  id="r-bar-fill"
                  className="h-full bg-brass transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((result.payback / 25) * 100))}%` }}
                />
              </div>
              <p className="text-[13px] text-graphite mt-2">
                Payback in year{' '}
                <span id="r-payback2" className="font-semibold text-onyx">
                  {Math.ceil(result.payback)}
                </span>{' '}
                of a 25-year warranted life. Everything after is return.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                type="button"
                onClick={() => navigateToQuote()}
                className="btn btn-onyx flex-1 cursor-pointer"
              >
                Get My Fixed Proposal
              </button>
              <a href="tel:+442045771200" className="btn btn-ghost-dark cursor-pointer text-center">
                Call an engineer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
