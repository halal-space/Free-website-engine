import React from 'react';
import { TastingAxis } from '../types';

export default function FlavorRadar({ axes }: { axes: TastingAxis[] }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const R = 88;
  const n = axes.length || 5;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, v: number) => {
    const r = (R * v) / 100;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))] as const;
  };

  const rings = [25, 50, 75, 100];
  const poly = axes.map((a, i) => pt(i, a.value).join(',')).join(' ');

  return (
    <figure>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto w-full max-w-[260px]"
        role="img"
        aria-label={`Flavor profile: ${axes.map((a) => `${a.label} ${a.value}`).join(', ')}`}
      >
        {rings.map((r) => (
          <polygon
            key={r}
            points={axes.map((_, i) => pt(i, r).join(',')).join(' ')}
            fill="none"
            stroke="#1B241E"
            strokeOpacity={r === 100 ? 0.25 : 0.1}
          />
        ))}
        {axes.map((_, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={pt(i, 100)[0]}
            y2={pt(i, 100)[1]}
            stroke="#1B241E"
            strokeOpacity={0.1}
          />
        ))}
        <polygon
          points={poly}
          fill="var(--color-terracotta, #C85A32)"
          fillOpacity={0.22}
          stroke="var(--color-terracotta, #C85A32)"
          strokeWidth={2}
        />
        {axes.map((a, i) => {
          const [x, y] = pt(i, a.value);
          const [lx, ly] = pt(i, 118);
          return (
            <g key={a.label}>
              <circle cx={x} cy={y} r={3.5} fill="#1B241E" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={700}
                fill="#1B241E"
              >
                {a.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">
        <table>
          <tbody>
            {axes.map((a) => (
              <tr key={a.label}>
                <th>{a.label}</th>
                <td>{a.value}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
      <ul className="mt-2 flex flex-wrap justify-center gap-1.5 sm:hidden">
        {axes.map((a) => (
          <li
            key={a.label}
            className="tnum rounded-full bg-[#F2EFE9] px-2.5 py-1 text-[11px] font-semibold"
          >
            {a.label} {a.value}
          </li>
        ))}
      </ul>
    </figure>
  );
}
