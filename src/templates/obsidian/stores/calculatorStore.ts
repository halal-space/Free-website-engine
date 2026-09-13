import { create } from 'zustand';
import { CalculationResult, QuoteFormData } from '../types';

export function calculateSavings(bill: number, battery: boolean): CalculationResult {
  const IMPORT = 0.245;
  const YIELD = 850;
  const SEG = 0.07;
  const annualBill = bill * 12;
  const annualKwh = annualBill / IMPORT;

  // Size to ~70% offset, clamp 3–16 kW residential estimator range
  let kw = Math.min(16, Math.max(3, (annualKwh * 0.7) / YIELD));
  kw = Math.round(kw * 10) / 10;
  const gen = Math.round(kw * YIELD);
  const cost = Math.round(kw * 1050 + (battery ? 8900 : 0));
  const selfRate = battery ? 0.55 : 0.35;
  const yr1 = Math.round(gen * selfRate * IMPORT + gen * (1 - selfRate) * SEG);
  const payback = Math.round((cost / Math.max(yr1, 1)) * 10) / 10;
  const save25 = Math.max(0, yr1 * 25 - cost);

  return { kw, gen, cost, yr1, payback, save25 };
}

export interface QuoteSubmission {
  ref: string;
  data: QuoteFormData;
  timestamp: string;
}

interface CalculatorStoreState {
  bill: number;
  includeBattery: boolean;
  result: CalculationResult;
  lastQuoteSubmission: QuoteSubmission | null;

  setBill: (bill: number) => void;
  setIncludeBattery: (include: boolean) => void;
  submitQuote: (data: QuoteFormData) => string;
}

export const useCalculatorStore = create<CalculatorStoreState>((set) => ({
  bill: 165,
  includeBattery: true,
  result: calculateSavings(165, true),
  lastQuoteSubmission: null,

  setBill: (bill: number) => {
    const clamped = Math.min(2000, Math.max(30, bill || 165));
    set((state) => ({
      bill: clamped,
      result: calculateSavings(clamped, state.includeBattery),
    }));
  },

  setIncludeBattery: (includeBattery: boolean) => {
    set((state) => ({
      includeBattery,
      result: calculateSavings(state.bill, includeBattery),
    }));
  },

  submitQuote: (data: QuoteFormData) => {
    const ref = 'OS-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    set({
      lastQuoteSubmission: {
        ref,
        data,
        timestamp: new Date().toISOString(),
      },
    });
    return ref;
  },
}));
