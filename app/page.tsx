import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Rocket, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent" />
              <span className="text-xl font-bold">Velocity</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-8">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Introducing Velocity 2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            The complete platform to build the web.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto leading-relaxed">
            Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the best web
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
              Get a demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
              Explore the Product
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="p-8 bg-card border-border/40">
              <div className="text-4xl font-bold mb-2">20 days</div>
              <div className="text-sm text-muted-foreground mb-4">saved on daily builds.</div>
              <div className="text-lg font-semibold">ACME Corp</div>
            </Card>
            <Card className="p-8 bg-card border-border/40">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm text-muted-foreground mb-4">faster time to market.</div>
              <div className="text-lg font-semibold">TechFlow</div>
            </Card>
            <Card className="p-8 bg-card border-border/40">
              <div className="text-4xl font-bold mb-2">300%</div>
              <div className="text-sm text-muted-foreground mb-4">increase in performance.</div>
              <div className="text-lg font-semibold">BuildFast</div>
            </Card>
            <Card className="p-8 bg-card border-border/40">
              <div className="text-4xl font-bold mb-2">6x</div>
              <div className="text-sm text-muted-foreground mb-4">faster to build + deploy.</div>
              <div className="text-lg font-semibold">DevTeam</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <Rocket className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Collaboration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Faster iteration. More innovation.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The platform for rapid progress. Let your team focus on shipping features instead of managing
              infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Instant Previews</div>
                  <div className="text-sm text-muted-foreground">
                    See changes live with automatic preview deployments for every commit.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Team Collaboration</div>
                  <div className="text-sm text-muted-foreground">
                    Share feedback and iterate faster with built-in commenting and reviews.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Zero Configuration</div>
                  <div className="text-sm text-muted-foreground">
                    Deploy in seconds with automatic framework detection and optimization.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card className="p-8 bg-card border-border/40">
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
              <img
                src="/modern-dashboard-interface-with-code-editor-and-pr.jpg"
                alt="Platform interface"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Second Feature */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Card className="p-8 bg-card border-border/40 order-2 md:order-1">
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
              <img
                src="/analytics-dashboard-with-performance-metrics-and-g.jpg"
                alt="Analytics dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Card>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Performance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Make teamwork seamless.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tools for your team and stakeholders to share feedback and iterate faster. Built-in analytics, monitoring,
              and collaboration features that scale with your team.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="p-12 md:p-16 bg-card border-border/40 text-center">
          <div className="max-w-2xl mx-auto">
            <Users className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to accelerate your workflow?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join thousands of teams building the future of the web with Velocity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                Talk to Sales
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-accent" />
              <span className="font-semibold">Velocity</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Velocity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
