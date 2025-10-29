"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectValue: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to your backend/CRM
    console.log("Demo booking submitted:", formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div className="container mx-auto px-4 max-w-3xl">
          {!submitted ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Book Your Demo</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  See how The Project Pipeline AI can transform your lead qualification process. We'll show you exactly
                  how it works for your business.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
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
                        Phone Number *
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectValue" className="text-white">
                      Average Project Value
                    </Label>
                    <select
                      id="projectValue"
                      name="projectValue"
                      value={formData.projectValue}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="" className="bg-gray-900">
                        Select range
                      </option>
                      <option value="500k-1m" className="bg-gray-900">
                        R500k - R1M
                      </option>
                      <option value="1m-2m" className="bg-gray-900">
                        R1M - R2M
                      </option>
                      <option value="2m-5m" className="bg-gray-900">
                        R2M - R5M
                      </option>
                      <option value="5m+" className="bg-gray-900">
                        R5M+
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Tell us about your lead challenges
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="e.g., We're spending too much time on unqualified leads with unrealistic budgets..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black hover:bg-gray-100 text-lg py-6 rounded-full font-semibold"
                  >
                    Book My Demo
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    We'll respond within 4 business hours to schedule your personalized demo.
                  </p>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Demo Booked Successfully!</h2>
              <p className="text-xl text-gray-400 mb-8">
                Thank you, {formData.name}. We'll be in touch within 4 business hours to schedule your personalized
                demo.
              </p>
              <Button onClick={() => (window.location.href = "/")} className="bg-white text-black hover:bg-gray-100">
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
