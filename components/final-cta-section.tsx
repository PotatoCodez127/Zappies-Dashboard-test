import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Starfield } from "@/components/starfield"

export function FinalCTASection() {
  return (
    <section className="relative bg-black py-32">
      <Starfield density={40} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Ready to Build Your Qualified Pipeline?
        </h2>

        <p className="mb-12 text-pretty text-xl leading-relaxed text-gray-400 md:text-2xl">
          Stop wasting time on leads that go nowhere. Let's build your AI gatekeeper.
        </p>

        <Button
          size="lg"
          className="group h-14 bg-gradient-to-r from-violet-600 to-blue-600 px-8 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
        >
          Book Your Demo
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  )
}
