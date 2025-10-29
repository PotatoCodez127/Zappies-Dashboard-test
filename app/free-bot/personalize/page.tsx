"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SignupProgressBar } from "@/components/signup-progress-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function PersonalizePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")

  useEffect(() => {
    // Retrieve email from sessionStorage
    const storedEmail = sessionStorage.getItem("freeBotEmail")
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      // If no email found, redirect back to start
      router.push("/free-bot")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem("freeBotFirstName", firstName)
    // Navigate to next step (to be created)
    router.push("/free-bot/activate")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Progress Bar */}
      <SignupProgressBar currentStep={2} />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Great. What's your name?</h1>
          <p className="text-xl text-violet-400 font-medium">This helps us personalize your bot's setup.</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white text-base">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="bg-zinc-950 border-zinc-700 text-white h-12 text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-violet-600 hover:bg-violet-700 text-white"
            >
              Continue
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
