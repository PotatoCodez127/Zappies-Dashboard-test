/* v0-cool-site/components/dashboard/sidebar.tsx */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Phone, Users, BarChart3, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Voice Calls", href: "/dashboard/calls", icon: Phone },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface DashboardSidebarProps {
  mobileMenuOpen?: boolean
  onClose?: () => void
}

export function DashboardSidebar({ mobileMenuOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      {/* Use sidebar variables for background and border */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-sidebar-border bg-sidebar flex-shrink-0">
        <div className="flex h-14 sm:h-16 items-center px-6 border-b border-sidebar-border">
          {/* Use foreground text */}
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            AI Agents
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? // Active state: Purple subtle background, purple border/shadow, HIGH CONTRAST TEXT
                      "bg-primary/10 text-primary-foreground shadow-[0_0_15px_rgba(192,0,192,0.3)] border border-primary/50" // Use primary-foreground for text
                    : // Inactive state: Muted text, dark gray hover bg
                      "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                {/* Icon color based on active state */}
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out", // Use sidebar variables
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between px-6 border-b border-sidebar-border">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            onClick={onClose}
          >
            AI Agents
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-sidebar-accent transition-colors duration-200" // Use sidebar accent
          >
            <X className="h-5 w-5 text-foreground" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary-foreground shadow-[0_0_15px_rgba(192,0,192,0.3)] border border-primary/50" // High contrast text
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", // Use sidebar accent
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}