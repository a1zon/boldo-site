"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Floating decorative shapes that drift slowly.
 * Pure CSS animations — no JS loop, minimal re-renders.
 */
export function FloatingShapes({ variant = "default" }) {
  const shapes = variant === "purple" ? [
    { size: 6, x: "10%", y: "20%", delay: 0, duration: 18, color: "bg-[--brand-500]/[0.07]" },
    { size: 4, x: "85%", y: "60%", delay: 2, duration: 22, color: "bg-[--brand-400]/[0.06]" },
    { size: 8, x: "70%", y: "10%", delay: 5, duration: 25, color: "bg-[--brand-600]/[0.04]" },
    { size: 3, x: "30%", y: "80%", delay: 8, duration: 20, color: "bg-[--brand-500]/[0.05]" },
  ] : [
    { size: 5, x: "5%", y: "30%", delay: 0, duration: 20, color: "bg-indigo-400/[0.06]" },
    { size: 7, x: "90%", y: "15%", delay: 3, duration: 24, color: "bg-violet-400/[0.05]" },
    { size: 4, x: "75%", y: "75%", delay: 6, duration: 18, color: "bg-blue-400/[0.06]" },
    { size: 6, x: "20%", y: "65%", delay: 1, duration: 22, color: "bg-purple-400/[0.04]" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${s.color} floating-shape`}
          style={{
            width: `${s.size}rem`,
            height: `${s.size}rem`,
            left: s.x,
            top: s.y,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  )
}

/**
 * Horizontal divider with animated gradient line.
 */
export function AnimatedDivider() {
  return (
    <div className="relative py-4">
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[--brand-500]/20 to-transparent animated-divider" />
      </div>
    </div>
  )
}

/**
 * Parallax-style counter row that slides in from left/right.
 */
export function StatsMarquee() {
  const stats = [
    "99.2% App Stability",
    "47 bugs found in sprint 1",
    "5000+ concurrent calls tested",
    "Zero critical bugs in production",
    "12 devices covered per project",
    "Sub-second response times",
    "3 regression cycles per release",
    "98.7% order accuracy",
  ]

  return (
    <div className="py-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[--page-bg] via-transparent to-[--page-bg] z-10 pointer-events-none" />
      <div className="stats-marquee-track flex gap-8 whitespace-nowrap">
        {[...stats, ...stats, ...stats].map((s, i) => (
          <span key={i} className="text-sm font-semibold text-[--brand-500]/40 tracking-wide uppercase flex-shrink-0">
            {s}
            <span className="mx-8 text-[--brand-500]/20">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
