import { createClient } from "@/lib/supabase/server"
// Assuming you have a correct LeadsTable component defined elsewhere
import { LeadsTable } from "@/components/dashboard/leads-table"
import { cookies } from "next/headers" // Import cookies

export default async function LeadsPage() {
  const cookieStore = cookies() // Get cookie store
  const supabase = createClient(cookieStore) // Pass cookie store

  // Fetching from 'leads' table
  const { data: leads, error: leadsError } = await supabase
    .from("leads") // Changed from call_history
    .select("*")
    .order("created_at", { ascending: false })

  if (leadsError) {
    console.error("Error fetching leads:", leadsError)
    // Optionally handle the error, maybe show a message
  }

  return (
    <div className="space-y-6">
      {/* --- MODIFIED: Added Animation --- */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <h2 className="text-3xl font-bold text-[var(--dashboard-text-color)]">Leads Management</h2>
        <p className="text-[var(--dashboard-text-color)]/60 mt-2">View and manage all your leads in one place.</p>
      </div>
      {/* --- END MODIFICATION --- */}

      {/* --- MODIFIED: Added Animation & Delay --- */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
         {/* Pass the fetched leads data to the LeadsTable */}
         <LeadsTable leads={leads || []} />
      </div>
       {/* --- END MODIFICATION --- */}
    </div>
  )
}