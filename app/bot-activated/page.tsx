"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Zap, Clock, Users, TrendingUp, AlertTriangle, Shield } from "lucide-react"
import { useEffect, useState } from "react"

export default function BotActivatedPage() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    whatsapp: "",
  })

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const email = sessionStorage.getItem("userEmail") || ""
    const name = sessionStorage.getItem("userName") || ""
    const whatsapp = sessionStorage.getItem("userWhatsApp") || ""
    setUserData({ email, name, whatsapp })
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Success Confirmation Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-green-500/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Success! Check Your WhatsApp.</h1>

          <p className="mb-8 text-xl text-gray-300 md:text-2xl leading-relaxed">
            We've just sent your Free 24/7 WhatsApp AI Assistant to the number you provided. Follow the instructions in
            that message to activate it.
          </p>

          <div className="mb-12 rounded-lg border border-violet-500/20 bg-violet-950/20 p-6">
            <p className="text-lg text-gray-300">
              Sent to: <span className="font-semibold text-white">{userData.whatsapp}</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">Check your WhatsApp now to complete the setup.</p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-full bg-amber-500/10 p-3 flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl text-balance">
                A Quick Warning: That Bot Can't Tell a "Tyre-Kicker" from a "R2M Client"
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                That free bot is your 'first win', but it's designed to solve a small problem (basic FAQs). It cannot
                tell the difference between someone with a R100k budget and a genuine R2M+ client. Your real pain isn't
                just answering questions; it's wasting 2-3 hours driving to site visits with unqualified leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-full bg-violet-500/10 p-3 flex-shrink-0">
              <Shield className="h-8 w-8 text-violet-500" />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl text-balance">
                The Solution: 'The Project Pipeline AI'
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Our full system acts as a firm gatekeeper, asking the tough qualifying questions you're often too polite
                to ask (like budget, architectural plans, and property ownership) before they ever reach your calendar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full font-semibold"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Watch the 3-Minute System Demo
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-violet-500 text-violet-400 hover:bg-violet-950/30 text-lg px-8 py-6 rounded-full font-semibold bg-transparent"
                >
                  <a href="/contact">Or, Book a 15-Minute Pipeline Strategy Call</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pivot to Paid Offer Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-violet-950/10 to-black">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready to Scale Beyond the Free Bot?
            </h2>
            <p className="text-xl text-gray-300">
              Your free bot handles basic inquiries. But what if you could qualify leads, book appointments, and close
              deals automatically?
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Bot */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">Free Bot</h3>
              <p className="mb-6 text-gray-400">What you just activated:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Basic auto-responses</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 availability</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Simple FAQ handling</span>
                </li>
              </ul>
            </div>

            {/* Premium Bot */}
            <div className="rounded-lg border-2 border-violet-500 bg-gradient-to-b from-violet-950/30 to-black p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Premium AI Pipeline</h3>
              <p className="mb-6 text-gray-300">Everything in Free, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white">
                  <Zap className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Smart lead qualification</strong> - Identifies high-value prospects
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Clock className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Automated appointment booking</strong> - Syncs with your calendar
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Users className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>CRM integration</strong> - Automatic data capture
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <TrendingUp className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Custom workflows</strong> - Tailored to your business
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-6 text-xl text-gray-300">
              <strong className="text-white">Limited Time:</strong> Upgrade now and get 50% off your first month
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full font-semibold"
              >
                <a href="/contact">Book Strategy Call</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-violet-500 text-violet-400 hover:bg-violet-950/30 text-lg px-8 py-6 rounded-full font-semibold bg-transparent"
              >
                <a href="/features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
