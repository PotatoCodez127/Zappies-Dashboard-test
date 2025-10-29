"use client"
import { BarChart3, Calendar, MessageCircle, UserCheck } from "lucide-react"
import { motion } from "framer-motion" // Import motion

// Re-use stagger variants (define them here or import from a shared file)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Adjusted stagger delay slightly
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function FeatureGridSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Multi-Channel AI",
      description: "Engages leads over WhatsApp, Voice Calls, and SMS.",
    },
    {
      icon: BarChart3,
      title: "Live Dashboard",
      description: "A single place to review all conversations and lead data.",
    },
    {
      icon: Calendar,
      title: "Full Calendar Integration",
      description: "Syncs instantly with your existing calendar.",
    },
    {
      icon: UserCheck,
      title: "Seamless Human Handover",
      description: "Alerts you to step in when a lead is qualified and ready to talk.",
    },
  ]

  return (
    <motion.section
      className="relative bg-gradient-to-b from-black to-gray-950/50 py-24" // Consistent padding & gradient
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.h2
          className="mb-16 text-balance text-center text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" // Consistent heading style
          variants={itemVariants}
        >
          Your Complete Project Pipeline Solution
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-500/40 hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.25)]"
                variants={itemVariants}
              >
                {/* Existing card content */}
                <div className="mb-6 inline-flex rounded-xl bg-violet-500/10 p-3">
                  <Icon className="h-8 w-8 text-violet-400" />
                </div>
                <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
