"use client"

// components/footer.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
}

export function Footer() {
  return (
    <>
      {/* Pre-Footer CTA Section */}
      <motion.section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-b from-black via-violet-950/20 to-black py-24 sm:py-32 scroll-mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-blue-600/10 to-violet-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Ready to Automate Your Pipeline?
          </h2>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Deploy your AI lead qualification agent instantly. Start today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-100 hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 text-lg px-8 py-6 rounded-full font-semibold"
          >
            <a href="/contact">Book Your Demo</a>
          </Button>
        </div>
      </motion.section>

      {/* Main Footer Section */}
      <motion.footer
        className="bg-black border-t border-gray-900 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Left Side - Logo & Social */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">Zappies AI</h3>
              </div>
              <div className="mb-4 flex gap-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
              <p className="text-sm text-gray-500">© 2025 Zappies AI. All rights reserved.</p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-white tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/free-bot" className="text-sm text-gray-400 hover:text-white transition-colors">
                    The Offer
                  </Link>
                </li>
                <li>
                  <Link href="#guarantee-section" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Guarantee
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-white tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-white tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/sign-in" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Client Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-white tracking-wider">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  )
}
