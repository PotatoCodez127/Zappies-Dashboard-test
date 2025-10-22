/* v0-cool-site/app/demo/page.tsx */
"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Background } from "@/components/background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { createClient } from "@/lib/supabase/client"

export default function DemoPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectsPerYear: "",
    interest: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.from("leads").insert({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company,
        message: `Projects Per Year: ${formData.projectsPerYear}\nPrimary Interest: ${formData.interest}\n\n${formData.message}`,
        source: "demo_page",
        status: "new",
      })

      if (error) {
        console.error("[v0] Error submitting lead:", error)
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Demo Request Received!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectsPerYear: "",
        interest: "",
        message: "",
      })
    } catch (error) {
      console.error("[v0] Unexpected error:", error)
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Background />
      <Navigation />
      <Toaster />

      <main className="pt-32 pb-20 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            {/* Use theme variables */}
            <div className="inline-block px-5 py-2 bg-destructive/20 border border-destructive rounded-full text-sm mb-5 text-destructive-foreground">
              Schedule Your Demo
            </div>
            {/* Use theme variables */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-foreground via-destructive to-foreground bg-clip-text text-transparent text-balance">
              See Zappies AI in Action
            </h1>
            {/* Use theme variables */}
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Book a personalized demo and discover how our AI agents can transform your custom home building business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            {/* Use Card component styling */}
            <Card>
              <CardHeader>
                 {/* Use theme variables */}
                <CardTitle className="text-2xl text-foreground">Request Your Demo</CardTitle>
                {/* Use theme variables */}
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and we'll be in touch within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    {/* Label uses theme variable */}
                    <Label htmlFor="name">Full Name *</Label>
                    {/* Input uses theme variables */}
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+27 XX XXX XXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Your Building Company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projects">Projects Per Year *</Label>
                     {/* Select uses theme variables */}
                    <Select
                      value={formData.projectsPerYear}
                      onValueChange={(value) => handleChange("projectsPerYear", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 projects</SelectItem>
                        <SelectItem value="6-15">6-15 projects</SelectItem>
                        <SelectItem value="16-30">16-30 projects</SelectItem>
                        <SelectItem value="30+">30+ projects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">Primary Interest *</Label>
                     {/* Select uses theme variables */}
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => handleChange("interest", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead-qualification">Lead Qualification</SelectItem>
                        <SelectItem value="project-management">Project Management</SelectItem>
                        <SelectItem value="client-communication">Client Communication</SelectItem>
                        <SelectItem value="cost-estimation">Cost Estimation</SelectItem>
                        <SelectItem value="all">All Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                     {/* Textarea uses theme variables */}
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Tell us about your specific needs or challenges..."
                    />
                  </div>

                   {/* Button uses theme variables */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full py-6 text-lg bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-destructive/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Schedule Demo"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="space-y-8">
               {/* Card uses theme styling */}
              <Card>
                <CardHeader>
                  {/* Use theme variables */}
                  <CardTitle className="text-2xl text-foreground">What to Expect</CardTitle>
                </CardHeader>
                {/* Use theme variables */}
                <CardContent className="space-y-4 text-foreground/80">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-destructive to-destructive/80 rounded-full flex items-center justify-center flex-shrink-0 text-xl text-destructive-foreground">1</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Personalized Consultation</h3>
                      <p>We'll discuss your specific business needs and challenges</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-destructive to-destructive/80 rounded-full flex items-center justify-center flex-shrink-0 text-xl text-destructive-foreground">2</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Live Demo</h3>
                      <p>See our AI agents in action with real-world scenarios</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-destructive to-destructive/80 rounded-full flex items-center justify-center flex-shrink-0 text-xl text-destructive-foreground">3</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Custom Recommendations</h3>
                      <p>Get tailored suggestions for your business</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-destructive to-destructive/80 rounded-full flex items-center justify-center flex-shrink-0 text-xl text-destructive-foreground">4</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">ROI Analysis</h3>
                      <p>Understand the potential impact on your bottom line</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Demo Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-foreground/80">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⏱️</div>
                    <div>
                      <div className="font-semibold text-foreground">Duration</div>
                      <div>45-60 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💻</div>
                    <div>
                      <div className="font-semibold text-foreground">Format</div>
                      <div>Virtual meeting (Zoom/Teams)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <div className="font-semibold text-foreground">Focus</div>
                      <div>Your specific business needs</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className="font-semibold text-foreground">Cost</div>
                      <div>Completely free, no obligation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card uses theme styling */}
              <Card className="bg-gradient-to-br from-destructive/20 to-destructive/10">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📞</div>
                   {/* Use theme variables */}
                  <h3 className="text-xl font-bold text-foreground mb-2">Prefer to Talk Now?</h3>
                  <p className="text-foreground/80 mb-4">Call us directly for immediate assistance</p>
                   {/* Use theme variables */}
                  <a href="tel:+27123456789" className="text-2xl font-bold text-destructive hover:text-destructive/80 transition-colors">
                    +27 12 345 6789
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}