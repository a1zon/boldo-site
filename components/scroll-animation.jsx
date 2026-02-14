"use client"

import React, { useEffect, useState } from "react"

export function ScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        transform: `scaleX(${scrollProgress})`,
        background: "linear-gradient(to right, var(--brand-500), var(--brand-400), #a78bfa)",
        opacity: scrollProgress > 0.01 ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
