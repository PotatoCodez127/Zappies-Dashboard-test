import { CheckCircle2, MessageSquare, Calendar, Target } from "lucide-react"

export function ChannelsFeatureSection() {
  const features = [
    {
      icon: CheckCircle2,
      headline: "Your 24/7 Qualification Expert",
      description:
        "Our AI asks the tough questions upfront—budget, location, timeline—so you don't waste time on site visits that go nowhere.",
      visual: (
        <div className="flex h-32 items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-violet-400" />
              <div className="h-1.5 w-20 rounded-full bg-violet-400/60" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
              <div className="h-1.5 w-16 rounded-full bg-purple-400/60" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-fuchsia-400" />
              <div className="h-1.5 w-24 rounded-full bg-fuchsia-400/60" />
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: MessageSquare,
      headline: "Works Across All Channels",
      description:
        "Capture and qualify leads seamlessly whether they contact you via WhatsApp, SMS, or even a direct voice call.",
      visual: (
        <div className="flex h-32 items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
            <MessageSquare className="h-6 w-6 text-green-400" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
            <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">
            <svg className="h-6 w-6 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.4-.5-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      icon: Calendar,
      headline: "Direct-to-Calendar Booking",
      description:
        "High-value, pre-qualified leads are booked directly into your Google Calendar, automatically filling your pipeline.",
      visual: (
        <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 p-6">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-sm ${
                  [5, 12, 19, 26].includes(i) ? "bg-emerald-400" : i < 7 ? "bg-white/20" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: Target,
      headline: "Focus Only on Ideal Clients",
      description:
        "Stop chasing tyre-kickers. Spend your valuable time closing deals with clients who match your exact budget and project criteria.",
      visual: (
        <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 p-6">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full border-2 border-rose-400/30" />
            <div className="absolute h-16 w-16 rounded-full border-2 border-rose-400/50" />
            <div className="absolute h-8 w-8 rounded-full border-2 border-rose-400/70" />
            <div className="h-3 w-3 rounded-full bg-rose-400" />
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="features" className="relative bg-gradient-to-b from-black to-gray-950/50 py-24 scroll-mt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-balance text-center text-4xl font-bold leading-tight md:text-5xl">
          More Than Just a Chatbot
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-500/40 hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.25)]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>

                <h3 className="mb-3 text-xl font-bold">{feature.headline}</h3>
                <p className="mb-6 text-pretty text-sm leading-relaxed text-gray-400">{feature.description}</p>

                {feature.visual}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
