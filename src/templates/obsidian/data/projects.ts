import { Project } from '../types';

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    name: 'Detached family home',
    location: 'Guildford, Surrey',
    size: '8.8 kW · 20 × Obsidian 440 + Vault 13.5',
    duration: '2 days',
    output: '7,480 kWh/yr',
    billCut: '−82%',
    image: img('photo-1600596542815-ffad4c1539a9'),
    summary:
      'South-facing roof with partial afternoon shading. Panel-level optimisation recovered 11% yield the shading model flagged. Export on SEG covers the standing charge year-round.',
  },
  {
    name: 'Distribution warehouse',
    location: 'Dartford, Kent',
    size: '120 kW · Bifacial + 3-phase',
    duration: '3 weeks, phased',
    output: '102,000 kWh/yr',
    billCut: '−64% site',
    image: img('photo-1486406146926-c627a92ad1ab'),
    summary:
      'Installed nights and weekends with zero operational downtime. Board reporting integrated into existing BMS. Payback modelled at 4.1 years, tracking 3% ahead.',
  },
  {
    name: 'Victorian terrace',
    location: 'Brixton, London',
    size: '4.2 kW · Helios Architect',
    duration: '1 day',
    output: '3,570 kWh/yr',
    billCut: '−58%',
    image: img('photo-1600585154340-be6161a56a0c'),
    summary:
      'Conservation-area constraints met with full-black low-profile panels. Listed-adjacent consent handled by our team. Chosen for appearance as much as output.',
  },
  {
    name: 'Farmhouse + outbuildings',
    location: 'Petworth, Sussex',
    size: '12 kW + Vault 27 · off-grid capable',
    duration: '5 days',
    output: '10,200 kWh/yr',
    billCut: '−94%',
    image: img('photo-1509391366360-2e959784a276'),
    summary:
      'Barn roof array with dual batteries and automatic islanding. Rode out a 19-hour winter outage without the owners noticing until the neighbours called.',
  },
];
