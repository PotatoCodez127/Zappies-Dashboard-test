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
       {/* Use sidebar variables for consistency */}
      <header className="h-14 sm:h-16 border-b border-sidebar-border bg-sidebar flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            // Use sidebar accent color for hover
            className="lg:hidden hover:bg-sidebar-accent transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {/* Use foreground color */}
            <Menu className="h-5 w-5 text-foreground" />
          </Button>
           {/* Use foreground color */}
          <h1 className="text-base sm:text-lg font-semibold text-foreground">Dashboard</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
               // Use sidebar accent color for hover
              className="rounded-full hover:bg-sidebar-accent transition-colors duration-200"
            >
               {/* Use foreground color */}
              <User className="h-5 w-5 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          {/* Dropdown content uses glassmorphism via component style */}
          <DropdownMenuContent
            align="end"
            className="w-56 animate-in fade-in-0 zoom-in-95 duration-200" // Removed explicit bg/border, handled by component
          >
            {/* Use foreground color for label */}
            <DropdownMenuLabel className="text-foreground truncate">{user.email}</DropdownMenuLabel>
            {/* Use border color for separator */}
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              // Use muted foreground, focus uses accent colors
              className="text-muted-foreground focus:text-accent-foreground focus:bg-accent cursor-pointer transition-colors duration-150"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
             {/* Use border color for separator */}
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleSignOut}
               // Use muted foreground, focus uses accent colors
              className="text-muted-foreground focus:text-accent-foreground focus:bg-accent cursor-pointer transition-colors duration-150"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {mobileMenuOpen && (
        <div
          // Use standard overlay style
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in-0 duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="lg:hidden">
        <DashboardSidebar mobileMenuOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}
