"use client"
import { Button } from "@/components/ui/button"
import { Check, X, BotMessageSquare, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function OfferComparisonSection() {
  const freeFeatures = [
    { text: "Instant 24/7 Basic FAQ", included: true },
    { text: "WhatsApp Channel Only", included: true },
    { text: "Multi-Channel (Voice & SMS)", included: false },
    { text: "Custom Qualification Logic", included: false },
    { text: "Live Dashboard & Analytics", included: false },
    { text: "Direct Calendar Booking", included: false },
    { text: "Seamless Human Handover", included: false },
  ]

  const paidFeatures = [
    { text: "Instant 24/7 Basic FAQ", included: true },
    { text: "WhatsApp Channel", included: true },
    { text: "Multi-Channel (Voice & SMS)", included: true },
    { text: "Custom Qualification Logic", included: true },
    { text: "Live Dashboard & Analytics", included: true },
    { text: "Direct Calendar Booking", included: true },
    { text: "Seamless Human Handover", included: true },
  ]

  return (
    <motion.section
      id="offer-comparison"
      className="relative bg-black py-24 sm:py-32 scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="mb-4 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Start Free, Upgrade When You're Ready
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">
            Prove the concept with our free bot, then upgrade to the full pipeline to stop losing high-value leads.
          </p>
        </motion.div>

        <motion.div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2" variants={itemVariants}>
          {/* Free Bot */}
          <div className="flex flex-col rounded-2xl border border-gray-700 p-8">
            <div className="mb-6 flex items-center gap-3">
              <BotMessageSquare className="h-8 w-8 text-gray-400" />
              <h3 className="text-3xl font-bold">Free WhatsApp Bot</h3>
            </div>
            <p className="mb-6 text-gray-400">A 24/7 assistant to answer basic questions and prove the concept.</p>
            <ul className="mb-8 flex-1 space-y-4">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 flex-shrink-0 text-red-500" />
                  )}
                  <span className={!feature.included ? "text-gray-500 line-through" : ""}>{feature.text}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" variant="outline" className="w-full bg-transparent text-lg">
              Get Started for Free
            </Button>
          </div>

          {/* Paid Bot */}
          <div className="flex flex-col rounded-2xl border-2 border-violet-500 bg-gradient-to-br from-violet-950/30 to-blue-950/20 p-8 shadow-2xl shadow-violet-500/30">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-violet-400" />
              <h3 className="text-3xl font-bold">The Project Pipeline AI</h3>
            </div>
            <p className="mb-6 text-gray-300">
              The full automated system to qualify, book, and secure high-value clients across all channels.
              Performance-based guarantee: pay 50% upfront, 50% after it generates revenue.
            </p>
            <ul className="mb-8 flex-1 space-y-4">
              {paidFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full bg-violet-600 text-lg hover:bg-violet-500">
              Book Your Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
