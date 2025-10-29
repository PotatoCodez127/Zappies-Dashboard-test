import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Starfield />
      <Navigation />

      <div className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Terms of Service</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using Zappies AI's Project Pipeline AI service, you agree to be bound by these Terms of
                Service. If you disagree with any part of these terms, you may not access our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Service Description</h2>
              <p className="leading-relaxed">
                Zappies AI provides an AI-powered lead management and pre-qualification system designed for high-end
                custom home renovators. Our service includes:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Multi-channel lead qualification (WhatsApp, voice calls, SMS)</li>
                <li>Automated lead routing and calendar integration</li>
                <li>Live dashboard for lead management</li>
                <li>Custom AI assistant setup and configuration</li>
                <li>Ongoing system updates and support</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
              <p className="leading-relaxed">As a user of our service, you agree to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide accurate and complete information during onboarding</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Not use the service for any unlawful or fraudulent purposes</li>
                <li>Not attempt to reverse engineer or compromise our systems</li>
                <li>Respond to qualified leads in a timely and professional manner</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Payment Terms</h2>
              <p className="leading-relaxed">Our service operates on a performance-based payment structure:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>50% of the service fee is due upfront upon signing</li>
                <li>The remaining 50% is due when you generate revenue using our system</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to modify pricing with 30 days notice</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Service Guarantee</h2>
              <p className="leading-relaxed">
                We stand behind our service with a performance-based guarantee. If our AI system fails to pre-qualify
                leads according to your specifications, we will work with you to optimize the system at no additional
                cost. The second payment is only due when you successfully generate revenue using our system.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
              <p className="leading-relaxed">
                The Project Pipeline AI system, including all software, algorithms, and documentation, is the
                intellectual property of Zappies AI. You are granted a limited, non-exclusive license to use the service
                for your business purposes. You may not copy, modify, or distribute our technology without written
                permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Data Ownership</h2>
              <p className="leading-relaxed">
                You retain full ownership of all lead data processed through our system. We act as a data processor on
                your behalf and will not use your lead data for any purpose other than providing our service to you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
              <p className="leading-relaxed">
                Zappies AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use the service. Our total liability shall not exceed the
                amount you paid for the service in the 12 months preceding the claim.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Service Modifications</h2>
              <p className="leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our service at any time. We will
                provide reasonable notice of any material changes that affect your use of the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Termination</h2>
              <p className="leading-relaxed">
                Either party may terminate this agreement with 30 days written notice. Upon termination, you will retain
                access to your lead data for 90 days, after which it will be permanently deleted unless you request an
                export.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of South Africa, without
                regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              <p className="leading-relaxed">For questions about these Terms of Service, please contact us at:</p>
              <p className="leading-relaxed">
                Email: legal@zappies-ai.com
                <br />
                Address: Cape Town, South Africa
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
