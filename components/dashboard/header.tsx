/* v0-cool-site/components/dashboard/header.tsx */
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
import { DashboardSidebar } from "@/components/dashboard/sidebar"

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
       {/* Use sidebar variables for consistency: black bg, subtle purple border */}
      <header className="h-14 sm:h-16 border-b border-sidebar-border bg-sidebar flex items-center justify-between px-4 sm:px-6 flex-shrink-0 relative z-20"> {/* Ensure header is above main glow */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            // Use sidebar accent color (dark gray) for hover
            className="lg:hidden hover:bg-sidebar-accent transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {/* Use foreground color (light gray/white) */}
            <Menu className="h-5 w-5 text-foreground" />
          </Button>
           {/* Use foreground color (light gray/white) */}
          <h1 className="text-base sm:text-lg font-semibold text-foreground">Dashboard</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
               // Use sidebar accent color (dark gray) for hover
              className="rounded-full hover:bg-sidebar-accent transition-colors duration-200"
            >
               {/* Use foreground color (light gray/white) */}
              <User className="h-5 w-5 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          {/* Dropdown content uses glassmorphism via component style */}
          <DropdownMenuContent
            align="end"
            className="w-56" // Removed animation classes for simplicity, handled by component itself
          >
            {/* Use foreground color for label */}
            <DropdownMenuLabel className="font-normal text-foreground truncate">{user.email}</DropdownMenuLabel>
            {/* Use border color (subtle purple) for separator */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              // Use default text, focus uses accent colors from component
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" /> {/* Icon uses muted */}
              Settings
            </DropdownMenuItem>
             {/* Use border color (subtle purple) for separator */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              // Use default text, focus uses accent colors from component
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4 text-muted-foreground" /> {/* Icon uses muted */}
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          // Standard dark overlay with blur
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in-0 duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Instance */}
      <div className="lg:hidden">
        <DashboardSidebar mobileMenuOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}