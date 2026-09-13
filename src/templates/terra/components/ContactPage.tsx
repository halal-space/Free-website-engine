import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import Icon from './Icon';

export default function ContactPage() {
  const { setView } = useUIStore();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('An order');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !msg.trim()) {
      setError('Please complete your name, a valid email and a message.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[#6F7A72]">
        <button
          type="button"
          onClick={() => setView('home')}
          className="hover:text-[#1B241E] cursor-pointer"
        >
          Home
        </button>{' '}
        / <span className="font-medium text-[#1B241E]">Contact</span>
      </nav>

      <h1 className="font-display text-4xl font-semibold">Talk to a human</h1>
      <p className="mt-2 text-[15px] text-[#4A554D]">
        Questions about orders, allergens, wholesale or press — we reply within one business day.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="mailto:hello@terraandcru.shop"
          className="flex items-center gap-3 rounded-2xl border border-[#1B241E]/10 bg-white p-4 font-semibold hover:border-[#3B583E] transition-colors"
        >
          <Icon name="Mail" size={18} /> hello@terraandcru.shop
        </a>
        <a
          href="tel:+18005550194"
          className="flex items-center gap-3 rounded-2xl border border-[#1B241E]/10 bg-white p-4 font-semibold hover:border-[#3B583E] transition-colors"
        >
          <Icon name="Phone" size={18} /> +1 (800) 555-0194
        </a>
      </div>

      <div className="mt-4">
        {sent ? (
          <div
            className="rounded-2xl border border-[#3B583E]/30 bg-[#3B583E]/8 p-8 text-center"
            role="status"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3B583E] text-white">
              <Icon name="Check" size={22} />
            </span>
            <p className="font-display mt-3 text-2xl font-semibold">Message received.</p>
            <p className="mt-1 text-sm text-[#4A554D]">
              A human (usually Priya) replies within one business day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-[#1B241E]/10 bg-white p-5 sm:p-6"
            noValidate
          >
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[#C85A32]/40 bg-[#C85A32]/8 p-3 text-sm font-semibold text-[#A84624]"
              >
                {error}
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#1B241E]/15 px-4 py-3 text-[15px] outline-none focus:border-[#3B583E]"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#1B241E]/15 px-4 py-3 text-[15px] outline-none focus:border-[#3B583E]"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold">Topic</span>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-[#1B241E]/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-[#3B583E]"
              >
                <option>An order</option>
                <option>Subscriptions</option>
                <option>Allergens & ingredients</option>
                <option>Wholesale</option>
                <option>Press</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[13px] font-semibold">Message</span>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-[#1B241E]/15 px-4 py-3 text-[15px] outline-none focus:border-[#3B583E]"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-[#1B241E] py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#3B583E]"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
