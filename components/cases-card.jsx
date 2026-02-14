"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"

function AnimatedCounter({ target, isVisible }) {
  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)

  const parseNumber = (value) => {
    const num = parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(num) ? 0 : num
  }

  const targetNum = parseNumber(target)

  useEffect(() => {
    if (hasAnimatedRef.current || !isVisible) return
    hasAnimatedRef.current = true

    const animate = () => {
      setCount((prev) => {
        if (prev < targetNum) {
          const increment = targetNum / 50
          return Math.min(prev + increment, targetNum)
        }
        return targetNum
      })
    }

    const interval = setInterval(animate, 30)
    return () => clearInterval(interval)
  }, [targetNum, isVisible])

  const formatNumber = (num) => {
    if (target.includes("%")) return `${num.toFixed(1)}%`
    if (target.includes("+")) return `${Math.round(num)}+`
    if (target.includes("ms")) return `${Math.round(num)}ms`
    if (target.includes("/")) return `${num.toFixed(1)}/5`
    return num.toFixed(0)
  }

  return <>{formatNumber(count)}</>
}

function MetricCard({ metric, isVisible, delay = 0 }) {
  return (
    <div
      className="group/metric relative p-4 rounded-xl border border-black/5 bg-white/80 hover:bg-white hover:shadow-md hover:border-black/10 transition-all duration-300 hover:-translate-y-0.5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-xs font-medium text-black/45 mb-1.5 uppercase tracking-wide">
        {metric.label}
      </div>
      <div className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
        <AnimatedCounter target={metric.value} isVisible={isVisible} />
      </div>
      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[--brand-500] to-[--brand-400] rounded-full scale-x-0 group-hover/metric:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

export function CasesCard() {
  const [visibleCases, setVisibleCases] = useState(new Set())
  const caseRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const caseId = entry.target.dataset.caseId
          if (entry.isIntersecting) {
            setVisibleCases((prev) => new Set([...prev, parseInt(caseId)]))
          }
        })
      },
      { threshold: 0.2 }
    )

    Object.values(caseRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(caseRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const cases = [
    {
      id: 1,
      title: "AI-waiter and QR-menu",
      subtitle: "Improving the stability of key user scenarios for the QR-menu with an AI assistant",
      description: "We went through every screen of the QR-menu app on 12 different devices — iPhones, Androids, tablets in restaurant conditions with poor Wi-Fi. We simulated real guest behavior: scanning QR, browsing the menu, adding items, paying, and tracking order status. Found 47 bugs in the first sprint alone — broken layout on small screens, payment timeouts under load, AI-assistant giving wrong ETAs when the kitchen queue was long. After 3 regression cycles the ordering flow became rock-solid: zero crashes, sub-second response, and the AI now calculates wait time to the minute.",
      accentColor: "#3b82f6",
      slideImage: "/cases/case1-slide.png",
      tags: ["Mobile app testing (iOS & Android)", "Bug retesting and regression", "Performance of ordering scenarios", "UX-flow testing", "Web testing"],
      metrics: [
        { label: "App Stability", value: "99.2%" },
        { label: "Order Accuracy", value: "98.7%" },
        { label: "Response Time", value: "145ms" },
        { label: "User Satisfaction", value: "4.8/5" },
      ],
    },
    {
      id: 2,
      title: "AI Telephony",
      subtitle: "Improving the reliability of integrations and stability of key scenarios in AI telephony for mass customer requests",
      description: "The platform connects to five telephony providers — Mango, Telfin, Zadarma, OnlinePBX, and custom SIP. We tested every integration path end-to-end: CRM token setup, call routing, concurrent session handling, and failover scenarios. Ran load tests simulating 5000+ simultaneous calls to catch race conditions in the queue. Discovered critical bugs in token refresh logic and call handoff between providers. After our testing the integration setup went from a 3-step guessing game to a bulletproof flow — register, select provider, paste token, done.",
      accentColor: "#0d9488",
      slideImage: "/cases/case2-slide.png",
      tags: ["Web testing", "API testing", "Regression testing"],
      metrics: [
        { label: "Integration Reliability", value: "99.8%" },
        { label: "Call Success Rate", value: "97.3%" },
        { label: "Response Latency", value: "120ms" },
        { label: "Concurrent Calls", value: "5000+" },
      ],
    },
  ]

  return (
    <div className="space-y-10">
      {cases.map((caseItem) => {
        const isVisible = visibleCases.has(caseItem.id)

        return (
          <div
            key={caseItem.id}
            ref={(el) => {
              if (el) caseRefs.current[caseItem.id] = el
            }}
            data-case-id={caseItem.id}
            className="group relative rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-black/10"
          >
            {/* Slide image as hero */}
            <div className="relative overflow-hidden">
              <img
                src={caseItem.slideImage}
                alt={caseItem.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content below the image */}
            <div className="p-8 md:p-10 lg:p-12 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                  {caseItem.title}
                </h3>
                <p className="text-base text-black/55 font-medium leading-relaxed max-w-3xl">
                  {caseItem.subtitle}
                </p>
                <p className="text-sm text-black/45 font-medium leading-relaxed max-w-3xl">
                  {caseItem.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {caseItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/5 bg-[--page-bg] text-black/60 transition-all duration-200 hover:border-black/15 hover:text-black/80 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {caseItem.metrics.map((metric, idx) => (
                  <MetricCard
                    key={idx}
                    metric={metric}
                    isVisible={isVisible}
                    delay={idx * 60}
                  />
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: `linear-gradient(to right, ${caseItem.accentColor}, ${caseItem.accentColor}80)` }}
            />
          </div>
        )
      })}
    </div>
  )
}
