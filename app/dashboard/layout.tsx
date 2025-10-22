// File: app/dashboard/layout.tsx
import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { CompanyProvider } from "@/components/dashboard/company-provider"
import { Toaster } from "@/components/ui/toaster"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // ... (user/company fetching logic remains the same) ...
  const { data: companyUser, error: companyUserError } = await supabase
    .from("company_users")
    .select("company_id")
    .eq("user_id", user.id)
    .single()

  if (companyUserError || !companyUser) {
    console.error("Dashboard Layout Error: Could not find company link for user.", companyUserError)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
        <p className="text-center">Error: Could not verify your company membership. Please contact support.</p>
      </div>
    )
  }

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyUser.company_id)
    .single()

  if (companyError || !company) {
    console.error("Dashboard Layout Error: Could not fetch company details.", companyError)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
        <p className="text-center">Error: Could not load company data. Please check permissions and contact support.</p>
      </div>
    )
  }
  // ... (end user/company fetching logic) ...


  return (
    <CompanyProvider company={company}>
      {/* Outer div still has bg-background */}
      <div className="flex h-screen bg-background overflow-hidden relative">
        {/* --- MODIFICATION START --- */}
        {/* Reintroduce gradient with much lower opacity and potentially smaller spread */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(192,0,192,0.04) 0%, transparent 50%)",
            // WAS (commented out): background: "radial-gradient(ellipse at center, rgba(192,0,192,0.08) 0%, transparent 60%)",
          }}
        />
        {/* --- MODIFICATION END --- */}

        <DashboardSidebar />
        {/* This div correctly uses z-10 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
          <DashboardHeader user={user} />
          {/* Main element still has bg-background */}
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </CompanyProvider>
  )
}