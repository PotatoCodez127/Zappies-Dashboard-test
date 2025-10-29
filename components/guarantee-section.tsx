"use client"
import { Shield } from "lucide-react"
import { motion } from "framer-motion" // Import motion

// Use simple fade/slide variant
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function GuaranteeSection() {
  return (
    <motion.section
      id="guarantee-section" // ID ADDED
      className="relative bg-gradient-to-br from-violet-950/30 via-blue-950/20 to-violet-950/30 py-24 sm:py-32 scroll-mt-20" // Consistent padding & scroll margin
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
      variants={itemVariants} // Apply simple variant to the whole section fade/slide
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-blue-950/50 p-12 text-center shadow-2xl shadow-violet-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="relative">
            <div className="mb-6 inline-flex rounded-full bg-violet-500/10 p-4">
              <Shield className="h-12 w-12 text-violet-400" />
            </div>
            <h2 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
              A Performance-Based Guarantee
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-xl leading-relaxed text-gray-300 md:text-xl">
              {" "}
              {/* Consistent text size */}
              You pay <span className="font-bold text-violet-400">50% upfront</span>, and the final{" "}
              <span className="font-bold text-violet-400">50% only after</span> our system has generated revenue for
              you. <span className="font-bold text-white">It pays for itself.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
