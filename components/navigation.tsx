/* v0-cool-site/components/navigation.tsx */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav
       // Use theme variables for background and glassmorphism
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-border" : "py-5 bg-background/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-[5%] flex items-center justify-between">
        <Link
          href="/"
           // Use theme variables for gradient
          className="text-2xl font-extrabold bg-gradient-to-r from-foreground via-destructive to-foreground bg-clip-text text-transparent cursor-pointer"
        >
          Zappies AI
        </Link>

        <div className="hidden md:flex items-center gap-10">
           {/* Use theme variables for text and border */}
          <Link
            href="/solutions"
            className={`text-foreground text-base font-medium relative transition-colors hover:text-foreground/80 after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-destructive after:transition-all hover:after:w-full ${
              pathname === "/solutions" ? "after:w-full" : ""
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/#features"
            className="text-foreground text-base font-medium relative transition-colors hover:text-foreground/80 after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-destructive after:transition-all hover:after:w-full"
          >
            Features
          </Link>
          <Link
            href="/case-studies"
            className={`text-foreground text-base font-medium relative transition-colors hover:text-foreground/80 after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-destructive after:transition-all hover:after:w-full ${
              pathname === "/case-studies" ? "after:w-full" : ""
            }`}
          >
            Case Studies
          </Link>
          <Link
            href="/pricing"
            className={`text-foreground text-base font-medium relative transition-colors hover:text-foreground/80 after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-destructive after:transition-all hover:after:w-full ${
              pathname === "/pricing" ? "after:w-full" : ""
            }`}
          >
            Pricing
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className={`text-foreground text-base font-medium relative transition-colors hover:text-foreground/80 after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-destructive after:transition-all hover:after:w-full ${
                pathname.startsWith("/dashboard") ? "after:w-full" : ""
              }`}
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <Link href="/demo">
               {/* Use theme variables for button */}
              <Button size="sm" className="px-7 py-3 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-destructive/30 transition-all">
                Book Demo
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login">
               {/* Use theme variables for button */}
              <Button size="sm" className="px-7 py-3 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-destructive/30 transition-all">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}