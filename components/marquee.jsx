"use client"

import * as React from "react"

/**
 * Simple marquee (infinite horizontal scroll).
 * Uses CSS variables so speed/direction are easy to tweak.
 */
export function Marquee({
  text,
  className = "",
  speedSeconds = 22,
  reverse = false,
}) {
  const style = {
    "--marquee-duration": `${speedSeconds}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  }

  return (
    <div
      className={`marquee no-mask ${className}`}
      style={style}
      aria-label={typeof text === "string" ? text : "marquee"}
    >
      <div className="marquee__track">
        <span className="marquee__item">{text}</span>
        <span className="marquee__item" aria-hidden="true">
          {text}
        </span>
        <span className="marquee__item" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}

