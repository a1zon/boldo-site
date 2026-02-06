"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Marquee } from "@/components/marquee"

const marqueeItems = [
  "Up to 40% budget savings compared to in-house hiring.",
  "We work with projects of any scale — from MVP to enterprise.",
  "Long-term partnership and single point of contact.",
  "Reliable ROI: fewer bugs → higher retention and conversion.",
]

export function HeroPresentation() {
  return (
    <section className="relative w-full overflow-hidden bg-[--page-bg]">
      {/* soft blobs like the presentation */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.55),rgba(99,102,241,0)_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-[260px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(124,58,237,0.45),rgba(124,58,237,0)_70%)]" />

      <div className="container mx-auto max-w-7xl px-6 py-10 md:py-14 relative">
        <div className="rounded-3xl border border-black/10 bg-white/80 shadow-[0_35px_90px_-55px_rgba(2,6,23,0.35)] backdrop-blur-xl overflow-hidden">
          {/* top bar (replaces header) */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-5 md:px-10 border-b border-black/5">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-base font-semibold tracking-tight text-black">
                BOLDO
              </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
                {[
                  { href: "#services", label: "Services" },
                  { href: "#cases", label: "Cases" },
                  { href: "#contact", label: "Contacts" },
                ].map((x) => (
                  <a
                    key={x.href}
                    href={x.href}
                    className="rounded-full border border-black/10 bg-white/70 px-5 py-2 font-medium text-black/70 transition hover:bg-white hover:text-black whitespace-nowrap"
                  >
                    {x.label}
                  </a>
                ))}
              </nav>
            </div>


          </div>

          {/* hero */}
          <div className="grid gap-10 lg:grid-cols-2 px-6 py-10 md:px-10 md:py-14">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
                Boldo — QA Agency
              </h1>
              <p className="mt-5 text-2xl md:text-3xl font-semibold leading-tight text-black/90">
                Reliable manual testing for video-SaaS and social commerce.
              </p>

              <p className="mt-10 text-center lg:text-left text-2xl md:text-3xl font-semibold text-black/90">
                Helping  launch stable products with{" "}
                <span className="text-[--brand-600]">maximum ROI.</span>
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <Button
                  asChild
                  className="h-12 px-6 rounded-full bg-[#8b5cf6] text-white font-semibold hover:bg-[#a78bfa] text-base shadow-md w-fit"
                >
                  <a href="https://boldo.agency/Boldo.pdf" target="_blank" rel="noreferrer">
                    Get our pitchdeck
                  </a>
                </Button>
              </div>
            </div>

            {/* simple “card” area (from your example, but without external deps) */}
            <Card className="border-black/10 bg-white/80 shadow-xl rounded-2xl">
              <div className="px-6 pt-6 pb-3">
                <div className="text-sm font-semibold text-black">What you get</div>
                <div className="mt-2 text-sm text-black/60">
                  Quality, transparency, and measurable impact from manual QA.
                </div>
              </div>
              <div className="px-6 pb-6 grid gap-3">
                {[
                  {
                    title: "Transparent approach",
                    text: "Detailed reports, specific improvements, and monitoring at every stage.",
                  },
                  {
                    title: "Quality",
                    text: "Zero critical bugs in production releases and stable operation under peak loads.",
                  },
                  {
                    title: "Team experience",
                    text: "Work with complex video-commerce and e‑commerce products.",
                  },
                  {
                    title: "Budget & ROI",
                    text: "Up to 40% savings compared to in‑house hiring with higher retention and conversion.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-xl border border-black/10 bg-white/80 px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-black/90">
                        {item.title}
                      </div>
                      <div className="mt-1 text-xs text-black/60">
                        {item.text}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* marquee row */}
          <div className="relative py-7 border-t border-black/5 bg-white/80 overflow-hidden">
            <div className="px-6 md:px-10">
              <Marquee
                className="py-1"
                speedSeconds={22}
                text={
                  <div className="flex items-center">
                    {marqueeItems.map((t, idx) => (
                      <span
                        key={`${t}-${idx}`}
                        className="inline-flex items-center rounded-full bg-[#8b5cf6] px-4 py-2 text-sm font-semibold text-white shadow-sm whitespace-nowrap flex-shrink-0 mr-6"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

