import { Testimonial, ProcessStep } from '../types';

export const testimonials: Testimonial[] = [
  {
    quote:
      'The install took two days. No mess, no follow-up visits, no surprises on the bill. The system has produced exactly what they modelled.',
    name: 'Marcus Whitfield',
    detail: 'Homeowner, 8.8 kW + Vault 13.5',
    system: 'Residential',
  },
  {
    quote:
      'We tendered three firms. Obsidian were the only ones who surveyed the roof properly and put output figures in writing. Two years on, they were right.',
    name: 'Elena Marsh',
    detail: 'Operations Director, 120 kW commercial',
    system: 'Commercial',
  },
  {
    quote:
      'Support answers within the hour. They spotted an inverter fault before we noticed anything and fixed it the same week. That is what we paid for.',
    name: 'David Okafor',
    detail: 'Homeowner, 6.2 kW + Charge 22',
    system: 'Service',
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Consultation',
    description:
      'Site survey and load analysis. We review 12 months of bills, roof structure and shading. Fixed proposal, no estimates.',
  },
  {
    index: '02',
    title: 'Design',
    description:
      'Engineered layout with panel-level modelling. Output forecast in writing. Permits and grid application handled.',
  },
  {
    index: '03',
    title: 'Install',
    description:
      'Certified in-house crews. Most homes in 1–3 days. Commercial phased to avoid downtime. Commissioned and tested.',
  },
  {
    index: '04',
    title: 'Monitor',
    description:
      'Remote monitoring for life. We flag underperformance before you notice. Annual service and 25-year workmanship cover.',
  },
];

export const credentials = [
  {
    t: 'MCS Certified',
    d: 'Microgeneration Certification Scheme. Required for export tariffs. Audited yearly.',
  },
  {
    t: 'NICEIC Approved',
    d: 'Approved electrical contractor. Every install signed off by a qualifying supervisor.',
  },
  {
    t: 'RECC Member',
    d: 'Renewable Energy Consumer Code. Deposit protection and independent dispute resolution.',
  },
  {
    t: 'TrustMark',
    d: 'Government-endorsed quality scheme for work in and around the home.',
  },
];

export const teamMembers = [
  {
    n: 'James Reid',
    r: 'Founder · Technical Director',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    d: 'Ex-roofer, CEng MIStructE. Signs every commercial design.',
  },
  {
    n: 'Priya Nair',
    r: 'Head of Service',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    d: 'Runs monitoring and the 5-day response SLA. 11 years in renewables.',
  },
  {
    n: 'Tom Ellery',
    r: 'Lead Surveyor',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    d: '2,000+ surveys. The person who tells you if solar is wrong for you.',
  },
];

export const serviceAreas = [
  'London',
  'Surrey',
  'Kent',
  'Essex',
  'Herts',
  'Berks',
  'Bucks',
  'Sussex',
];
