import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Users,
  Shield,
  Zap,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Starfield density={100} animated={true} />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Powerful Features for Elite Renovators</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to pre-qualify leads, book consultations, and focus on high-value projects in
              Constantia, Bishopscourt, and Fresnaye.
            </p>
          </div>

          {/* Multi-Channel Coverage */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Multi-Channel Coverage</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <MessageSquare className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">WhatsApp</h3>
                <p className="text-gray-400 mb-4">
                  Instant responses on South Africa's most popular messaging platform. Handle inquiries 24/7 without
                  lifting a finger.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Instant message responses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Media sharing support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    24/7 availability
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Phone className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">Voice Calls</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered voice assistant handles phone inquiries with natural conversation and intelligent
                  qualification.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Natural voice conversations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Accent recognition
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Human handover option
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Mail className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">SMS</h3>
                <p className="text-gray-400 mb-4">
                  Reach leads who prefer text messages. Perfect for quick updates and appointment confirmations.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Automated follow-ups
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Appointment reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Status updates
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intelligent Qualification */}
          <div className="mb-20 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12">
            <div className="text-center mb-12">
              <Target className="w-16 h-16 text-violet-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Intelligent Lead Qualification</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Your AI assistant asks the tough questions you're too polite to ask, filtering out tire-kickers before
                they waste your time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Qualifying Questions</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-violet-400">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Property Address</p>
                      <p className="text-gray-400 text-sm">Verify location in target areas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-violet-400">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Budget Range</p>
                      <p className="text-gray-400 text-sm">R500k-R1M, R1M-R2M, R2M-R5M, R5M+</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-violet-400">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Timeline</p>
                      <p className="text-gray-400 text-sm">Ideal start date and project duration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-violet-400">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Architectural Plans</p>
                      <p className="text-gray-400 text-sm">Project readiness assessment</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-violet-400">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Property Ownership</p>
                      <p className="text-gray-400 text-sm">Legal authority verification</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Smart Routing</h3>
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <h4 className="text-lg font-semibold text-white">Qualified Leads</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Meets budget, timeline, and location criteria</p>
                    <p className="text-green-400 font-medium">→ Automatically booked into your calendar</p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-red-400" />
                      <h4 className="text-lg font-semibold text-white">Unqualified Leads</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Below budget threshold or outside service area</p>
                    <p className="text-red-400 font-medium">→ Politely redirected with helpful resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Core Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Calendar className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Calendar Integration</h3>
                <p className="text-gray-400">
                  Seamless integration with Google Calendar and Calendly. Qualified leads book directly into your
                  available slots.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Live Dashboard</h3>
                <p className="text-gray-400">
                  Track all conversations, qualification rates, and booking metrics in real-time from your personalized
                  dashboard.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Users className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Human Handover</h3>
                <p className="text-gray-400">
                  Seamlessly transfer complex inquiries to your team when needed. The AI knows when to escalate.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Clock className="w-12 h-12 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">24/7 Availability</h3>
                <p className="text-gray-400">
                  Never miss a lead again. Your AI assistant works around the clock, even when you're on-site or
                  sleeping.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <Zap className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Instant Responses</h3>
                <p className="text-gray-400">
                  Respond to inquiries in seconds, not hours. Keep leads engaged before they contact your competitors.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Performance Analytics</h3>
                <p className="text-gray-400">
                  Understand your lead quality, conversion rates, and ROI with detailed analytics and reporting.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">See It In Action</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Book a personalized demo to see how The Project Pipeline AI can transform your lead qualification process.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base rounded-full"
            >
              <a href="/contact">Book Your Demo</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
