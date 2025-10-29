import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CompanyProvider } from "@/components/dashboard/company-provider"

// NOTE: This interface must match the expected structure in company-provider.tsx
interface Company {
  id: string
  name: string
  owner_id: string
  supabase_url: string | null
  supabase_anon_key: string | null
}

export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Basic safety check for environment variables
    console.error("Missing Supabase environment variables.")
    return redirect("/auth/login")
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }

  // 1. FIX: Fetch the user's company_id from the CORRECT table: company_users
  const { data: companyUser, error: companyUserError } = await supabase
    .from("company_users") // <-- FIX: Changed from 'profiles'
    .select("company_id")
    .eq("user_id", user.id) // <-- FIX: Changed from 'id' to 'user_id'
    .maybeSingle() 

  if (companyUserError) {
     console.error("Dashboard Layout Error: Error fetching company link:", companyUserError)
  }

  const companyId = companyUser?.company_id ?? null

  // 2. Fetch the full company object if an ID exists
  let company: Company | null = null
  if (companyId) {
    // Select all fields required by the Company interface
    const { data: companyData, error: companyDataError } = await supabase
      .from("companies")
      .select("id, name, owner_id, supabase_url, supabase_anon_key")
      .eq("id", companyId)
      .maybeSingle()

    if (companyDataError) {
        console.error("Dashboard Layout Error: Error fetching company data:", companyDataError)
    }

    // Assign the fetched data (type casting for convenience)
    company = companyData as Company | null
  } else {
    // Log why company is null (user is not linked to a company yet)
    console.log("LOG: User is authenticated but not linked to a company (company_id is null).")
  }

  // 3. Pass the full company object to the Client Component Provider
  return (
    <CompanyProvider company={company}>
      <div className="flex h-screen bg-background text-[var(--dashboard-text-color)]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0A0A0A] p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </CompanyProvider>
  )
}
