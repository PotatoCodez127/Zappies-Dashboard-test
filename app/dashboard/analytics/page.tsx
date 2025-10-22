/* v0-cool-site/app/dashboard/analytics/page.tsx */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MessageSquare, Calendar, AlertTriangle, PieChartIcon, BarChartHorizontal } from "lucide-react"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

interface MeetingStatusData {
  name: string
  value: number
}
interface HourlyActivityData {
  hour: string
  meetings: number
}

// Define colors based on the new palette - ensure these variables exist in globals.css or use hex
const COLORS: { [key: string]: string } = {
  confirmed: "hsl(var(--chart-2))", // Purple
  pending_confirmation: "hsl(var(--chart-4))", // Desaturated Blue
  cancelled: "hsl(var(--destructive))", // Red/Orange
  default: "hsl(var(--muted-foreground))", // Medium Gray
}
const STATUS_NAMES: { [key: string]: string } = {
  confirmed: "Confirmed",
  pending_confirmation: "Pending",
  cancelled: "Cancelled",
}

export default function AnalyticsPage() {
  const companySupabase = useCompanySupabase()
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    totalConversations: 0,
    totalMeetings: 0,
    confirmationRate: 0,
  })
  const [meetingStatusData, setMeetingStatusData] = useState<MeetingStatusData[]>([])
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
        const meetingsPromise = companySupabase.from("meetings").select("created_at, status")

        const [convResult, meetingsResult] = await Promise.all([convPromise, meetingsPromise])

        if (convResult.error) throw convResult.error
        if (meetingsResult.error) throw meetingsResult.error

        const meetings = meetingsResult.data || []
        const totalMeetings = meetings.length
        const confirmed = meetings.filter((m) => m.status === "confirmed").length
        const confirmationRate = totalMeetings > 0 ? Math.round((confirmed / totalMeetings) * 100) : 0

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

        const hourlyCounts: { [key: number]: number } = {}
        meetings.forEach((meeting) => {
          const date = new Date(meeting.created_at)
          if (isNaN(date.getTime())) return
          const hour = date.getHours()
          hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1
        })
        const hourlyDataArray: HourlyActivityData[] = Array.from({ length: 24 }, (_, i) => ({
          hour: i.toString().padStart(2, "0"),
          meetings: hourlyCounts[i] || 0,
        }))
        setHourlyActivityData(hourlyDataArray)

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

  if (!companySupabase && !isLoading) {
    return (
      // Card uses theme styling
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
             {/* Use theme variables */}
            <h3 className="text-xl font-bold text-foreground">Database Not Connected</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Please go to the settings page to connect your bot's database.
            </p>
             {/* Button uses default theme variant */}
            <Button asChild className="mt-6">
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
         {/* Use theme variables */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Performance and engagement metrics from your bot.</p>
      </div>

      {isLoading ? (
         // Use theme variable
        <div className="text-center py-12 text-sm sm:text-base text-muted-foreground">Loading analytics...</div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
             {/* Card uses theme styling */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                 {/* Use theme variable */}
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </CardHeader>
              <CardContent>
                 {/* Use theme variable */}
                <div className="text-2xl font-bold text-foreground">{metrics.totalConversations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Meetings Booked</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metrics.totalMeetings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Confirmation Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metrics.confirmationRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.totalMeetings > 0
                    ? `${metrics.totalMeetings - (meetingStatusData.find((s) => s.name === "Pending")?.value || 0) - (meetingStatusData.find((s) => s.name === "Cancelled")?.value || 0)} confirmed`
                    : "No meetings yet"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
             {/* Card uses theme styling */}
            <Card>
              <CardHeader>
                 {/* Use theme variables */}
                <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 flex-shrink-0" />
                  <span>Meeting Status Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={250}>
                  {meetingStatusData.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center px-4">
                         {/* Use theme variables */}
                        <PieChartIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No meeting data available.</p>
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
                        fill="hsl(var(--primary))" // Use primary color as base fill
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
                              fill="hsl(var(--foreground))" // Use foreground for label text
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
                            fill={
                              COLORS[entry.name.toLowerCase().replace(/ /g, "_") as keyof typeof COLORS] ||
                              COLORS.default
                            }
                            stroke={
                              COLORS[entry.name.toLowerCase().replace(/ /g, "_") as keyof typeof COLORS] ||
                              COLORS.default
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        cursor={{ fill: "hsl(var(--accent)/0.3)" }} // Use accent color for cursor
                        contentStyle={{
                          // Use popover/card styles for tooltip
                          backgroundColor: "hsl(var(--popover)/0.9)",
                          border: "1px solid hsl(var(--border))",
                          color: "hsl(var(--foreground))",
                          borderRadius: "var(--radius-md)",
                        }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number, name: string) => [`${value} meetings`, name]}
                      />
                      {/* Use muted foreground for legend */}
                      <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "12px" }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>

             {/* Card uses theme styling */}
            <Card>
              <CardHeader>
                 {/* Use theme variables */}
                <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                  <BarChartHorizontal className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">Meetings by Hour (SAST)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pl-0 sm:pl-2">
                <ResponsiveContainer width="100%" height={250}>
                  {hourlyActivityData.reduce((sum, d) => sum + d.meetings, 0) === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center px-4">
                         {/* Use theme variables */}
                        <BarChartHorizontal className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No meeting data available for hourly breakdown.</p>
                      </div>
                    </div>
                  ) : (
                    <BarChart data={hourlyActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                       {/* Use border color for grid */}
                      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="hour"
                        stroke="hsl(var(--foreground))" // Use foreground for axis stroke
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}:00`}
                        interval={2}
                        tick={{ fill: "hsl(var(--muted-foreground))" }} // Use muted for ticks
                      />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        width={30}
                      />
                      <Tooltip
                        cursor={{ fill: "hsl(var(--accent)/0.3)" }}
                        contentStyle={{
                          // Use popover/card styles
                          backgroundColor: "hsl(var(--popover)/0.9)",
                          border: "1px solid hsl(var(--border))",
                          color: "hsl(var(--foreground))",
                          borderRadius: "var(--radius-md)",
                        }}
                        labelFormatter={(label) => `Hour: ${label}:00 - ${Number.parseInt(label) + 1}:00`}
                        formatter={(value: number) => [`${value} meetings`, "Meetings Booked"]}
                      />
                      {/* Use primary color for bar */}
                      <Bar dataKey="meetings" name="Meetings Booked" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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