/* v0-cool-site/components/dashboard/recent-leads.tsx */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Lead {
  id: string
  name: string // Assuming 'name' is the field for full name
  email: string
  company: string | null // Assuming 'company' is company_name
  status: string
  created_at: string
}

interface RecentLeadsProps {
  // Use the defined Lead interface
  leads: Lead[]
}

export function RecentLeads({ leads }: RecentLeadsProps) {
  // Use badge variants for status colors (adapt if needed)
  const getStatusVariant = (status: string): "success" | "warning" | "default" | "outline" => {
    switch (status) {
      case "new":
        return "default" // Uses primary (purple)
      case "contacted":
        return "warning"
      case "converted":
        return "success"
      default:
        return "outline"
    }
  }

  return (
     // Card uses theme styling
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
         {/* Use foreground */}
        <CardTitle className="text-foreground">Recent Leads</CardTitle>
        <Link
          href="/dashboard/leads"
          // Use muted foreground, hover uses foreground
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          // Use muted foreground
          <p className="text-muted-foreground text-sm">No leads yet. They'll appear here once submitted.</p>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                // Use subtle border color
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="space-y-1">
                   {/* Use foreground */}
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                   {/* Use muted foreground */}
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                   {/* Use more muted foreground */}
                  {lead.company && <p className="text-xs text-muted-foreground/60">{lead.company}</p>}
                </div>
                 {/* Badge uses theme variants */}
                <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}