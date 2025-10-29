"use client"

import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-12">
          <a href="/" className="text-xl font-bold transition-opacity hover:opacity-80">
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Zappies AI
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="/features" className="text-sm text-gray-300 transition-colors hover:text-white">
              Features
            </a>
            <a href="/how-it-works" className="text-sm text-gray-300 transition-colors hover:text-white">
              How It Works
            </a>
            <a href="/contact" className="text-sm text-gray-300 transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="text-sm text-gray-300 hover:text-white">
            <a href="/auth/login">Sign In</a>
          </Button>
          <Button asChild variant="ghost" className="text-sm text-gray-300 hover:text-white">
            <a href="/contact">Book Demo</a>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-violet-600 to-blue-600 text-sm text-white hover:from-violet-700 hover:to-blue-700"
          >
            <a href="/free-bot">Get Free Bot</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
