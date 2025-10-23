"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar" // Fixed import to use named export instead of default

interface DashboardHeaderProps {
  user: {
    email?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await fetch("/auth/signout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <>
      {/* Header element with fixed styles and purple glow */}
      <header
        className="relative z-10 h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 flex-shrink-0" // Added relative z-10
        style={{
          boxShadow: '0 4px 12px 0px oklch(0.6 0.25 300 / 0.3)' // Purple glow via inline style
        }}
      >
        <div className="flex items-center gap-3">
          {/* Mobile Menu Burger Button (Fixes Bug #2) */}
          <Button
            type="button" // Added type="button" for reliable click behavior
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-accent transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5 text-[var(--dashboard-text-color)]" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold text-[var(--dashboard-text-color)]">Dashboard</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* User Icon Button (Fixes Bug #1) */}
            <Button
              type="button" // Added type="button" for reliable click behavior
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent transition-colors duration-200" // Used theme variable for hover
            >
              <User className="h-5 w-5 text-[var(--dashboard-text-color)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover border-border w-56 animate-in fade-in-0 zoom-in-95 duration-200" // Used theme variables for consistency
          >
            <DropdownMenuLabel className="text-[var(--dashboard-text-color)] truncate">{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="text-[var(--dashboard-text-color)]/80 focus:text-[var(--dashboard-text-color)] focus:bg-accent cursor-pointer transition-colors duration-150"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-[var(--dashboard-text-color)]/80 focus:text-[var(--dashboard-text-color)] focus:bg-accent cursor-pointer transition-colors duration-150"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in-0 duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="lg:hidden">
        <DashboardSidebar mobileMenuOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}