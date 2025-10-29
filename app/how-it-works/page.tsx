import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"
import { FileText, Phone, Rocket, MessageSquare, Calendar, BarChart3 } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Starfield density={100} animated={true} />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">How The Project Pipeline AI Works</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From onboarding to deployment in 72 hours. Here's exactly how we transform your lead qualification
              process.
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="space-y-16 mb-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-violet-400">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Complete The Blueprint</h2>
                </div>
                <p className="text-lg text-gray-400 mb-6">
                  Fill out our comprehensive onboarding form that defines your AI's intelligence. This 20-30 minute
                  questionnaire captures your brand voice, qualifying questions, and deal-breakers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Define your brand identity and tone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Set minimum budget thresholds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Customize qualifying questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Configure calendar and availability</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-24 h-24 text-violet-400" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-24 h-24 text-blue-400" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Onboarding Call</h2>
                </div>
                <p className="text-lg text-gray-400 mb-6">
                  Within 4 business hours of submitting your blueprint, we'll schedule a personalized onboarding call to
                  review your setup and ensure everything is configured perfectly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Review your qualification criteria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Fine-tune AI responses and tone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Test the system together</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Answer any questions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-400">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">72-Hour Deployment</h2>
                </div>
                <p className="text-lg text-gray-400 mb-6">
                  Your fully customized AI assistant goes live within 72 hours. Start receiving pre-qualified leads
                  immediately across WhatsApp, voice calls, and SMS.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Multi-channel deployment (WhatsApp, Voice, SMS)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Live dashboard access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Calendar integration active</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Ongoing support and optimization</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-24 h-24 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* What Happens After */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">What Happens After Deployment</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">AI Qualification</h3>
                <p className="text-gray-400">
                  Every lead is automatically asked about budget, timeline, property ownership, and project scope before
                  reaching you.
                </p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Auto Booking</h3>
                <p className="text-gray-400">
                  Qualified leads are instantly booked into your calendar. Unqualified leads are politely redirected
                  with helpful resources.
                </p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Live Dashboard</h3>
                <p className="text-gray-400">
                  Track all conversations, qualification rates, and booking metrics in real-time from your personalized
                  dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Book a demo to see The Project Pipeline AI in action, or start with our free WhatsApp bot today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base rounded-full"
              >
                <a href="/contact">Book a Demo</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full bg-transparent"
              >
                <a href="/free-bot">Get Free Bot</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
