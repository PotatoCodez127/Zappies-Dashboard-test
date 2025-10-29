// components/combined-scroll-section.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Calendar, Filter, MessageSquare, Clock4, BotMessageSquare } from "lucide-react"

// Content remains the same
const sectionsContent = [
  {
    type: "feature",
    icon: <Clock4 className="h-10 w-10 text-red-400" />,
    title: "Wasting hours on unqualified leads?",
    description:
      "Stop driving to consultations with tire-kickers. Our AI pre-qualifies every inquiry by budget, timeline, and project scope before they reach your calendar. Only meet with clients ready to invest.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wEfNZmXfm6QNXVbITIlQgVeXurRGDC.png",
    imageSide: "left",
  },
  {
    type: "steps",
    title: "Automate Your Pipeline",
    steps: [
      {
        icon: <MessageSquare className="h-8 w-8 text-violet-400" />,
        title: "1. Qualify 24/7",
        description:
          'The AI asks your "Killer Qualifying Questions" to understand budget, timeline, and project scope.',
      },
      {
        icon: <Calendar className="h-8 w-8 text-violet-400" />,
        title: "2. Book the Best",
        description: "High-quality, qualified leads are automatically booked directly into your Google Calendar.",
      },
      {
        icon: <Filter className="h-8 w-8 text-violet-400" />,
        title: "3. Filter the Rest",
        description: "Politely informs unqualified leads they aren't a good fit, protecting your valuable time.",
      },
    ],
  },
  {
    type: "feature",
    icon: <BotMessageSquare className="h-10 w-10 text-blue-400" />,
    title: "Your AI captures leads 24/7",
    description:
      "Never miss a high-value client again. Our intelligent assistant works across WhatsApp, voice calls, and SMS—qualifying leads, answering questions, and booking consultations directly into your calendar while you sleep.",
    imageUrl: "/ai-chatbot-interface-dashboard-with-whatsapp-messa.jpg",
    imageSide: "right",
  },
]

export function CombinedScrollSection() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Keep the offset
    offset: ["start center", "end center"],
  })

  const segment = 1 / sectionsContent.length

  // Section 0 transforms
  const opacity0 = useTransform(scrollYProgress, [0, segment * 0.1, segment - segment * 0.1, segment], [0, 1, 1, 0])
  const scale0 = useTransform(scrollYProgress, [0, segment * 0.1, segment - segment * 0.1, segment], [0.95, 1, 1, 0.95])

  // Section 1 transforms
  const opacity1 = useTransform(
    scrollYProgress,
    [segment, segment + segment * 0.1, segment * 2 - segment * 0.1, segment * 2],
    [0, 1, 1, 0],
  )
  const scale1 = useTransform(
    scrollYProgress,
    [segment, segment + segment * 0.1, segment * 2 - segment * 0.1, segment * 2],
    [0.95, 1, 1, 0.95],
  )

  // Section 2 transforms
  const opacity2 = useTransform(
    scrollYProgress,
    [segment * 2, segment * 2 + segment * 0.1, segment * 3 - segment * 0.1, segment * 3],
    [0, 1, 1, 0],
  )
  const scale2 = useTransform(
    scrollYProgress,
    [segment * 2, segment * 2 + segment * 0.1, segment * 3 - segment * 0.1, segment * 3],
    [0.95, 1, 1, 0.95],
  )

  const transforms = [
    { opacity: opacity0, scale: scale0 },
    { opacity: opacity1, scale: scale1 },
    { opacity: opacity2, scale: scale2 },
  ]

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl px-6">
          {sectionsContent.map((section, index) => {
            return (
              <motion.div
                key={index}
                style={{
                  opacity: transforms[index].opacity,
                  scale: transforms[index].scale,
                  marginTop: index > 0 ? "-100vh" : "0",
                }}
                className="flex h-screen w-full items-center justify-center"
              >
                {section.type === "feature" && (
                  <div
                    className={`grid w-full items-center gap-12 lg:grid-cols-2 ${section.imageSide === "right" ? "lg:grid-flow-dense" : ""}`}
                  >
                    <div
                      className={`${section.imageSide === "right" ? "lg:col-start-1" : ""} text-center lg:text-left`}
                    >
                      <div className="mb-4 inline-flex">{section.icon}</div>
                      <h2 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
                        {section.title}
                      </h2>
                      <p className="text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">
                        {section.description}
                      </p>
                    </div>
                    <div
                      className={`${section.imageSide === "right" ? "lg:col-start-2" : ""} flex justify-center lg:justify-start`}
                    >
                      <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-2xl">
                        <Image
                          src={section.imageUrl || "/placeholder.svg"}
                          alt={section.title}
                          layout="fill"
                          objectFit="cover"
                          className="h-full w-full"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
                      </div>
                    </div>
                  </div>
                )}

                {section.type === "steps" && (
                  <div className="text-center">
                    <h2 className="mb-16 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                      {section.title}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                      {section.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-blue-950/20 p-8"
                        >
                          <div className="mb-6 inline-flex rounded-xl bg-violet-500/10 p-3">{step.icon}</div>
                          <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                          <p className="text-pretty leading-relaxed text-gray-400">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
