'use client';

import React, { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setSizeGuideOpen } = useUIStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [activeTab, setActiveTab] = useState<'coats' | 'tailoring' | 'trousers' | 'dresses' | 'footwear'>('coats');

  if (!isSizeGuideOpen) return null;

  const tableData: Record<string, { size: string; fr: string; us: string; chest: [number, number]; waist: [number, number]; hip: [number, number] }[]> = {
    coats: [
      { size: 'XS', fr: '36 FR', us: '34 US', chest: [88, 34.6], waist: [70, 27.5], hip: [94, 37.0] },
      { size: 'S', fr: '38 FR', us: '36 US', chest: [92, 36.2], waist: [74, 29.1], hip: [98, 38.6] },
      { size: 'M', fr: '40 FR', us: '38 US', chest: [96, 37.8], waist: [78, 30.7], hip: [102, 40.2] },
      { size: 'L', fr: '42 FR', us: '40 US', chest: [102, 40.1], waist: [84, 33.0], hip: [108, 42.5] },
      { size: 'XL', fr: '44 FR', us: '42 US', chest: [108, 42.5], waist: [90, 35.4], hip: [114, 44.8] },
    ],
    tailoring: [
      { size: 'XXS', fr: '34 FR', us: '32 US', chest: [84, 33.0], waist: [66, 26.0], hip: [90, 35.4] },
      { size: 'XS', fr: '36 FR', us: '34 US', chest: [88, 34.6], waist: [70, 27.5], hip: [94, 37.0] },
      { size: 'S', fr: '38 FR', us: '36 US', chest: [92, 36.2], waist: [74, 29.1], hip: [98, 38.6] },
      { size: 'M', fr: '40 FR', us: '38 US', chest: [96, 37.8], waist: [78, 30.7], hip: [102, 40.2] },
      { size: 'L', fr: '42 FR', us: '40 US', chest: [102, 40.1], waist: [84, 33.0], hip: [108, 42.5] },
    ],
    trousers: [
      { size: '36 FR', fr: '36 FR', us: '28 US', chest: [0, 0], waist: [72, 28.3], hip: [96, 37.8] },
      { size: '38 FR', fr: '38 FR', us: '30 US', chest: [0, 0], waist: [76, 29.9], hip: [100, 39.4] },
      { size: '40 FR', fr: '40 FR', us: '32 US', chest: [0, 0], waist: [80, 31.5], hip: [104, 40.9] },
      { size: '42 FR', fr: '42 FR', us: '34 US', chest: [0, 0], waist: [86, 33.8], hip: [110, 43.3] },
    ],
    dresses: [
      { size: '34 FR', fr: '34 FR', us: '0-2 US', chest: [84, 33.0], waist: [64, 25.2], hip: [90, 35.4] },
      { size: '36 FR', fr: '36 FR', us: '4 US', chest: [88, 34.6], waist: [68, 26.8], hip: [94, 37.0] },
      { size: '38 FR', fr: '38 FR', us: '6 US', chest: [92, 36.2], waist: [72, 28.3], hip: [98, 38.6] },
      { size: '40 FR', fr: '40 FR', us: '8 US', chest: [96, 37.8], waist: [76, 29.9], hip: [102, 40.2] },
    ],
    footwear: [
      { size: '39 EU', fr: '39 IT/EU', us: '6.5 US', chest: [0, 0], waist: [25.5, 10.0], hip: [0, 0] },
      { size: '40 EU', fr: '40 IT/EU', us: '7.5 US', chest: [0, 0], waist: [26.2, 10.3], hip: [0, 0] },
      { size: '41 EU', fr: '41 IT/EU', us: '8.5 US', chest: [0, 0], waist: [27.0, 10.6], hip: [0, 0] },
      { size: '42 EU', fr: '42 IT/EU', us: '9.5 US', chest: [0, 0], waist: [27.8, 10.9], hip: [0, 0] },
      { size: '43 EU', fr: '43 IT/EU', us: '10.5 US', chest: [0, 0], waist: [28.5, 11.2], hip: [0, 0] },
    ]
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#0C0C0D] max-w-2xl w-full p-6 md:p-10 border border-[#D4CDC3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setSizeGuideOpen(false)}
          className="absolute top-6 right-6 text-[#71717A] hover:text-[#0C0C0D] transition-colors p-2 cursor-pointer"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs tracking-ultra-wide uppercase text-[#C5A880] mb-1">
          <Ruler className="w-4 h-4" />
          <span>Atelier Sizing Master</span>
        </div>
        <h3 className="text-2xl font-serif font-light mb-4">Precision Proportion Guide</h3>
        <p className="text-xs text-[#52525B] leading-relaxed mb-6">
          Atelier Vélène garments are engineered with architectural ease. Use body measurements taken flush against the skin with tape parallel to the floor.
        </p>

        {/* Units Switcher */}
        <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['coats', 'tailoring', 'trousers', 'dresses', 'footwear'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs tracking-wider uppercase px-3 py-1.5 transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0C0C0D] text-[#FAF8F5]'
                    : 'text-[#71717A] hover:text-[#0C0C0D] bg-[#F5F2EB]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border border-[#D4CDC3] p-0.5 rounded-none shrink-0 ml-2">
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono cursor-pointer transition-colors ${
                unit === 'cm' ? 'bg-[#0C0C0D] text-white' : 'text-[#71717A]'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 text-[10px] tracking-wider uppercase font-mono cursor-pointer transition-colors ${
                unit === 'in' ? 'bg-[#0C0C0D] text-white' : 'text-[#71717A]'
              }`}
            >
              IN
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#0C0C0D] text-[#0C0C0D] tracking-wider uppercase text-[10px]">
                <th className="py-2.5 pr-4 font-semibold">Atelier Size</th>
                <th className="py-2.5 px-4 font-semibold">FR Size</th>
                <th className="py-2.5 px-4 font-semibold">US/UK</th>
                {activeTab !== 'footwear' && activeTab !== 'trousers' && (
                  <th className="py-2.5 px-4 font-semibold">Bust / Chest</th>
                )}
                <th className="py-2.5 px-4 font-semibold">
                  {activeTab === 'footwear' ? 'Foot Length' : 'Waist'}
                </th>
                {activeTab !== 'footwear' && (
                  <th className="py-2.5 pl-4 font-semibold">Hips</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3DA]">
              {tableData[activeTab].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F5F2EB] transition-colors">
                  <td className="py-3 pr-4 font-medium text-[#0C0C0D]">{row.size}</td>
                  <td className="py-3 px-4 text-[#52525B]">{row.fr}</td>
                  <td className="py-3 px-4 text-[#52525B]">{row.us}</td>
                  {activeTab !== 'footwear' && activeTab !== 'trousers' && (
                    <td className="py-3 px-4 font-mono text-[#0C0C0D]">
                      {unit === 'cm' ? `${row.chest[0]} cm` : `${row.chest[1]} in`}
                    </td>
                  )}
                  <td className="py-3 px-4 font-mono text-[#0C0C0D]">
                    {unit === 'cm' ? `${row.waist[0]} cm` : `${row.waist[1]} in`}
                  </td>
                  {activeTab !== 'footwear' && (
                    <td className="py-3 pl-4 font-mono text-[#0C0C0D]">
                      {unit === 'cm' ? `${row.hip[0]} cm` : `${row.hip[1]} in`}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bespoke Tailoring Consultation note */}
        <div className="mt-8 p-4 bg-[#F5F2EB] border border-[#E8E3DA] flex items-start gap-3">
          <Check className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
          <div className="text-xs text-[#52525B] leading-relaxed">
            <span className="font-semibold text-[#0C0C0D]">Complimentary Master Tailoring:</span> All Atelier Vélène pieces include complimentary hem finishing and sleeve adjustment at any global flagship salon or via prepaid insured courier.
          </div>
        </div>
      </div>
    </div>
  );
};
