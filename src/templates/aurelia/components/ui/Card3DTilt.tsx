'use client';

import React, { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { cn } from '../../lib/utils';

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function Card3DTilt({
  children,
  className,
  maxTilt = 8,
  scale = 1.015,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{
    transform: string;
    glarePos: { x: number; y: number; opacity: number };
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glarePos: { x: 50, y: 50, opacity: 0 },
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      glarePos: { x: glareX, y: glareY, opacity: 0.25 },
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glarePos: { x: 50, y: 50, opacity: 0 },
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative transition-transform duration-200 ease-out will-change-transform',
        className,
      )}
    >
      {children}

      {glare && (
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${style.glarePos.x}% ${style.glarePos.y}%, rgba(255, 255, 255, ${style.glarePos.opacity}) 0%, transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
        />
      )}
    </div>
  );
}
