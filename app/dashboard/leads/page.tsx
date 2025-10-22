/* v0-cool-site/app/dashboard/leads/page.tsx */
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers" // Import cookies
import { RecentLeads } from "@/components/dashboard/recent-leads" // Import the correct component
import { AlertTriangle } from "lucide-react" // For error state
import { Card, CardContent } from "@/components/ui/card" // For error state

// Interface matching the 'leads' table (adjust if needed)
interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  status: string
  created_at: string
  // Add other fields if present in your 'leads' table (phone, message, notes etc.)
}

export default async function LeadsPage() {
  const cookieStore = cookies() // Get cookies
  const supabase = createClient(cookieStore) // Pass cookies to server client

  let leads: Lead[] = []
  let fetchError: string | null = null

  try {
    const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, company, status, created_at") // Select necessary fields for RecentLeads
        .order("created_at", { ascending: false })
        .limit(100) // Limit initial fetch if desired

    if (error) {
        throw error
    }
    leads = data || []
  } catch (error: any) {
    console.error("Error fetching leads:", error)
    fetchError = error.message || "Failed to fetch leads."
  }

  return (
    <div className="space-y-6">
      <div>
         {/* Use theme text colors */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Leads Management</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">View and manage all your leads in one place.</p>
      </div>

      {fetchError ? (
         // Use theme Card and text colors for error display
         <Card>
            <CardContent className="pt-6">
               <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground tracking-tight">Error Loading Leads</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">{fetchError}</p>
               </div>
            </CardContent>
         </Card>
      ) : (
         // Use the RecentLeads component, which now correctly uses theme styles
         <RecentLeads leads={leads} />
         // Consider adding a more comprehensive table/view here for managing *all* leads later
      )}
    </div>
  )
}