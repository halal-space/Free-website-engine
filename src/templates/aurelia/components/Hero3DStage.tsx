'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layers, Eye, RotateCw, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const COLOR_OPTIONS = [
  { id: 'obsidian', name: 'Obsidian Black', hex: '#0b0b0d', bgClass: 'bg-[#0b0b0d]', border: 'border-white/30' },
  { id: 'silver', name: 'Titanium Silver', hex: '#c9cbd1', bgClass: 'bg-[#c9cbd1]', border: 'border-white/50' },
  { id: 'royal', name: 'Royal Blue', hex: '#1e3a8a', bgClass: 'bg-[#1e3a8a]', border: 'border-blue-400' },
];

export function Hero3DStage() {
  const [activeColor, setActiveColor] = useState(COLOR_OPTIONS[0]);
  const [isExploded, setIsExploded] = useState(false);
  const [isXRay, setIsXRay] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: 10, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 10, rotY: -20 });

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({ ...prev, y: (prev.y + 0.4) % 360 }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setRotation({
      x: Math.max(-45, Math.min(45, dragStartRef.current.rotX - deltaY * 0.4)),
      y: dragStartRef.current.rotY + deltaX * 0.5,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />

      {/* 3D Canvas Stage Container */}
      <div
        className="relative h-[480px] w-full overflow-hidden rounded-panel border border-white/10 bg-surface-3/30 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)] backdrop-blur-md sm:h-[560px] lg:h-[620px] touch-none cursor-grab active:cursor-grabbing flex flex-col justify-between"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Top Floating Badges */}
        <div className="pointer-events-none z-20 flex items-center justify-between px-5 pt-5">
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-obsidian/70 px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-widest text-accent backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            3D Studio
          </span>
          <span className="text-[11px] font-medium text-white/50 backdrop-blur-xs">
            Drag to rotate 360°
          </span>
        </div>

        {/* Floating Quick Action HUD */}
        <div className="absolute right-4 top-16 z-20 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExploded(!isExploded);
            }}
            title="Toggle Exploded View"
            aria-label="Toggle Exploded View"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-btn border transition-all backdrop-blur-md cursor-pointer',
              isExploded
                ? 'border-accent bg-accent/20 text-accent shadow-sm ring-1 ring-accent'
                : 'border-white/10 bg-obsidian/60 text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            <Layers className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsXRay(!isXRay);
            }}
            title="Toggle X-Ray Wireframe"
            aria-label="Toggle X-Ray Wireframe"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-btn border transition-all backdrop-blur-md cursor-pointer',
              isXRay
                ? 'border-accent bg-accent/20 text-accent shadow-sm ring-1 ring-accent'
                : 'border-white/10 bg-obsidian/60 text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate(!autoRotate);
            }}
            title="Toggle Auto Rotation"
            aria-label="Toggle Auto Rotation"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-btn border transition-all backdrop-blur-md cursor-pointer',
              autoRotate
                ? 'border-accent bg-accent/20 text-accent shadow-sm ring-1 ring-accent'
                : 'border-white/10 bg-obsidian/60 text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* 3D Visual Viewport */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1200px]">
          {/* Subtle studio floor lighting */}
          <div className="absolute bottom-16 h-24 w-72 rounded-full bg-accent/15 blur-2xl transform rotate-X-60" />

          {/* Phone 3D Assembly */}
          <div
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="relative w-[210px] h-[400px] sm:w-[230px] sm:h-[440px] flex items-center justify-center"
          >
            {/* Layer 1: Back Plate with Camera Island */}
            <div
              style={{
                backgroundColor: activeColor.hex,
                transform: `translateZ(${isExploded ? '-70px' : '-8px'})`,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                borderColor: isXRay ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              }}
              className={cn(
                'absolute inset-0 rounded-[38px] border-[2px] shadow-2xl p-4 flex flex-col justify-between',
                isXRay ? 'bg-transparent border-dashed backdrop-blur-sm' : '',
              )}
            >
              {/* Camera Island */}
              <div
                style={{
                  transform: `translateZ(${isExploded ? '-30px' : '4px'})`,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={cn(
                  'w-24 h-24 rounded-[24px] bg-black/80 border border-white/20 p-2.5 grid grid-cols-2 gap-2 shadow-lg',
                  isXRay ? 'border-accent bg-accent/10' : '',
                )}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/30 bg-black/90 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent/60 animate-pulse" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white/30 bg-black/90 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400/70" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white/30 bg-black/90 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[7px] font-mono uppercase text-white/50">100X</span>
                </div>
              </div>
              <div className="flex items-center justify-center pb-2">
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">AURELIA</span>
              </div>
            </div>

            {/* Layer 2: A18 Neural Core & Battery (Visible in Exploded/X-ray mode) */}
            <div
              style={{
                transform: `translateZ(${isExploded ? '0px' : '-2px'}) scale(${isExploded ? 0.95 : 0.9})`,
                opacity: isExploded || isXRay ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="absolute inset-4 rounded-[30px] border border-accent/60 bg-obsidian/90 p-4 flex flex-col justify-between"
            >
              <div className="h-28 rounded-xl border border-accent/40 bg-accent/10 p-3 flex flex-col items-center justify-center text-center">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="mt-1 text-[10px] font-mono font-bold text-accent">A18 PRO NEURAL</span>
                <span className="text-[8px] font-mono text-white/60">3.4GHz 3nm 40-Core</span>
              </div>
              <div className="h-36 rounded-xl border border-white/20 bg-white/5 p-3 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-white/50">5,400 mAh Battery</span>
                <span className="text-[8px] font-mono text-emerald-400">Silicon-Carbon Cell</span>
              </div>
            </div>

            {/* Layer 3: Grade-5 Titanium Chassis Outer Band */}
            <div
              style={{
                transform: `translateZ(${isExploded ? '40px' : '0px'})`,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                borderColor: isXRay ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              }}
              className="absolute inset-0 rounded-[38px] border-[5px] pointer-events-none shadow-inner"
            />

            {/* Layer 4: 6.8" LTPO Display Screen */}
            <div
              style={{
                transform: `translateZ(${isExploded ? '85px' : '8px'})`,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                borderColor: isXRay ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
              }}
              className={cn(
                'absolute inset-0 rounded-[38px] overflow-hidden border-[2px] shadow-2xl bg-black',
                isXRay ? 'opacity-40 border-dashed' : '',
              )}
            >
              {/* Dynamic Wallpaper Screen */}
              <div className="relative h-full w-full bg-gradient-to-br from-[#0a0f1d] via-[#111827] to-[#030712] p-4 flex flex-col justify-between">
                {/* Dynamic Island / Punch Hole */}
                <div className="flex justify-between items-center pt-1 px-2">
                  <span className="text-[10px] font-medium text-white/80 font-mono">09:41</span>
                  <div className="h-4 w-16 rounded-full bg-black border border-white/20 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-mono text-white/70">5G</span>
                    <div className="h-2 w-3.5 border border-white/70 rounded-xs flex items-center p-0.5">
                      <div className="h-full w-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Lockscreen Widget / Visual */}
                <div className="my-auto text-center space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-mono font-medium">AURELIA OS 26</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Nova X Pro</p>
                  <p className="text-[11px] text-white/60">3,000 Nits LTPO Pro</p>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-center pb-1">
                  <div className="h-1 w-24 rounded-full bg-white/40" />
                </div>

                {/* Glass reflections */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Glass Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-gradient-to-t from-obsidian/95 via-obsidian/85 to-transparent p-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">Flagship Series</p>
            <p className="font-display text-lg font-semibold text-white">Nova X Pro</p>
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-surface-2/60 p-1.5 backdrop-blur-md">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(c);
                }}
                aria-label={`Select ${c.name}`}
                title={c.name}
                className={cn(
                  'h-6 w-6 rounded-full border transition-all cursor-pointer',
                  c.bgClass,
                  activeColor.id === c.id
                    ? 'border-white scale-110 ring-2 ring-accent'
                    : 'border-white/20 opacity-70 hover:opacity-100',
                )}
              />
            ))}
          </div>

          <span className="rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
            From $1,299
          </span>
        </div>
      </div>
    </div>
  );
}
