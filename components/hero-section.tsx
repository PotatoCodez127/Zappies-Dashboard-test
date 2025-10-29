"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Starfield } from "@/components/starfield"
import { useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

export function HeroSection() {
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const maxRotation = 8

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxRotation, -maxRotation])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxRotation, maxRotation])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXRelative = (event.clientX - rect.left) / width - 0.5
    const mouseYRelative = (event.clientY - rect.top) / height - 0.5
    mouseX.set(mouseXRelative)
    mouseY.set(mouseYRelative)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-32 pb-32">
      <Starfield density={100} animated={true} />
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-violet-950/10 to-black z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Text content */}
        <div className="text-center mb-20">
          <h1 className="mb-8 text-balance text-6xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl text-white">
            Stop Wasting Time on Unqualified Leads
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-pretty text-xl leading-relaxed text-gray-400 md:text-2xl font-light">
            AI-powered lead qualification for elite Cape Town renovators. Pre-qualify every inquiry by budget, timeline,
            and project scope before they reach your calendar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-medium rounded-full transition-all duration-300"
            >
              <a href="/free-bot">Get Your Free WhatsApp Bot</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-medium rounded-full transition-all duration-300 bg-transparent"
            >
              <a href="/contact">Book a Demo</a>
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto max-w-6xl mt-24 group"
          style={{ perspective: "1500px" }}
        >
          {/* Glow effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/40 via-purple-600/40 to-violet-600/40 blur-[100px] opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-violet-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />

          {/* Motion Div for Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 border-violet-500/30 shadow-2xl shadow-violet-500/50 transition-shadow duration-500 group-hover:shadow-violet-500/80"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              scale: useSpring(1, { stiffness: 300, damping: 20 }),
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src="/images/design-mode/screenshot-2025-10-23-18-43-02(1).png"
              alt="Zappies AI Dashboard"
              width={1920}
              height={1080}
              className="w-full h-auto block"
              priority
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-violet-500/50 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
