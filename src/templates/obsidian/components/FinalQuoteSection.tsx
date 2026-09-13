import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCalculatorStore } from '../stores/calculatorStore';

export const FinalQuoteSection: React.FC = () => {
  const navigateToQuote = useUIStore((s) => s.navigateToQuote);
  const showToast = useUIStore((s) => s.showToast);
  const submitQuote = useCalculatorStore((s) => s.submitQuote);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bill, setBill] = useState('£100 – £200');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const ref = submitQuote({
      name: name.trim(),
      phone: phone.trim(),
      email: '',
      ptype: 'Residential',
      address: address.trim(),
      bill,
      message: message.trim(),
    });
    setSubmitted(true);
    showToast(`Quote request ${ref} submitted successfully.`);
  };

  return (
    <section className="bg-onyx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="reveal">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Free quote
          </p>
          <h2 className="font-serif-display text-cloud font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] mt-4">
            Know your number within 48 hours.
          </h2>
          <p className="text-cloud/70 text-[16px] leading-relaxed mt-4 max-w-md">
            Send your address and a recent bill. We return a surveyed, fixed proposal — output forecast
            included. No obligation.
          </p>
          <ul className="mt-8 space-y-4 text-cloud/80 text-[15px]">
            <li className="flex gap-3">
              <span className="text-brass font-semibold">—</span> Fixed price, in writing, valid 60
              days
            </li>
            <li className="flex gap-3">
              <span className="text-brass font-semibold">—</span> Output forecast with shading model
            </li>
            <li className="flex gap-3">
              <span className="text-brass font-semibold">—</span> Survey by employed engineers, never
              sales reps
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-6 mt-9 text-cloud">
            <a
              href="tel:+442045771200"
              className="text-[15px] hover:text-brass transition-colors duration-200 cursor-pointer"
            >
              <span className="block text-[11px] tracking-[0.18em] uppercase text-cloud/50 font-semibold mb-1">
                Phone
              </span>
              +44 20 4577 1200
            </a>
            <a
              href="mailto:quotes@obsidiansolar.example"
              className="text-[15px] hover:text-brass transition-colors duration-200 cursor-pointer"
            >
              <span className="block text-[11px] tracking-[0.18em] uppercase text-cloud/50 font-semibold mb-1">
                Email
              </span>
              quotes@obsidiansolar.example
            </a>
          </div>
        </div>

        <div className="reveal bg-cloud rounded-[2px] p-7 md:p-9" style={{ transitionDelay: '120ms' }}>
          {!submitted ? (
            <form id="home-quote" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
              <div>
                <label htmlFor="hq-name" className="block text-[13px] font-semibold mb-1.5">
                  Full name
                </label>
                <input
                  id="hq-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Jordan Ellis"
                  className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none"
                />
              </div>
              <div>
                <label htmlFor="hq-phone" className="block text-[13px] font-semibold mb-1.5">
                  Phone
                </label>
                <input
                  id="hq-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  placeholder="+44 7700 900000"
                  className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="hq-address" className="block text-[13px] font-semibold mb-1.5">
                  Property address
                </label>
                <input
                  id="hq-address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  autoComplete="street-address"
                  placeholder="Street, city, postcode"
                  className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="hq-bill" className="block text-[13px] font-semibold mb-1.5">
                  Monthly energy bill
                </label>
                <select
                  id="hq-bill"
                  name="bill"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] focus:border-brass outline-none cursor-pointer"
                >
                  <option>Under £100</option>
                  <option>£100 – £200</option>
                  <option>£200 – £350</option>
                  <option>Over £350</option>
                  <option>Commercial — varies</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="hq-msg" className="block text-[13px] font-semibold mb-1.5">
                  Anything we should know
                </label>
                <textarea
                  id="hq-msg"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Roof age, shading, EV plans, timelines…"
                  className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none resize-y"
                />
              </div>
              {error && (
                <p id="hq-error" className="sm:col-span-2 text-sm font-medium text-red-800">
                  Please add your name, phone and address so we can survey the property.
                </p>
              )}
              <button
                type="submit"
                className="btn btn-onyx sm:col-span-2 w-full cursor-pointer text-center"
              >
                Request My Free Quote
              </button>
              <p className="sm:col-span-2 text-[13px] text-graphite leading-relaxed">
                By submitting you agree to be contacted about your enquiry. No marketing lists. Prefer
                email?{' '}
                <button
                  type="button"
                  onClick={() => navigateToQuote()}
                  className="font-semibold text-brass-dark underline underline-offset-2 cursor-pointer"
                >
                  Open the full quote form
                </button>
                .
              </p>
            </form>
          ) : (
            <div id="hq-success" className="text-center py-10">
              <span className="inline-flex w-14 h-14 items-center justify-center rounded-[2px] bg-onyx text-brass mx-auto">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <h3 className="font-serif-display text-2xl mt-5">Request received.</h3>
              <p className="text-graphite text-[15px] mt-2 max-w-sm mx-auto">
                An engineer will review your property on satellite imagery and call within one
                working day.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
