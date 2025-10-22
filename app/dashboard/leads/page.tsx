/* v0-cool-site/app/dashboard/leads/page.tsx */
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers" // Import cookies
import { LeadsTable } from "@/components/dashboard/leads-table"

export default async function LeadsPage() {
  const cookieStore = cookies() // Get cookie store
  const supabase = createClient(cookieStore) // Pass cookie store

  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
         {/* Use theme variables */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Leads Management</h2>
        <p className="text-muted-foreground mt-2">View and manage all your leads in one place.</p>
      </div>

      {/* Pass leads data; LeadsTable component needs internal update */}
      <LeadsTable leads={leads || []} />
    </div>
  )
}