"use client"

import type React from "react"

import { useState } from "react"
import { SignupProgressBar } from "@/components/signup-progress-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function FreeBotStartPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    whatsapp: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in sessionStorage for next step
    sessionStorage.setItem("freeBotSignup", JSON.stringify(formData))
    // Navigate to next step (we'll create this later)
    router.push("/bot-activated")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Progress Bar */}
      <SignupProgressBar currentStep={1} />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Get Your Free 24/7 WhatsApp AI Assistant
          </h1>
          <p className="text-xl text-violet-400 font-medium">You're 30 seconds away from your 'first win'.</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white text-base">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className="bg-zinc-950 border-zinc-700 text-white h-12 text-base"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-white text-base">
                Your WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+27 82 123 4567"
                className="bg-zinc-950 border-zinc-700 text-white h-12 text-base"
              />
              <p className="text-sm text-zinc-400 mt-1">(This is where we'll instantly deploy your bot)</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-base">
                Best Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="bg-zinc-950 border-zinc-700 text-white h-12 text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-violet-600 hover:bg-violet-700 text-white"
            >
              GET MY FREE BOT NOW
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
