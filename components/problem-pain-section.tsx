"use client"

import { AlertTriangle, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function ProblemPainSection() {
  const painPoints = [
    {
      icon: Clock,
      title: "Wasted Site Visits",
      description:
        "You waste 2-3 hours of your most valuable time driving to site visits, only to discover the client has a R100k budget for a R1M dream.",
    },
    {
      icon: AlertTriangle,
      title: "Leads Lost After-Hours",
      description:
        "Your 'Contact Us' form isn't working for you. You're missing out on high-budget clients who inquire late at night and never get an instant response.",
    },
    {
      icon: Zap,
      title: "Outdated Competition",
      description:
        "Your competition operates off a bakkie and a basic website. An intelligent AI agent that pre-qualifies clients instantly makes you look like you're from the future.",
    },
  ]

  return (
    <motion.section
      className="relative bg-black py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.h2
          className="mb-16 text-balance text-center text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Does This Sound Familiar?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-red-900/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-red-500/40 hover:shadow-[0_20px_50px_-12px_rgba(239,68,68,0.25)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.15,
                  ease: "easeOut",
                }}
              >
                <div className="mb-6 inline-flex rounded-xl bg-red-500/10 p-3">
                  <Icon className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{point.title}</h3>
                <p className="text-pretty leading-relaxed text-gray-400">{point.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
