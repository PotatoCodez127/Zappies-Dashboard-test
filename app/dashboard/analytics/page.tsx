/* v0-cool-site/app/dashboard/analytics/page.tsx */
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

// Define colors using theme variables
const PIE_COLORS: { [key: string]: string } = {
  confirmed: "hsl(var(--chart-2))", // Use a theme purple
  pending_confirmation: "hsl(var(--chart-4))", // Use a theme blue
  cancelled: "hsl(var(--destructive))", // Use destructive color
  default: "hsl(var(--chart-5))", // Use a theme gray-blue
}
const STATUS_NAMES: { [key: string]: string } = {
  confirmed: "Confirmed",
  pending_confirmation: "Pending",
  cancelled: "Cancelled",
}

// Custom Tooltip for Charts using theme colors
const CustomTooltip = ({ active, payload, label, chartType }: any) => {
  if (active && payload && payload.length) {
    return (
      // Use card background, theme border, theme foreground text
      <div className="bg-card p-3 border border-border rounded-md shadow-lg text-xs">
        {chartType === "pie" ? (
          <>
            {/* Use foreground color */}
            <p className="label font-medium text-foreground">{`${payload[0].name}`}</p>
            {/* Use foreground color */}
            <p className="intro text-foreground">{`Meetings: ${payload[0].value}`}</p>
            {/* Use muted foreground color */}
            <p className="percent text-muted-foreground">{`(${(payload[0].payload.percent * 100).toFixed(0)}%)`}</p>
          </>
        ) : ( // Bar Chart
          <>
            {/* Use muted foreground for label */}
            <p className="label text-muted-foreground">{`Hour: ${label}:00 - ${Number.parseInt(label) + 1}:00`}</p>
            {/* Use foreground color */}
            <p className="intro text-foreground">{`Meetings Booked: ${payload[0].value}`}</p>
          </>
        )}
      </div>
    )
  }
  return null
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
  // State for the new hourly chart
  const [hourlyActivityData, setHourlyActivityData] = useState<HourlyActivityData[]>([])

  // ... (useEffect remains the same as previous correct version) ...
  useEffect(() => {
    async function fetchAnalytics() {
      if (!companySupabase) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const convPromise = companySupabase.from("conversation_history").select("*", { count: "exact", head: true });
        // Fetch created_at (for hourly chart) and status (for pie chart/KPIs)
        const meetingsPromise = companySupabase.from("meetings").select("created_at, status");

        const [convResult, meetingsResult] = await Promise.all([convPromise, meetingsPromise]);

        if (convResult.error) throw convResult.error;
        if (meetingsResult.error) throw meetingsResult.error;

        const meetings = meetingsResult.data || [];
        const totalMeetings = meetings.length;
        const confirmed = meetings.filter((m) => m.status === "confirmed").length;
        const confirmationRate = totalMeetings > 0 ? Math.round((confirmed / totalMeetings) * 100) : 0;

        // Process data for the Pie Chart
        const statusCounts: { [key: string]: number } = {};
        meetings.forEach((meeting) => {
          const status = meeting.status || "unknown";
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        const pieDataArray: MeetingStatusData[] = Object.entries(statusCounts)
          .map(([status, count]) => ({
            name: STATUS_NAMES[status] || status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            value: count,
          }))
          .sort((a, b) => b.value - a.value); // Sort for consistent color assignment if needed
        setMeetingStatusData(pieDataArray);

        // Process data for Hourly Bar Chart
        const hourlyCounts: { [key: number]: number } = {};
        meetings.forEach((meeting) => {
          const date = new Date(meeting.created_at);
          if (isNaN(date.getTime())) return; // Skip invalid dates
          const hour = date.getHours(); // Get hour (0-23)
          hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1;
        });
        const hourlyDataArray: HourlyActivityData[] = Array.from({ length: 24 }, (_, i) => ({
          hour: i.toString().padStart(2, "0"), // Format as "00", "01", ... "23"
          meetings: hourlyCounts[i] || 0,
        }));
        setHourlyActivityData(hourlyDataArray);

        setMetrics({
          totalConversations: convResult.count || 0,
          totalMeetings: totalMeetings,
          confirmationRate: confirmationRate,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnalytics();
  }, [companySupabase]);


  // --- Render logic ---
  if (!companySupabase && !isLoading) {
    return (
      // Card uses theme styles
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" /> {/* Use theme color */}
            {/* Use theme text colors */}
            <h3 className="text-xl font-bold text-foreground tracking-tight">Database Not Connected</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Please go to the settings page to connect your bot's database.
            </p>
            {/* Button uses default light theme */}
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
         {/* Use theme text colors */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Performance and engagement metrics from your bot.</p>
      </div>

      {isLoading ? (
        // Use muted text color
        <div className="text-center py-12 text-sm sm:text-base text-muted-foreground">Loading analytics...</div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
             {/* Card uses theme styles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                {/* CardTitle uses theme text colors */}
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversations</CardTitle>
                 {/* Icon uses muted color */}
                <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </CardHeader>
              <CardContent>
                 {/* Value uses foreground color */}
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
                 {/* Use muted color */}
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.totalMeetings > 0
                    ? `${metrics.totalMeetings - (meetingStatusData.find((s) => s.name === "Pending")?.value || 0) - (meetingStatusData.find((s) => s.name === "Cancelled")?.value || 0)} confirmed`
                    : "No meetings yet"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
             {/* Card uses theme styles */}
            <Card>
              <CardHeader>
                {/* CardTitle uses theme colors */}
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
                         {/* Icon uses muted color */}
                        <PieChartIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                         {/* Use muted text color */}
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
                        fill="hsl(var(--primary))" // Base fill
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                          const RADIAN = Math.PI / 180
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                          const x = cx + radius * Math.cos(-midAngle * RADIAN)
                          const y = cy + radius * Math.sin(-midAngle * RADIAN)
                           // Label uses foreground color
                          return percent > 0.05 ? (
                            <text
                              x={x}
                              y={y}
                              fill="hsl(var(--foreground))"
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
                           // Use defined PIE_COLORS based on name
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              PIE_COLORS[entry.name.toLowerCase().replace(/ /g, "_") as keyof typeof PIE_COLORS] ||
                              PIE_COLORS.default
                            }
                            stroke={
                              PIE_COLORS[entry.name.toLowerCase().replace(/ /g, "_") as keyof typeof PIE_COLORS] ||
                              PIE_COLORS.default
                            }
                          />
                        ))}
                      </Pie>
                      {/* Tooltip uses custom component */}
                      <Tooltip
                        cursor={{ fill: "hsl(var(--accent)/0.5)" }} // Use accent color for cursor
                        content={<CustomTooltip chartType="pie" />}
                      />
                      {/* Legend uses muted foreground */}
                      <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "12px" }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>

             {/* Card uses theme styles */}
            <Card>
              <CardHeader>
                {/* CardTitle uses theme colors */}
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
                         {/* Icon uses muted color */}
                        <BarChartHorizontal className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                         {/* Use muted text color */}
                        <p className="text-sm text-muted-foreground">No meeting data available for hourly breakdown.</p>
                      </div>
                    </div>
                  ) : (
                    <BarChart data={hourlyActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                       {/* Grid uses subtle border color */}
                      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="hour"
                        stroke="hsl(var(--muted-foreground))" // Use muted color
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}:00`} // Format hour label
                        interval={2} // Show every 3rd hour label
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))" // Use muted color
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        width={30}
                      />
                      {/* Tooltip uses custom component */}
                      <Tooltip
                        cursor={{ fill: "hsl(var(--accent)/0.5)" }} // Use accent color for cursor
                        content={<CustomTooltip chartType="bar" />}
                      />
                       {/* Bar uses a theme chart color */}
                      <Bar dataKey="meetings" name="Meetings Booked" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
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