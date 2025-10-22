/* v0-cool-site/app/pricing/page.tsx */
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Background } from "@/components/background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <>
      <Background />
      <Navigation />

      <main className="pt-32 pb-20 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
             {/* Use theme variables */}
            <div className="inline-block px-5 py-2 bg-destructive/20 border border-destructive rounded-full text-sm mb-5 text-destructive-foreground">
              Transparent Pricing
            </div>
             {/* Use theme variables */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-foreground via-destructive to-foreground bg-clip-text text-transparent text-balance">
              Invest in Your Business Growth
            </h1>
             {/* Use theme variables */}
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your business size and goals. All plans include our core AI technology with
              varying levels of customization and support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Starter Plan */}
            {/* Card uses theme styling */}
            <Card className="hover:border-primary transition-all">
              <CardHeader className="text-center pb-8">
                {/* Use theme variables */}
                <CardTitle className="text-2xl text-foreground mb-2">Starter</CardTitle>
                <CardDescription className="text-muted-foreground">Perfect for growing builders</CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-foreground">R4,999</div>
                  <div className="text-muted-foreground mt-2">/month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 {/* Use theme variables */}
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Lead Qualification AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Basic Client Communication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Up to 100 leads/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Email & WhatsApp integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/demo" className="block">
                   {/* Button uses outline theme variant */}
                  <Button variant="outline" size="lg" className="w-full py-6 rounded-full font-semibold transition-all">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan - Featured */}
             {/* Card uses theme styling, with primary border */}
            <Card className="border-2 border-primary hover:border-primary transition-all relative">
               {/* Use theme variables */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardHeader className="text-center pb-8">
                 {/* Use theme variables */}
                <CardTitle className="text-2xl text-foreground mb-2">Professional</CardTitle>
                <CardDescription className="text-muted-foreground">For established builders</CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-foreground">R9,999</div>
                  <div className="text-muted-foreground mt-2">/month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 {/* Use theme variables */}
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Project Management AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Advanced Client Communication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Up to 500 leads/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Cost Estimation AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Link href="/demo" className="block">
                   {/* Button uses destructive theme variant (or could be primary) */}
                  <Button size="lg" className="w-full py-6 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-full font-semibold hover:scale-105 transition-all">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
             {/* Card uses theme styling */}
            <Card className="hover:border-primary transition-all">
              <CardHeader className="text-center pb-8">
                 {/* Use theme variables */}
                <CardTitle className="text-2xl text-foreground mb-2">Enterprise</CardTitle>
                <CardDescription className="text-muted-foreground">For large-scale operations</CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-foreground">Custom</div>
                  <div className="text-muted-foreground mt-2">Contact us</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 {/* Use theme variables */}
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Unlimited leads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Vendor Management AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Custom AI agent development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>24/7 phone support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <Link href="/demo" className="block">
                   {/* Button uses outline theme variant */}
                  <Button variant="outline" size="lg" className="w-full py-6 rounded-full font-semibold transition-all">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* ROI Calculator Section */}
           {/* Use theme variables */}
          <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 mb-20">
             {/* Use theme variables */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-foreground to-destructive bg-clip-text text-transparent">
              Calculate Your ROI
            </h2>
             {/* Use theme variables */}
            <p className="text-xl text-foreground/80 text-center mb-10 max-w-3xl mx-auto">
              Based on our client data, here's what you can expect from implementing Zappies AI:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
               {/* Use theme variables */}
              <div className="text-center p-6 bg-destructive/10 rounded-2xl">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-3xl font-bold text-foreground mb-2">R2.4M</div>
                <div className="text-muted-foreground">Average Annual Savings</div>
              </div>
              <div className="text-center p-6 bg-destructive/10 rounded-2xl">
                <div className="text-4xl mb-3">📈</div>
                <div className="text-3xl font-bold text-foreground mb-2">4.2x</div>
                <div className="text-muted-foreground">Average ROI</div>
              </div>
              <div className="text-center p-6 bg-destructive/10 rounded-2xl">
                <div className="text-4xl mb-3">⏱️</div>
                <div className="text-3xl font-bold text-foreground mb-2">3 Months</div>
                <div className="text-muted-foreground">Typical Payback Period</div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
             {/* Use theme variables */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-foreground to-destructive bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
               {/* Card uses theme styling */}
              <Card>
                <CardHeader>
                  {/* Use theme variables */}
                  <CardTitle className="text-xl text-foreground">Is there a setup fee?</CardTitle>
                </CardHeader>
                 {/* Use theme variables */}
                <CardContent className="text-foreground/80">
                  No, all plans include free setup and onboarding. We'll work with you to configure the AI agents to
                  match your business processes.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Can I change plans later?</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
                  billing cycle.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">What integrations are included?</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  All plans include email and WhatsApp integration. Professional and Enterprise plans include custom
                  integrations with your existing CRM and project management tools.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Is there a contract?</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                  Starter and Professional plans are month-to-month with no long-term commitment. Enterprise plans
                  typically include annual contracts with volume discounts.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
             {/* Use theme variables */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-destructive bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
             {/* Use theme variables */}
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Schedule a demo to see how Zappies AI can transform your building business and discuss which plan is right
              for you.
            </p>
            <Link href="/demo">
               {/* Button uses theme styling */}
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