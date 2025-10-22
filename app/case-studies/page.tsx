/* v0-cool-site/app/case-studies/page.tsx */
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Background } from "@/components/background" // Assuming Background handles its own styling
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaseStudiesPage() {
  return (
    <>
      {/* Assuming Background component uses theme variables */}
      <Background />
      <Navigation />

      <main className="pt-32 pb-20 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            {/* Use theme variables */}
            <div className="inline-block px-5 py-2 bg-destructive/20 border border-destructive rounded-full text-sm mb-5 text-destructive-foreground">
              Success Stories
            </div>
            {/* Use theme variables */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-foreground via-destructive to-foreground bg-clip-text text-transparent text-balance">
              Real Results from South Africa's Leading Builders
            </h1>
            {/* Use theme variables */}
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Discover how premium home builders are transforming their operations and scaling their businesses with
              Zappies AI.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-16 mb-20">
            {/* Case Study 1 */}
            {/* Card styling handled by component */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10">
                  {/* Use theme variables */}
                  <div className="inline-block px-4 py-1 bg-destructive/30 rounded-full text-sm mb-4 text-destructive-foreground">
                    Cape Town, Western Cape
                  </div>
                  <CardHeader className="p-0 mb-6">
                    {/* Use theme variables */}
                    <CardTitle className="text-3xl text-foreground mb-3">
                      Luxury Homes Cape Town: 3x Lead Conversion
                    </CardTitle>
                    {/* Use theme variables */}
                    <CardDescription className="text-muted-foreground text-lg">
                      How a boutique builder tripled their lead conversion rate with AI-powered qualification
                    </CardDescription>
                  </CardHeader>
                  {/* Use theme variables */}
                  <CardContent className="p-0 space-y-4 text-foreground/80">
                    <p className="leading-relaxed">
                      Luxury Homes Cape Town was struggling to respond to inquiries quickly enough, losing potential
                      clients to competitors. After implementing our Lead Qualification AI, they saw immediate results.
                    </p>
                    {/* Use theme variables */}
                    <div className="grid grid-cols-2 gap-4 py-6">
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">3x</div>
                        <div className="text-sm text-muted-foreground">Lead Conversion</div>
                      </div>
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">92%</div>
                        <div className="text-sm text-muted-foreground">Response Time Reduction</div>
                      </div>
                    </div>
                    {/* Use theme variables */}
                    <blockquote className="border-l-4 border-destructive pl-4 italic text-foreground/90">
                      "Zappies AI transformed how we handle inquiries. We're now responding instantly, 24/7, and our
                      conversion rate has never been higher."
                    </blockquote>
                    <p className="text-sm text-muted-foreground">— Michael van der Merwe, Owner</p>
                  </CardContent>
                </div>
                {/* Use theme variables */}
                <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center p-10">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🏠</div>
                    {/* Use theme variables */}
                    <div className="text-2xl font-bold text-foreground">R4.2M</div>
                    <div className="text-muted-foreground">Additional Revenue in 6 Months</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case Study 2 */}
            {/* Card styling handled by component */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Use theme variables */}
                <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center p-10 order-2 md:order-1">
                  <div className="text-center">
                    <div className="text-8xl mb-4">⏱️</div>
                     {/* Use theme variables */}
                    <div className="text-2xl font-bold text-foreground">15 Hours</div>
                    <div className="text-muted-foreground">Saved Per Week</div>
                  </div>
                </div>
                <div className="p-10 order-1 md:order-2">
                  {/* Use theme variables */}
                  <div className="inline-block px-4 py-1 bg-destructive/30 rounded-full text-sm mb-4 text-destructive-foreground">
                    Johannesburg, Gauteng
                  </div>
                  <CardHeader className="p-0 mb-6">
                     {/* Use theme variables */}
                    <CardTitle className="text-3xl text-foreground mb-3">
                      Premier Builds JHB: Automated Project Management
                    </CardTitle>
                    {/* Use theme variables */}
                    <CardDescription className="text-muted-foreground text-lg">
                      Streamlining operations and eliminating administrative bottlenecks
                    </CardDescription>
                  </CardHeader>
                   {/* Use theme variables */}
                  <CardContent className="p-0 space-y-4 text-foreground/80">
                    <p className="leading-relaxed">
                      Managing 12 concurrent luxury home projects was overwhelming their small team. Our Project
                      Management AI automated status updates, resource allocation, and client communications.
                    </p>
                    {/* Use theme variables */}
                    <div className="grid grid-cols-2 gap-4 py-6">
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">87%</div>
                        <div className="text-sm text-muted-foreground">Less Admin Time</div>
                      </div>
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">100%</div>
                        <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                      </div>
                    </div>
                    {/* Use theme variables */}
                    <blockquote className="border-l-4 border-destructive pl-4 italic text-foreground/90">
                      "We've gone from drowning in admin work to focusing on what we do best - building exceptional
                      homes. The AI handles everything else."
                    </blockquote>
                    <p className="text-sm text-muted-foreground">— Sarah Naidoo, Project Director</p>
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Case Study 3 */}
            {/* Card styling handled by component */}
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10">
                   {/* Use theme variables */}
                  <div className="inline-block px-4 py-1 bg-destructive/30 rounded-full text-sm mb-4 text-destructive-foreground">
                    Durban, KwaZulu-Natal
                  </div>
                  <CardHeader className="p-0 mb-6">
                     {/* Use theme variables */}
                    <CardTitle className="text-3xl text-foreground mb-3">
                      Coastal Custom Homes: Enhanced Client Experience
                    </CardTitle>
                    {/* Use theme variables */}
                    <CardDescription className="text-muted-foreground text-lg">
                      Delivering white-glove service at scale with AI-powered communication
                    </CardDescription>
                  </CardHeader>
                   {/* Use theme variables */}
                  <CardContent className="p-0 space-y-4 text-foreground/80">
                    <p className="leading-relaxed">
                      High-net-worth clients expect constant communication and updates. Our Client Communication AI
                      provides personalized updates and instant responses while maintaining the premium experience.
                    </p>
                    {/* Use theme variables */}
                    <div className="grid grid-cols-2 gap-4 py-6">
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">98%</div>
                        <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                      </div>
                      <div className="text-center p-4 bg-destructive/20 rounded-xl">
                        <div className="text-3xl font-bold text-foreground mb-1">5x</div>
                        <div className="text-sm text-muted-foreground">More Referrals</div>
                      </div>
                    </div>
                     {/* Use theme variables */}
                    <blockquote className="border-l-4 border-destructive pl-4 italic text-foreground/90">
                      "Our clients love the instant updates and 24/7 support. They feel more connected to their project
                      than ever before, and we're getting more referrals than we can handle."
                    </blockquote>
                    <p className="text-sm text-muted-foreground">— David Pillay, Managing Director</p>
                  </CardContent>
                </div>
                 {/* Use theme variables */}
                <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center p-10">
                  <div className="text-center">
                    <div className="text-8xl mb-4">⭐</div>
                     {/* Use theme variables */}
                    <div className="text-2xl font-bold text-foreground">4.9/5</div>
                    <div className="text-muted-foreground">Average Client Rating</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Overview */}
           {/* Use theme variables */}
          <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 mb-20">
             {/* Use theme variables */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-foreground to-destructive bg-clip-text text-transparent">
              Combined Impact Across All Clients
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               {/* Use theme variables */}
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">R12.8M</div>
                <div className="text-muted-foreground">Total Revenue Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">450+</div>
                <div className="text-muted-foreground">Hours Saved Monthly</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">96%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">4.2x</div>
                <div className="text-muted-foreground">Average ROI</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
             {/* Use theme variables */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-destructive bg-clip-text text-transparent">
              Ready to Write Your Success Story?
            </h2>
             {/* Use theme variables */}
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join these leading builders and discover how Zappies AI can transform your business.
            </p>
            <Link href="/demo">
               {/* Use theme variables for button */}
              <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-destructive/30 transition-all">
                Schedule Your Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}