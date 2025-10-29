"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SignupProgressBar } from "@/components/signup-progress-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function ActivatePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedEmail = sessionStorage.getItem("freeBotEmail")
    const storedFirstName = sessionStorage.getItem("freeBotFirstName")

    if (storedEmail && storedFirstName) {
      setEmail(storedEmail)
      setFirstName(storedFirstName)
    } else {
      // If data is missing, redirect back to start
      router.push("/free-bot")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!whatsappNumber.trim()) {
      return
    }

    sessionStorage.setItem("userWhatsApp", whatsappNumber)
    sessionStorage.setItem("userEmail", email)
    sessionStorage.setItem("userName", firstName)

    // Final activation logic
    console.log("[v0] Activating bot for:", { email, firstName, whatsappNumber })

    router.push("/bot-activated")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Progress Bar */}
      <SignupProgressBar currentStep={3} />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Last step. Where should we deploy your bot?
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto">
            To activate your Free 24/7 WhatsApp AI Assistant, please enter the WhatsApp number you want the bot deployed
            to. This is how we deliver the 'fast win' instantly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-white text-base">
                Your WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
              />
              <p className="text-sm text-zinc-400">Include country code (e.g., +1 for US, +44 for UK)</p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-violet-600 hover:bg-violet-700 text-white"
            >
              ACTIVATE MY FREE BOT
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-violet-400">24/7</div>
                <div className="text-xs text-zinc-400 mt-1">Always Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400">5 min</div>
                <div className="text-xs text-zinc-400 mt-1">Setup Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400">Free</div>
                <div className="text-xs text-zinc-400 mt-1">No Credit Card</div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          We respect your privacy. Your information is secure and will never be shared.
        </p>
      </div>
    </div>
  )
}
