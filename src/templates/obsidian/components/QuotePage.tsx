import React, { useState, useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useCalculatorStore } from '../stores/calculatorStore';
import { serviceAreas } from '../data/site';

export const QuotePage: React.FC = () => {
  const { quotePrefill, navigateToProducts, showToast } = useUIStore();
  const submitQuote = useCalculatorStore((s) => s.submitQuote);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ptype, setPtype] = useState('Detached house');
  const [address, setAddress] = useState('');
  const [bill, setBill] = useState('£100 – £200');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (quotePrefill?.message) {
      setMessage(quotePrefill.message);
    }
  }, [quotePrefill]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(Math.max(1, Math.round(file.size / 1024)));
    }
  };

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
      email: email.trim(),
      ptype,
      address: address.trim(),
      bill,
      billFile: fileName,
      message: message.trim(),
    });
    setSubmittedRef(ref);
    showToast(`Quote request ${ref} submitted.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="bg-onyx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="eyebrow text-brass flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-brass" />
            Contact · Quote
          </p>
          <h1 className="font-serif-display text-cloud font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] mt-4 max-w-3xl">
            A fixed proposal in 48 hours. No sales calls.
          </h1>
          <p className="text-cloud/70 text-lg mt-4 max-w-xl">
            Complete the form. An engineer — not a salesperson — reviews your property and responds
            within one working day.
          </p>
        </div>
      </section>

      <section className="bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Form / Success Container */}
          <div className="bg-cloud border border-line rounded-[2px] p-7 md:p-10">
            {!submittedRef ? (
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="q-name" className="block text-[13px] font-semibold mb-1.5">
                    Full name *
                  </label>
                  <input
                    id="q-name"
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
                  <label htmlFor="q-phone" className="block text-[13px] font-semibold mb-1.5">
                    Phone *
                  </label>
                  <input
                    id="q-phone"
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
                <div>
                  <label htmlFor="q-email" className="block text-[13px] font-semibold mb-1.5">
                    Email
                  </label>
                  <input
                    id="q-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="q-type" className="block text-[13px] font-semibold mb-1.5">
                    Property type
                  </label>
                  <select
                    id="q-type"
                    name="ptype"
                    value={ptype}
                    onChange={(e) => setPtype(e.target.value)}
                    className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] focus:border-brass outline-none cursor-pointer"
                  >
                    <option>Detached house</option>
                    <option>Semi-detached</option>
                    <option>Terrace</option>
                    <option>Flat / Apartment</option>
                    <option>Commercial premises</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="q-address" className="block text-[13px] font-semibold mb-1.5">
                    Property address *
                  </label>
                  <input
                    id="q-address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    autoComplete="street-address"
                    placeholder="Street, city, postcode"
                    className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="q-bill" className="block text-[13px] font-semibold mb-1.5">
                    Monthly energy bill
                  </label>
                  <select
                    id="q-bill"
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
                <div>
                  <label htmlFor="q-billfile" className="block text-[13px] font-semibold mb-1.5">
                    Energy bill upload <span className="font-normal text-graphite">(optional)</span>
                  </label>
                  <input
                    id="q-billfile"
                    name="billfile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-[10px] text-sm text-graphite file:mr-3 file:bg-onyx file:text-cloud file:border-0 file:rounded-[2px] file:px-3 file:py-2 file:text-[13px] file:font-semibold file:cursor-pointer cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="q-msg" className="block text-[13px] font-semibold mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="q-msg"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Roof age, shading, EV plans, timelines, product of interest…"
                    className="w-full bg-cloud border border-line rounded-[2px] px-3.5 py-3 text-[15px] placeholder:text-graphite/40 focus:border-brass outline-none resize-y"
                  />
                </div>
                {fileName && (
                  <p id="q-file-note" className="sm:col-span-2 text-sm text-graphite">
                    Attached: {fileName} ({fileSize} KB) — sent with your request in production.
                  </p>
                )}
                {error && (
                  <p
                    id="q-error"
                    className="sm:col-span-2 text-sm font-medium text-red-800 bg-red-50 border border-red-200 rounded-[2px] px-4 py-3"
                  >
                    Please complete name, phone and address — all three are required for a survey.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-onyx sm:col-span-2 w-full !py-4 cursor-pointer"
                >
                  Submit Quote Request
                </button>
                <p className="sm:col-span-2 text-[13px] text-graphite leading-relaxed">
                  Fixed price valid 60 days. No obligation, no marketing lists. We respond within
                  one working day.
                </p>
              </form>
            ) : (
              <div id="q-success" className="text-center py-12">
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
                <h2 className="font-serif-display text-3xl mt-5">Request received.</h2>
                <p className="text-graphite text-[15px] mt-2 max-w-md mx-auto">
                  Reference <span id="q-ref" className="font-semibold text-onyx">{submittedRef}</span>. An
                  engineer will call within one working day. Your fixed proposal follows within 48
                  hours.
                </p>
                <button
                  type="button"
                  onClick={navigateToProducts}
                  className="btn btn-ghost-dark mt-7 cursor-pointer"
                >
                  Browse equipment meanwhile
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-onyx rounded-[2px] p-7">
              <h2 className="eyebrow text-brass">Direct</h2>
              <ul className="mt-4 space-y-4 text-[15px]">
                <li>
                  <a
                    href="tel:+442045771200"
                    className="text-cloud hover:text-brass transition-colors duration-200 cursor-pointer"
                  >
                    <span className="block text-[11px] tracking-[0.16em] uppercase text-cloud/50 font-semibold mb-0.5">
                      Phone · Mon–Fri 8–6
                    </span>
                    +44 20 4577 1200
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:quotes@obsidiansolar.example"
                    className="text-cloud hover:text-brass transition-colors duration-200 cursor-pointer"
                  >
                    <span className="block text-[11px] tracking-[0.16em] uppercase text-cloud/50 font-semibold mb-0.5">
                      Email
                    </span>
                    quotes@obsidiansolar.example
                  </a>
                </li>
                <li className="text-cloud">
                  <span className="block text-[11px] tracking-[0.16em] uppercase text-cloud/50 font-semibold mb-0.5">
                    Studio
                  </span>
                  14 Ironworks Lane
                  <br />
                  London EC2A 3BP
                </li>
              </ul>
            </div>
            <div className="bg-ivory border border-line rounded-[2px] p-7">
              <h2 className="eyebrow text-brass-dark">Service area</h2>
              <p className="text-[15px] text-graphite leading-relaxed mt-3">
                Greater London, Home Counties and the South East as standard. Commercial projects
                nationwide.
              </p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {serviceAreas.map((a) => (
                  <li
                    key={a}
                    className="text-[13px] font-medium bg-cloud border border-line rounded-[2px] px-3 py-1.5"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-[2px] overflow-hidden border border-line bg-cloud">
                <svg
                  viewBox="0 0 400 240"
                  className="w-full h-auto block"
                  role="img"
                  aria-label="Stylised service area map of South East England"
                >
                  <rect width="400" height="240" fill="#F5F3EF" />
                  <g fill="none" stroke="#E4DFD4" strokeWidth="1">
                    <line x1="0" y1="60" x2="400" y2="60" />
                    <line x1="0" y1="120" x2="400" y2="120" />
                    <line x1="0" y1="180" x2="400" y2="180" />
                    <line x1="100" y1="0" x2="100" y2="240" />
                    <line x1="200" y1="0" x2="200" y2="240" />
                    <line x1="300" y1="0" x2="300" y2="240" />
                  </g>
                  {/* Thames / coast stylised line */}
                  <path
                    d="M 120 120 Q 200 130 260 110 T 360 100"
                    fill="none"
                    stroke="#B8975A"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <circle cx="210" cy="115" r="5" fill="#0B0B0C" />
                  <text
                    x="218"
                    y="119"
                    fontFamily="Inter, sans-serif"
                    fontSize="11"
                    fontWeight="600"
                    fill="#0B0B0C"
                  >
                    London
                  </text>
                  <circle cx="160" cy="155" r="3.5" fill="#3A3A3C" />
                  <text
                    x="170"
                    y="159"
                    fontFamily="Inter, sans-serif"
                    fontSize="10"
                    fill="#3A3A3C"
                  >
                    Guildford
                  </text>
                  <circle cx="280" cy="140" r="3.5" fill="#3A3A3C" />
                  <text
                    x="290"
                    y="144"
                    fontFamily="Inter, sans-serif"
                    fontSize="10"
                    fill="#3A3A3C"
                  >
                    Dartford
                  </text>
                  <circle cx="180" cy="195" r="3.5" fill="#3A3A3C" />
                  <text
                    x="190"
                    y="199"
                    fontFamily="Inter, sans-serif"
                    fontSize="10"
                    fill="#3A3A3C"
                  >
                    Petworth
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
