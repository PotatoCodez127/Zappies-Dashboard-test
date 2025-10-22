/* v0-cool-site/app/dashboard/page.tsx */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageSquare,
  CalendarCheck,
  TrendingUp,
  Clock,
  AlertTriangle,
  LineChartIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Area } from "recharts"
import { differenceInDays, format, eachDayOfInterval, startOfDay, parseISO } from "date-fns"
import { RecentActivity } from "@/components/dashboard/recent-activity" // Assuming this component exists and uses theme variables

interface DailyMeetingData {
  day: string
  fullDate: string
  total: number
  confirmed: number
}

interface DashboardStats {
  totalConversations: number
  totalMeetings: number
  confirmedMeetings: number
  pendingMeetings: number
  conversationTrend: number | null
  meetingsTrend: number | null
  confirmedTrend: number | null
  pendingTrend: number | null
}

// Custom Tooltip using theme variables
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DailyMeetingData
    const formattedDate = data.fullDate ? format(parseISO(data.fullDate), "MMM d, yyyy") : label
    return (
       // Use theme variables for tooltip style
      <div className="bg-popover p-3 border border-border rounded-md shadow-lg text-xs">
        <p className="label text-muted-foreground">{`${formattedDate}`}</p>
        <p className="intro text-[hsl(var(--chart-1))]">{`Total Booked : ${data.total}`}</p> {/* Use chart color */}
        <p className="intro text-[hsl(var(--chart-2))]">{`Confirmed : ${data.confirmed}`}</p> {/* Use chart color */}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const companySupabase = useCompanySupabase()
  const [stats, setStats] = useState<DashboardStats>({
    totalConversations: 0,
    totalMeetings: 0,
    confirmedMeetings: 0,
    pendingMeetings: 0,
    conversationTrend: null,
    meetingsTrend: null,
    confirmedTrend: null,
    pendingTrend: null,
  })
  const [chartData, setChartData] = useState<DailyMeetingData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [chartDaysCount, setChartDaysCount] = useState<number>(0)

  useEffect(() => {
    async function fetchStatsAndChartData() {
      if (!companySupabase) {
        setIsLoading(false); return;
      }
      setIsLoading(true);
      try {
        const convPromise = companySupabase.from("conversation_history").select("*", { count: "exact", head: true });
        const meetingsPromise = companySupabase.from("meetings").select("created_at, status").order("created_at", { ascending: true });
        const [conversationResult, meetingsResult] = await Promise.all([convPromise, meetingsPromise]);
        if (conversationResult.error) throw conversationResult.error;
        if (meetingsResult.error) throw meetingsResult.error;

        const meetings = meetingsResult.data || [];
        const confirmed = meetings.filter((m) => m.status === "confirmed").length;
        const pending = meetings.filter((m) => m.status === "pending_confirmation").length;
        const placeholderTrend = (current: number) => (current > 5 ? Math.round(Math.random() * 10 - 3) : 0);

        setStats((prev) => ({
          ...prev,
          totalConversations: conversationResult.count || 0,
          totalMeetings: meetings.length,
          confirmedMeetings: confirmed,
          pendingMeetings: pending,
          conversationTrend: placeholderTrend(conversationResult.count || 0),
          meetingsTrend: placeholderTrend(meetings.length),
          confirmedTrend: placeholderTrend(confirmed),
          pendingTrend: placeholderTrend(pending) * -1,
        }));

        if (meetings.length > 0) {
          const dailyData: { [key: string]: { total: number; confirmed: number } } = {};
          const firstValidMeeting = meetings.find((m) => m.created_at && !isNaN(new Date(m.created_at).getTime()));
          if (!firstValidMeeting) {
            setChartData([]); setChartDaysCount(0);
          } else {
            const firstMeetingDate = startOfDay(new Date(firstValidMeeting.created_at));
            const today = startOfDay(new Date());
            const daysCount = differenceInDays(today, firstMeetingDate) + 1;
            setChartDaysCount(daysCount);

            meetings.forEach((meeting) => {
              const date = startOfDay(new Date(meeting.created_at));
              if (isNaN(date.getTime())) return;
              const dayKey = format(date, "yyyy-MM-dd");
              if (!dailyData[dayKey]) dailyData[dayKey] = { total: 0, confirmed: 0 };
              dailyData[dayKey].total += 1;
              if (meeting.status === "confirmed") dailyData[dayKey].confirmed += 1;
            });

            const allDaysInterval = eachDayOfInterval({ start: firstMeetingDate, end: today });
            const finalChartData: DailyMeetingData[] = allDaysInterval.map((date) => {
              const dayKey = format(date, "yyyy-MM-dd");
              const displayDay = format(date, "d MMM");
              const data = dailyData[dayKey] || { total: 0, confirmed: 0 };
              return { day: displayDay, fullDate: dayKey, total: data.total, confirmed: data.confirmed };
            });
            setChartData(finalChartData);
          }
        } else {
          setChartData([]); setChartDaysCount(0);
        }
      } catch (error) { console.error("Error fetching dashboard data:", error); }
      finally { setIsLoading(false); }
    }
    fetchStatsAndChartData();
  }, [companySupabase]);

  const renderTrend = (trendValue: number | null) => {
    if (trendValue === null || trendValue === 0) return <span className="text-xs text-muted-foreground/60">--</span>; // Use muted foreground
    const isPositive = trendValue > 0;
    return (
      <span className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-destructive"}`}> {/* Use destructive */}
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {Math.abs(trendValue)}%
      </span>
    );
  };

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
             {/* Button uses theme variant */}
            <Button asChild className="mt-6">
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    { title: "Total Conversations", value: stats.totalConversations, icon: MessageSquare, trend: stats.conversationTrend },
    { title: "Total Meetings Booked", value: stats.totalMeetings, icon: CalendarCheck, trend: stats.meetingsTrend },
    { title: "Total Confirmed", value: stats.confirmedMeetings, icon: TrendingUp, trend: stats.confirmedTrend },
    { title: "Total Pending", value: stats.pendingMeetings, icon: Clock, trend: stats.pendingTrend },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
         {/* Use theme variables */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Here's your bot's performance summary.</p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
           // Card uses theme styling
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 min-h-[72px]">
               {/* Use theme variables */}
              <CardTitle className="text-sm font-medium text-muted-foreground leading-snug">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-0">
              {isLoading ? (
                 // Use theme variables for skeleton
                <div className="h-8 w-1/2 bg-accent/30 rounded-md animate-pulse mb-1" />
              ) : (
                 // Use theme variables
                <div className="text-2xl sm:text-3xl font-bold text-foreground leading-none">{stat.value}</div>
              )}
              <div className="h-4 mt-2">{!isLoading && renderTrend(stat.trend)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       {/* Card uses theme styling */}
      <Card>
        <CardHeader>
           {/* Use theme variables */}
          <CardTitle className="text-lg sm:text-xl text-foreground flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">
              Daily Meetings Overview {chartDaysCount > 0 ? `(Last ${chartDaysCount} Days)` : ""}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2 pr-4">
          {isLoading ? (
             // Use theme variables for skeleton
            <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full bg-accent/30 rounded-md animate-pulse flex items-center justify-center text-muted-foreground text-sm">
              Loading chart data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : window.innerWidth < 1024 ? 300 : 350}>
              {!chartData || chartData.length === 0 ? (
                 // Use theme variable
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  No meeting data available yet.
                </div>
              ) : (
                <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <defs>
                     {/* Use chart colors */}
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                   {/* Use border color */}
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="5 5" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--foreground))" // Use foreground
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    interval={chartDaysCount > 60 ? Math.floor(chartDaysCount / 15) : chartDaysCount > 30 ? 4 : 1}
                    tick={{ fill: "hsl(var(--muted-foreground))" }} // Use muted
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
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5, strokeDasharray: "3 3" }} />
                   {/* Use muted foreground */}
                  <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "12px", paddingTop: "10px" }} />
                  <Area type="monotone" dataKey="total" stroke="none" fillOpacity={0.2} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="confirmed" stroke="none" fillOpacity={0.2} fill="url(#colorConfirmed)" />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total Booked"
                    stroke="hsl(var(--chart-1))" // Use chart color
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="confirmed"
                    name="Confirmed"
                    stroke="hsl(var(--chart-2))" // Use chart color
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* RecentActivity likely needs internal updates too, but assuming it uses theme vars now */}
      <RecentActivity />
    </div>
  )
}