"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"

function AnimatedCounter({ target, isVisible }) {
  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)

  // Parse the target value to extract the number
  const parseNumber = (value) => {
    const num = parseFloat(value.replace(/[^\d.]/g, ""))
    return isNaN(num) ? 0 : num
  }

  const targetNum = parseNumber(target)

  useEffect(() => {
    // If already animated or not visible, don't do anything
    if (hasAnimatedRef.current || !isVisible) {
      return
    }

    // Mark as animated
    hasAnimatedRef.current = true

    let isMounted = true

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

    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [targetNum, isVisible])

  // Format the number based on the target
  const formatNumber = (num) => {
    if (target.includes("%")) {
      return `${num.toFixed(1)}%`
    }
    if (target.includes("+")) {
      return `${Math.round(num)}+`
    }
    if (target.includes("ms")) {
      return `${Math.round(num)}ms`
    }
    if (target.includes("/")) {
      return `${num.toFixed(1)}/5`
    }
    return num.toFixed(0)
  }

  return <>{formatNumber(count)}</>
}

function CaseImage({ src, alt, caseId }) {
  const [isPortrait, setIsPortrait] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsPortrait(img.height > img.width)
    }
    img.src = src
  }, [src])

  return (
    <div className={`relative rounded-xl overflow-hidden group/image ${isPortrait ? "w-full max-w-xs mx-auto" : "w-full"}`}>
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 from-transparent via-transparent to-black/10" />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover/image:scale-105"
      />
      <div className="absolute inset-0 border border-black/10 rounded-xl" />
    </div>
  )
}

export function CasesCard() {
  const [hoveredCase, setHoveredCase] = useState(null)
  const [visibleCases, setVisibleCases] = useState(new Set())
  const caseRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const caseId = entry.target.dataset.caseId
          if (entry.isIntersecting) {
            setVisibleCases((prev) => new Set([...prev, parseInt(caseId)]))
          } else {
            setVisibleCases((prev) => {
              const newSet = new Set(prev)
              newSet.delete(parseInt(caseId))
              return newSet
            })
          }
        })
      },
      { threshold: 0.3 }
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
      bgColor: "from-blue-600 to-blue-400",
      tagBg: "bg-blue-500/10 border-blue-200",
      image: "/cases/Снимок экрана 2026-01-16 в 09.54.11.png",
      layout: "text-left", // текст слева, картинка и метрики справа
      tags: ["Mobile app testing", "Bug retesting", "Performance testing", "UX-flow testing", "Web testing"],
      metrics: [
        { label: "App Stability", value: "99.2%" },
        { label: "Order Accuracy", value: "98.7%" },
        { label: "Response Time", value: "145ms" },
        { label: "User Satisfaction", value: "4.8/5" }
      ],
    },
    {
      id: 2,
      title: "AI Telephony",
      subtitle: "Improving the reliability of integrations and stability of key scenarios in AI telephony for mass customer requests",
      bgColor: "from-teal-600 to-teal-400",
      tagBg: "bg-teal-500/10 border-teal-200",
      image: "/cases/telephony.png",
      layout: "image-left", // картинка слева, текст и метрики справа
      tags: ["Web testing", "API testing", "Regression testing"],
      metrics: [
        { label: "Integration Reliability", value: "99.8%" },
        { label: "Call Success Rate", value: "97.3%" },
        { label: "Response Latency", value: "120ms" },
        { label: "Concurrent Calls", value: "5000+" }
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {cases.map((caseItem) => (
        <div
          key={caseItem.id}
          ref={(el) => {
            if (el) caseRefs.current[caseItem.id] = el
          }}
          data-case-id={caseItem.id}
          className="group relative overflow-hidden rounded-2xl transition-all duration-300"
          onMouseEnter={() => setHoveredCase(caseItem.id)}
          onMouseLeave={() => setHoveredCase(null)}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${caseItem.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          {/* Content */}
          {caseItem.layout === "text-left" ? (
            // Layout 1: Metrics & Text left, Image right (full height)
            <div className="relative grid md:grid-cols-2 gap-0 p-0">
              {/* Left side - Text & Metrics */}
              <div className="space-y-6 flex flex-col justify-center p-8 md:p-12">
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
                    {caseItem.title}
                  </h3>
                  <p className="text-lg text-black/60 font-medium leading-relaxed">
                    {caseItem.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${caseItem.tagBg} text-black/70 border border-black/10 bg-white/70`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {caseItem.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transition-all duration-300 transform ${
                        hoveredCase === caseItem.id
                          ? "scale-105 border-black/20 bg-white shadow-md"
                          : "border-black/10 bg-white/70 hover:scale-102 hover:border-black/15"
                      } backdrop-blur-sm`}
                    >
                      <div className="text-xs font-medium text-black/50 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-semibold tracking-tight text-black">
                        <AnimatedCounter
                          target={metric.value}
                          isVisible={visibleCases.has(caseItem.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Image (centered) */}
              <div className="flex flex-col justify-center h-full min-h-96">
                {caseItem.image && (
                  <div className="relative rounded-2xl overflow-hidden group/image h-5/6 border border-black/10 max-w-sm mx-auto w-full bg-white/60">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 from-transparent via-transparent to-black/10" />
                    <img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/image:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Layout 2: Image left, Text & Metrics right (original)
            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left side - Image */}
              <div className="flex flex-col justify-center">
                {caseItem.image && (
                  <CaseImage
                    src={caseItem.image}
                    alt={caseItem.title}
                    caseId={caseItem.id}
                  />
                )}
              </div>

              {/* Right side - Text & Metrics */}
              <div className="space-y-6 flex flex-col justify-center">
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
                    {caseItem.title}
                  </h3>
                  <p className="text-lg text-black/60 font-medium leading-relaxed">
                    {caseItem.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${caseItem.tagBg} text-black/70 border border-black/10 bg-white/70`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4">
                  {caseItem.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transition-all duration-300 transform ${
                        hoveredCase === caseItem.id
                          ? "scale-105 border-black/20 bg-white shadow-md"
                          : "border-black/10 bg-white/70 hover:scale-102 hover:border-black/15"
                      } backdrop-blur-sm`}
                    >
                      <div className="text-xs font-medium text-black/50 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-semibold tracking-tight text-black">
                        <AnimatedCounter
                          target={metric.value}
                          isVisible={visibleCases.has(caseItem.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${caseItem.bgColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
      ))}
    </div>
  )
}
