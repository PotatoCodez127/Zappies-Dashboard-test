"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MessageSquare, Calendar, AlertTriangle, PieChartIcon, BarChartHorizontal } from "lucide-react"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// Import Recharts components
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Interface for meeting status data (Pie Chart)
interface MeetingStatusData {
  name: string
  value: number
}
// Interface for hourly activity data (Bar Chart)
interface HourlyActivityData {
  hour: string // e.g., "08", "14"
  meetings: number
}

// Define status name mapping (maps internal DB status to displayed name)
const STATUS_NAMES: { [key: string]: string } = {
  confirmed: "Confirmed",
  pending_confirmation: "Pending",
  cancelled: "Cancelled",
}

// Define theme colors for chart segments
const THEME_CHART_COLORS: { [key: string]: string } = {
  Confirmed: "#00e0c6", // Teal (Consistent with Overview chart 'Confirmed' line)
  Pending: "oklch(0.65 0.2 40)", // Theme's destructive/warning (Yellow/Orange)
  Cancelled: "oklch(0.4 0.1 20)", // Darker red/grey
  Default: "var(--primary)", // Theme primary purple
}

// Helper function to get the color based on the segment name
const getThemeColor = (statusName: string) => {
  return THEME_CHART_COLORS[statusName] || THEME_CHART_COLORS.Default;
};


