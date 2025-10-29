import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Starfield />
      <Navigation />

      <div className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
              <p className="leading-relaxed">
                At Zappies AI, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our Project Pipeline AI service and website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              <p className="leading-relaxed">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Contact information (name, email address, phone number, company name)</li>
                <li>Business information (company details, project requirements, budget ranges)</li>
                <li>
                  Lead data processed through your AI assistant (contact details, property information, budget
                  information)
                </li>
                <li>Usage data and analytics about how you interact with our service</li>
                <li>Communication data when you contact our support team</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
              <p className="leading-relaxed">We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide, maintain, and improve our AI lead qualification services</li>
                <li>Process and manage your leads through our multi-channel system</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in
                transit and at rest, regular security assessments, and strict access controls.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Data Retention</h2>
              <p className="leading-relaxed">
                We retain your information for as long as necessary to provide our services and fulfill the purposes
                outlined in this Privacy Policy. Lead data is retained according to your preferences and can be deleted
                upon request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
              <p className="leading-relaxed">You have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing of your information</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
              <p className="leading-relaxed">
                Our service integrates with third-party platforms including WhatsApp, SMS providers, and calendar
                services. These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="leading-relaxed">
                Email: privacy@zappies-ai.com
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
