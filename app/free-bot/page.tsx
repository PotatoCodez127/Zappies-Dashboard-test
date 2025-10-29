"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle2, MessageCircle, Clock, Zap } from "lucide-react"

export default function FreeBotPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem("freeBotEmail", formData.email)
    router.push("/free-bot/personalize")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Free bot signup:", formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Starfield density={100} animated={true} />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {!submitted ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Create your free 24/7 AI Assistant</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  You're 60 seconds away from your 'first win' in automation.
                </p>
              </div>

              {step === 1 && (
                <div className="max-w-md mx-auto">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white text-lg">
                          Enter your best email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-12 text-lg"
                          placeholder="john@company.com"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-100 text-xl py-7 rounded-full font-bold"
                      >
                        Continue
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">What You Get (Free)</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <MessageCircle className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white font-medium">WhatsApp Integration</p>
                          <p className="text-gray-400 text-sm">Instant 24/7 coverage on WhatsApp</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white font-medium">Basic FAQ Handling</p>
                          <p className="text-gray-400 text-sm">Answers common questions automatically</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white font-medium">5-Minute Setup</p>
                          <p className="text-gray-400 text-sm">Quick deployment, no technical skills needed</p>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <strong className="text-white">Note:</strong> The free bot covers WhatsApp only. Upgrade to The
                        Project Pipeline AI for multi-channel coverage, lead qualification, and calendar integration.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Sign Up Now</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          placeholder="John Smith"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">
                          Company Name *
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          placeholder="Elite Renovations"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-display" className="text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="email-display"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          placeholder="john@eliterenovations.co.za"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          WhatsApp Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          placeholder="+27 82 123 4567"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-100 text-lg py-6 rounded-full font-semibold mt-6"
                      >
                        Get My Free Bot
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        No credit card required. Setup instructions sent instantly.
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center max-w-2xl mx-auto">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to Zappies AI!</h2>
              <p className="text-xl text-gray-400 mb-6">
                Check your email at <strong className="text-white">{formData.email}</strong> for setup instructions.
              </p>
              <p className="text-gray-400 mb-8">
                Your free WhatsApp bot will be ready in under 5 minutes. We've sent you everything you need to get
                started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Return to Home
                </Button>
                <Button
                  onClick={() => (window.location.href = "/contact")}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Upgrade to Full System
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
