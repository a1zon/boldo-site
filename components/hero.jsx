"use client"

import * as React from "react"

import { Button } from "@/components/ui/button" 

export function Hero() {
  return (
    <div className="relative z-10 w-full px-4">
      <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-black/40 shadow-[0_15px_60px_-30px_rgba(255,255,255,0.1)] backdrop-blur-xl border border-white/10">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-black/30 to-black/20" />
          <div className="relative px-6 py-10 md:px-10 md:py-14 space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-medium text-white/70 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Available for new projects</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white">
              Boldo — <span className="font-normal">QA Agency</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Reliable manual testing for video SaaS and social shopping projects.
            </p>
            <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
              We help startups and businesses launch products smoothly and with maximum efficiency.
            </p>

            {/* Interactive chips */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                "Manual QA",
                "Video SaaS",
                "Social shopping",
                "Stability",
                "Usability",
                "Performance",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="font-normal shadow-sm hover:-translate-y-0.5 transition bg-[#020617] text-white hover:bg-black"
              >
                Записаться на разбор
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-normal shadow-sm hover:-translate-y-0.5 transition border-white/20 bg-black/40 text-white/85 hover:bg-black"
              >
                Посмотреть примеры
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
