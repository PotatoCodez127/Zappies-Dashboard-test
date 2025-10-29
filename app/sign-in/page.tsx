"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="relative min-h-screen bg-black">
      <Starfield />
      <Navigation />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your Project Pipeline AI dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm text-gray-300">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-violet-400 hover:text-violet-300">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="/contact" className="text-violet-400 hover:text-violet-300">
                  Book a demo
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
