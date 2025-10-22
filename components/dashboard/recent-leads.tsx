/* v0-cool-site/components/dashboard/recent-leads.tsx */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, User, Mail, AlertTriangle } from "lucide-react" // Added icons
import { Avatar, AvatarFallback } from "@/components/ui/avatar" // Added Avatar

interface Lead {
  id: string
  name: string // Assuming name exists based on original code, changed from full_name
  email: string
  company: string | null // Assuming company exists based on original code, changed from company_name
  status: string
  created_at: string
}

interface RecentLeadsProps {
  leads: Lead[]
}

export function RecentLeads({ leads }: RecentLeadsProps) {

  // Use Badge variants for status
  const getStatusBadge = (status: string) => {
    let variant: "success" | "warning" | "default" | "outline" = "default"; // Default to purple for 'new'
    if (status === "contacted") variant = "warning";
    if (status === "converted") variant = "success";
    if (status !== "new" && status !== "contacted" && status !== "converted") variant = "outline"; // Fallback for others

    return <Badge variant={variant} className="capitalize">{status}</Badge>;
  }

  return (
    // Card uses theme styles
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
         {/* CardTitle uses theme color */}
        <CardTitle>Recent Leads</CardTitle>
         {/* Link uses muted color, hover uses foreground */}
        <Link
          href="/dashboard/leads"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
           // Use muted text color
          <div className="text-center py-6 text-sm text-muted-foreground">
             <User className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
            No leads yet. They'll appear here once submitted.
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              // Use theme border
              <div
                key={lead.id}
                className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0"
              >
                 {/* Add Avatar */}
                <Avatar className="h-9 w-9 flex-shrink-0 hidden sm:flex">
                   <AvatarFallback>{lead.name ? lead.name.split(" ").map(n=>n[0]).join("") : "??"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1 overflow-hidden">
                   {/* Use foreground color */}
                  <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                   {/* Use muted color */}
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
                     <Mail className="h-3 w-3 flex-shrink-0"/> {lead.email}
                  </p>
                  {/* Use muted color */}
                  {lead.company && <p className="text-xs text-muted-foreground/80 truncate">{lead.company}</p>}
                </div>
                 {/* Use Badge component with variants */}
                <div className="flex-shrink-0">
                   {getStatusBadge(lead.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}