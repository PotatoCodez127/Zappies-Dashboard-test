import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ProblemPainSection } from "@/components/problem-pain-section"
import { FeatureGridSection } from "@/components/feature-grid-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { CombinedScrollSection } from "@/components/combined-scroll-section"
import { ChannelsFeatureSection } from "@/components/channels-feature-section"
import { OfferComparisonSection } from "@/components/offer-comparison-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <VideoSection />
      <ProblemPainSection />
      <ChannelsFeatureSection />
      <CombinedScrollSection />
      <FeatureGridSection />
      <HowItWorksSection />
      <OfferComparisonSection />
      <GuaranteeSection />
      <Footer />
      <SpeedInsights />
    </main>
  )
}
