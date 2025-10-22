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
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-border bg-sidebar flex-shrink-0">
        <div className="flex h-14 sm:h-16 items-center px-6 border-b border-border">
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
                    ? // Updated active state with cyan background and glow effect
                      "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)] border border-primary/30"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
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
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between px-6 border-b border-border">
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
            className="hover:bg-accent transition-colors duration-200"
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
                    ? // Updated active state with cyan background and glow effect
                      "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)] border border-primary/30"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
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
