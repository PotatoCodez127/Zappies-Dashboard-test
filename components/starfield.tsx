"use client"

import { useEffect, useRef } from "react"

interface StarfieldProps {
  density?: number // Number of stars (default: 50 for subtlety)
  className?: string
  animated?: boolean
}

export function Starfield({ density = 50, className = "", animated = false }: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    for (let i = 0; i < density; i++) {
      const star = document.createElement("div")
      star.className = animated ? "star star-animated" : "star star-static"
      star.style.width = `${Math.random() * 2 + 1}px`
      star.style.height = star.style.width
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`

      if (animated) {
        star.style.setProperty("--duration", `${Math.random() * 20 + 20}s`)
      }

      container.appendChild(star)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [density, animated])

  return <div ref={containerRef} className={`absolute inset-0 z-0 ${className}`} />
}