export default function AnalyticsPage() {
  const companySupabase = useCompanySupabase()
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    totalConversations: 0,
    totalMeetings: 0,
    confirmationRate: 0,
  })
  const [meetingStatusData, setMeetingStatusData] = useState<MeetingStatusData[]>([])
  // State for the new hourly chart
  const [hourlyActivityData, setHourlyActivityData] = useState<HourlyActivityData[]>([])

  useEffect(() => {
    async function fetchAnalytics() {
      if (!companySupabase) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      try {
        const convPromise = companySupabase.from("conversation_history").select("*", { count: "exact", head: true })
        // Fetch created_at (for hourly chart) and status (for pie chart/KPIs)
        const meetingsPromise = companySupabase.from("meetings").select("created_at, status")

        const [convResult, meetingsResult] = await Promise.all([convPromise, meetingsPromise])

        if (convResult.error) throw convResult.error
        if (meetingsResult.error) throw meetingsResult.error

        const meetings = meetingsResult.data || []
        const totalMeetings = meetings.length
        const confirmed = meetings.filter((m) => m.status === "confirmed").length
        const confirmationRate = totalMeetings > 0 ? Math.round((confirmed / totalMeetings) * 100) : 0

        // --- Process data for the Pie Chart ---
        const statusCounts: { [key: string]: number } = {}
        meetings.forEach((meeting) => {
          const status = meeting.status || "unknown"
          statusCounts[status] = (statusCounts[status] || 0) + 1
        })
        const pieDataArray: MeetingStatusData[] = Object.entries(statusCounts)
          .map(([status, count]) => ({
            name: STATUS_NAMES[status] || status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            value: count,
          }))
          .sort((a, b) => b.value - a.value)
        setMeetingStatusData(pieDataArray)
        // --- End Pie Chart processing ---

        // --- Process data for Hourly Bar Chart ---
        const hourlyCounts: { [key: number]: number } = {}
        meetings.forEach((meeting) => {
          const date = new Date(meeting.created_at)
          if (isNaN(date.getTime())) return // Skip invalid dates
          const hour = date.getHours() // Get hour (0-23)
          hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1
        })
        // Create data for all 24 hours, including those with 0 meetings
        const hourlyDataArray: HourlyActivityData[] = Array.from({ length: 24 }, (_, i) => ({
          hour: i.toString().padStart(2, "0"), // Format as "00", "01", ... "23"
          meetings: hourlyCounts[i] || 0,
        }))
        console.log("Analytics: Processed Hourly Chart data:", hourlyDataArray)
        setHourlyActivityData(hourlyDataArray)
        // --- End Hourly Bar Chart processing ---

        setMetrics({
          totalConversations: convResult.count || 0,
          totalMeetings: totalMeetings,
          confirmationRate: confirmationRate,
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnalytics()
  }, [companySupabase])

  // --- Render logic ---
  if (!companySupabase && !isLoading) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--dashboard-text-color)]">Database Not Connected</h3>
            <p className="text-[var(--dashboard-text-color)]/60 mt-2 max-w-md mx-auto">
              Please go to the settings page to connect your bot's database.
            </p>
            <Button asChild className="mt-6 bg-[var(--dashboard-text-color)] text-[#0A0A0A] hover:bg-[var(--dashboard-text-color)]/90">
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dashboard-text-color)]">Analytics</h2>
        <p className="text-sm text-[var(--dashboard-text-color)]/60 mt-2">Performance and engagement metrics from your bot.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sm sm:text-base text-muted-foreground">Loading analytics...</div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
             <Card className="bg-[#1A1A1A] border-[#2A2A2A] transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                 {/* Removed specific text classes from CardTitle */}
                 <CardTitle className="text-muted-foreground">Total Conversations</CardTitle>
                 <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-[var(--dashboard-text-color)]">{metrics.totalConversations}</div>
               </CardContent>
             </Card>
             <Card className="bg-[#1A1A1A] border-[#2A2A2A] transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   {/* Removed specific text classes from CardTitle */}
                   <CardTitle className="text-muted-foreground">Total Meetings Booked</CardTitle>
                   <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[var(--dashboard-text-color)]">{metrics.totalMeetings}</div>
                </CardContent>
             </Card>
              <Card className="bg-[#1A1A1A] border-[#2A2A2A] transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   {/* Removed specific text classes from CardTitle */}
                   <CardTitle className="text-muted-foreground">Confirmation Rate</CardTitle>
                   <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[var(--dashboard-text-color)]">{metrics.confirmationRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metrics.totalMeetings > 0
                      ? `${metrics.totalMeetings - (meetingStatusData.find((s) => s.name === "Pending")?.value || 0) - (meetingStatusData.find((s) => s.name === "Cancelled")?.value || 0)} confirmed`
                      : "No meetings yet"}
                  </p>
                </CardContent>
             </Card>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
             <Card className="bg-[#1A1A1A] border-[#2A2A2A] transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
               <CardHeader>
                 {/* Removed specific text classes from CardTitle */}
                 <CardTitle className="flex items-center gap-2">
                   <PieChartIcon className="h-5 w-5 flex-shrink-0" />
                   <span>Meeting Status Breakdown</span>
                 </CardTitle>
               </CardHeader>
               <CardContent className="pt-4">
                 <ResponsiveContainer width="100%" height={250}>
                   {meetingStatusData.length === 0 ? (
                     <div className="flex items-center justify-center h-full">
                       <div className="text-center px-4">
                         <PieChartIcon className="h-12 w-12 text-[var(--dashboard-text-color)]/20 mx-auto mb-3" />
                         <p className="text-sm text-[var(--dashboard-text-color)]/60">No meeting data available.</p>
                       </div>
                     </div>
                   ) : (
                     <PieChart>
                       <Pie
                         data={meetingStatusData}
                         cx="50%"
                         cy="50%"
                         labelLine={false}
                         outerRadius={80}
                         innerRadius={50}
                         fill="#8884d8"
                         dataKey="value"
                         label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                           const RADIAN = Math.PI / 180
                           const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                           const x = cx + radius * Math.cos(-midAngle * RADIAN)
                           const y = cy + radius * Math.sin(-midAngle * RADIAN)
                           return percent > 0.05 ? (
                             <text
                               x={x}
                               y={y}
                               fill="#000000" // <<< MODIFIED: Changed text color to black (Fixes Bug #7)
                               textAnchor={x > cx ? "start" : "end"}
                               dominantBaseline="central"
                               fontSize={12}
                             >
                               {`${(percent * 100).toFixed(0)}%`}
                             </text>
                           ) : null
                         }}
                       >
                         {meetingStatusData.map((entry, index) => (
                           <Cell
                             key={`cell-${index}`}
                             fill={getThemeColor(entry.name)}
                             stroke={getThemeColor(entry.name)}
                           />
                         ))}
                       </Pie>
                       <Tooltip
                         cursor={{ fill: "rgba(42, 42, 42, 0.3)" }}
                         contentStyle={{
                           backgroundColor: "rgba(26, 26, 26, 0.9)",
                           border: "1px solid #2A2A2A",
                           color: "var(--dashboard-text-color)",
                           borderRadius: "0.5rem",
                         }}
                         itemStyle={{ color: "var(--dashboard-text-color)" }}
                         formatter={(value: number, name: string) => [`${value} meetings`, name]}
                       />
                       <Legend wrapperStyle={{ color: "var(--dashboard-text-color)", fontSize: "12px" }} />
                     </PieChart>
                   )}
                 </ResponsiveContainer>
               </CardContent>
             </Card>

             <Card className="bg-[#1A1A1A] border-[#2A2A2A] transition-all duration-200 hover:border-[var(--dashboard-text-color)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
               <CardHeader>
                 {/* Removed specific text classes from CardTitle */}
                 <CardTitle className="flex items-center gap-2">
                   <BarChartHorizontal className="h-5 w-5 flex-shrink-0" />
                   <span className="truncate">Meetings by Hour (SAST)</span>
                 </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 pl-0 sm:pl-2">
                 <ResponsiveContainer width="100%" height={250}>
                   {hourlyActivityData.reduce((sum, d) => sum + d.meetings, 0) === 0 ? (
                     <div className="flex items-center justify-center h-full">
                       <div className="text-center px-4">
                         <BarChartHorizontal className="h-12 w-12 text-[var(--dashboard-text-color)]/20 mx-auto mb-3" />
                         <p className="text-sm text-[var(--dashboard-text-color)]/60">No meeting data available for hourly breakdown.</p>
                       </div>
                     </div>
                   ) : (
                     <BarChart data={hourlyActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                       <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />
                       <XAxis
                         dataKey="hour"
                         stroke="var(--dashboard-text-color)"
                         fontSize={10}
                         tickLine={false}
                         axisLine={false}
                         tickFormatter={(value) => `${value}:00`} // Format hour label
                         interval={2} // Show every 3rd hour label
                         tick={{ fill: "var(--dashboard-text-color)" }}
                       />
                       <YAxis
                         stroke="var(--dashboard-text-color)"
                         fontSize={12}
                         tickLine={false}
                         axisLine={false}
                         allowDecimals={false}
                         tick={{ fill: "var(--dashboard-text-color)" }}
                         width={30}
                       />
                       <Tooltip
                         cursor={{ fill: "rgba(42, 42, 42, 0.3)" }}
                         contentStyle={{
                           backgroundColor: "rgba(26, 26, 26, 0.9)",
                           border: "1px solid #2A2A2A",
                           color: "var(--dashboard-text-color)",
                           borderRadius: "0.5rem",
                         }}
                         labelFormatter={(label) => `Hour: ${label}:00 - ${Number.parseInt(label) + 1}:00`}
                         formatter={(value: number) => [`${value} meetings`, "Meetings Booked"]}
                       />
                       <Bar dataKey="meetings" name="Meetings Booked" fill="var(--primary)" radius={[4, 4, 0, 0]} /> {/* Use primary color */}
                     </BarChart>
                   )}
                 </ResponsiveContainer>
               </CardContent>
             </Card>
          </div>
        </>
      )}
    </div>
  )
}