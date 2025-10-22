/* v0-cool-site/components/dashboard/recent-activity.tsx */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, CalendarCheck, Clock, AlertTriangle } from "lucide-react" // Added AlertTriangle
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button" // Added Button import

// Define a unified interface for activity items
interface ActivityItem {
  id: string
  type: "conversation" | "meeting"
  description: string
  timestamp: Date
  status?: string
}

export function RecentActivity() {
  const companySupabase = useCompanySupabase()
  const { toast } = useToast()
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ... (useEffect remains the same as previous correct version) ...
  useEffect(() => {
    async function fetchRecentActivity() {
      if (!companySupabase) {
        setIsLoading(false);
        console.log("RecentActivity: Company Supabase client not available.");
        return;
      }
      console.log("RecentActivity: Fetching data...");
      setIsLoading(true);
      try {
        const fetchLimit = 5;

        const convPromise = companySupabase
          .from("conversation_history")
          .select("conversation_id, created_at, status")
          .order("created_at", { ascending: false })
          .limit(fetchLimit);

        const meetingsPromise = companySupabase
          .from("meetings")
          .select("id, full_name, created_at, status") // Use 'full_name'
          .order("created_at", { ascending: false })
          .limit(fetchLimit);

        const [convResult, meetingsResult] = await Promise.all([convPromise, meetingsPromise]);

        if (convResult.error) throw convResult.error;
        if (meetingsResult.error) throw meetingsResult.error;

        const conversationActivities: ActivityItem[] = (convResult.data || []).map((conv) => ({
          id: conv.conversation_id,
          type: "conversation",
          description: `New conversation started (ID: ...${conv.conversation_id.slice(-6)})`,
          timestamp: new Date(conv.created_at),
          status: conv.status,
        }));

        const meetingActivities: ActivityItem[] = (meetingsResult.data || []).map((meeting) => ({
          id: meeting.id,
          type: "meeting",
          description: `Meeting booked: ${meeting.full_name || "Unknown"}`, // Use 'full_name'
          timestamp: new Date(meeting.created_at),
          status: meeting.status,
        }));

        const combinedActivities = [...conversationActivities, ...meetingActivities]
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 5); // Limit to latest 5 combined

        console.log("RecentActivity: Data processed.", combinedActivities);
        setActivities(combinedActivities);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        toast({ title: "Error", description: "Could not fetch recent activity.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentActivity();
  }, [companySupabase, toast]);


  const getActivityIcon = (type: "conversation" | "meeting") => {
    // Icon uses muted color
    return type === "conversation" ? (
      <MessageSquare className="h-5 w-5 text-muted-foreground" />
    ) : (
      <CalendarCheck className="h-5 w-5 text-muted-foreground" />
    )
  }
  const getActivityLink = (item: ActivityItem) => {
    // Link depends on type
    return item.type === "conversation" ? "/dashboard/conversations" : "/dashboard/calls" // Link meetings to calls page
  }
  const getStatusBadge = (status?: string) => {
    // Use Badge variants based on status
    if (!status) return null
    let variant: "success" | "warning" | "error" | "outline" | "default" = "outline"
    if (status === "confirmed" || status === "active") variant = "success"
    if (status === "pending_confirmation" || status === "handover") variant = "warning" // Treat handover as warning
    if (status === "cancelled") variant = "error"
    if (status === "completed") variant = "default" // Use default (purple) for completed

    return (
      <Badge variant={variant} className="text-xs ml-auto flex-shrink-0">
        {status.replace(/_/g, " ")}
      </Badge>
    )
  }

  // --- RENDER LOGIC ---
  return (
    // Card uses theme styles
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        {/* CardTitle uses theme color */}
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {/* Loading state uses muted background */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3">
                <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 w-1/4 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !companySupabase ? (
           // DB Not Connected uses theme colors
          <div className="text-center py-6 text-sm text-muted-foreground">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            Connect database in settings to view activity.
            <Button size="sm" variant="outline" asChild className="mt-4">
               <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </div>
        ) : activities.length === 0 ? (
           // Use muted foreground color
          <p className="text-muted-foreground text-sm text-center py-6">No recent activity found.</p>
        ) : (
          <div className="space-y-1">
            {activities.map((activity) => (
              <Link href={getActivityLink(activity)} key={activity.id} className="block group">
                 {/* Hover uses accent background */}
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="mt-1 flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      {/* Use foreground color */}
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary-foreground transition-colors">
                        {activity.description}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}