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
      <header className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 flex-shrink-0 shadow-[0_4px_15px_-5px_theme(colors.primary/0.5)]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-[#2A2A2A] transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5 text-[var(--dashboard-text-color)]" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold text-[var(--dashboard-text-color)]">Dashboard</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#2A2A2A] transition-colors duration-200"
            >
              <User className="h-5 w-5 text-[var(--dashboard-text-color)]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1A1A1A] border-[#2A2A2A] w-56 animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <DropdownMenuLabel className="text-[var(--dashboard-text-color)] truncate">{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="text-[var(--dashboard-text-color)]/80 focus:text-[var(--dashboard-text-color)] focus:bg-[#2A2A2A] cursor-pointer transition-colors duration-150"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-[var(--dashboard-text-color)]/80 focus:text-[var(--dashboard-text-color)] focus:bg-[#2A2A2A] cursor-pointer transition-colors duration-150"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

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
