"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FileText, Phone, Rocket } from "lucide-react"

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-violet-400" />,
    title: "1. Complete The Blueprint",
    description:
      "Fill out our 20-minute onboarding form. Your answers define your AI's intelligence—qualifying questions, budget thresholds, and brand voice.",
  },
  {
    icon: <Phone className="h-8 w-8 text-violet-400" />,
    title: "2. Onboarding Call",
    description:
      "Within 4 business hours, we review your blueprint and schedule a call to finalize your custom qualification logic and calendar integration.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-violet-400" />,
    title: "3. Deploy in 72 Hours",
    description:
      "Your fully customized Project Pipeline AI goes live within 3 days. Start capturing and qualifying high-value leads immediately.",
  },
]

export function HowItWorksSection() {
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const activeStepIndex = useTransform(scrollYProgress, (value) => {
    if (value < 0.33) return 0
    if (value < 0.66) return 1
    return 2
  })

  const segment = 1 / steps.length

  return (
    <section id="how-it-works" ref={targetRef} className="relative h-[300vh] bg-black text-white scroll-mt-20">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              From Signup to Live in 72 Hours
            </h2>
            <p className="mt-4 text-lg text-gray-400 md:text-xl">White-glove onboarding. Zero technical headaches.</p>
          </motion.div>

          <div className="relative h-64">
            {steps.map((step, index) => {
              const start = index * segment
              const end = (index + 1) * segment
              const fadeInEnd = start + segment * 0.4
              const fadeOutStart = end - segment * 0.4

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
                  animate={{
                    opacity: activeStepIndex.get() === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center space-y-4"
                  style={{
                    opacity:
                      scrollYProgress.get() >= start && scrollYProgress.get() < fadeInEnd
                        ? (scrollYProgress.get() - start) / (fadeInEnd - start)
                        : scrollYProgress.get() >= fadeInEnd && scrollYProgress.get() < fadeOutStart
                          ? 1
                          : scrollYProgress.get() >= fadeOutStart && scrollYProgress.get() < end
                            ? 1 - (scrollYProgress.get() - fadeOutStart) / (end - fadeOutStart)
                            : 0,
                  }}
                >
                  <div className="inline-flex rounded-xl bg-violet-500/10 p-3">{step.icon}</div>
                  <h3 className="text-3xl font-bold">{step.title}</h3>
                  <p className="max-w-md text-xl text-gray-400">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
