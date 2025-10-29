import { ThemeToggle } from "@/components/theme-toggle"
import { Rocket } from "@/components/icons" // Added import for Rocket
import Link from "next/link" // Added import for Link
import { Button } from "@/components/ui/button" // Added import for Button

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Shipable</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
        {/* </CHANGE> */}
      </div>
    </nav>
  )
}
