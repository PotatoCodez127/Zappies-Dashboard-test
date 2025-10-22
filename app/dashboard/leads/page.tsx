import { createClient } from "@/lib/supabase/server"
import { LeadsTable } from "@/components/dashboard/leads-table"

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#a83232]">Leads Management</h2>
        <p className="text-[#a83232]/60 mt-2">View and manage all your leads in one place.</p>
      </div>

      <LeadsTable leads={leads || []} />
    </div>
  )
}
