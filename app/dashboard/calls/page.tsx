/* v0-cool-site/app/dashboard/calls/page.tsx */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Phone, Clock, AlertTriangle, PhoneIncoming, DollarSign, User, Mail } from "lucide-react" // Added missing icons
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useToast } from "@/hooks/use-toast"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog, // Added Dialog imports
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Interface matching the 'call_history' table schema
interface CallHistoryEntry {
  id: number
  created_at: string
  full_name: string | null
  email: string | null
  company_name: string | null
  goal: string | null
  monthly_budget: number | null
  resulted_in_meeting: boolean | null
  disqualification_reason: string | null
  client_number: string | null
  call_duration_seconds: number | null
}

export default function CallsPage() {
  const companySupabase = useCompanySupabase()
  const { toast } = useToast()
  const [callHistory, setCallHistory] = useState<CallHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [selectedCall, setSelectedCall] = useState<CallHistoryEntry | null>(null)
  const [currentNotes, setCurrentNotes] = useState<string>("")

  // --- useEffect for fetching data ---
  useEffect(() => {
    async function fetchCallHistory() {
      if (!companySupabase) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const { data, error } = await companySupabase
          .from("call_history")
          .select(
            "id, created_at, full_name, email, company_name, goal, monthly_budget, resulted_in_meeting, disqualification_reason, client_number, call_duration_seconds"
          )
          .order("created_at", { ascending: false });

        if (error) {
          console.error("CallsPage: Error fetching call history:", error);
          toast({ title: "Error", description: `Failed to fetch call history: ${error.message}`, variant: "destructive" });
          setCallHistory([]);
        } else {
          setCallHistory(data || []);
        }
      } catch (catchError) {
        console.error("CallsPage: Unexpected error:", catchError);
        toast({ title: "Fetch Error", description: "An unexpected error occurred.", variant: "destructive" });
        setCallHistory([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCallHistory();
  }, [companySupabase, toast]);

  // --- Filter logic ---
  const filteredCalls = callHistory.filter((call) => {
     const searchLower = searchQuery.toLowerCase();
     const matchesSearch =
       call.full_name?.toLowerCase().includes(searchLower) ||
       call.email?.toLowerCase().includes(searchLower) ||
       call.client_number?.includes(searchQuery) || // Direct phone number search
       call.company_name?.toLowerCase().includes(searchLower);

     const matchesFilter =
       filterOption === "all" ||
       (filterOption === "meeting_yes" && call.resulted_in_meeting === true) ||
       (filterOption === "meeting_no" && call.resulted_in_meeting === false && !call.disqualification_reason) ||
       (filterOption === "disqualified" && !!call.disqualification_reason);

     return matchesSearch && matchesFilter;
   });

  // --- Helper functions ---
  const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds === undefined) return "--";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatBudget = (budget: number | null): string => {
    if (budget === null || budget === undefined) return "N/A"
    return `R ${budget.toLocaleString("en-ZA")}` // Format for South Africa
  }

  const getOutcomeBadge = (call: CallHistoryEntry) => {
    if (call.resulted_in_meeting === true) {
      return <Badge variant="success" className="text-xs">Meeting Booked</Badge>;
    }
    if (call.disqualification_reason) {
      return <Badge variant="error" className="text-xs">Disqualified</Badge>;
    }
    if (call.resulted_in_meeting === false) {
      return <Badge variant="warning" className="text-xs">No Meeting</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Unknown</Badge>;
  };


  // --- RENDER LOGIC ---
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
    <div className="space-y-4 sm:space-y-6">
      <div>
        {/* Use theme text colors */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Voice Calls</h2>
        <p className="text-sm text-muted-foreground mt-1.5">Review your bot's call history log.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          {/* Use muted text color */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          {/* Input uses theme styles */}
          <Input
            placeholder="Search by name, email, phone, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-sm" // Removed specific bg/border/text colors
          />
        </div>
        {/* Select uses theme styles */}
        <Select value={filterOption} onValueChange={setFilterOption}>
          <SelectTrigger className="w-full sm:w-[220px] h-10 text-sm"> {/* Removed specific bg/border/text colors */}
            <SelectValue placeholder="Filter call results" />
          </SelectTrigger>
          {/* SelectContent uses theme styles (including glassmorphism) */}
          <SelectContent>
            <SelectItem value="all">All Calls</SelectItem>
            <SelectItem value="meeting_yes">Resulted in Meeting</SelectItem>
            <SelectItem value="meeting_no">Did Not Result in Meeting</SelectItem>
            <SelectItem value="disqualified">Disqualified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Call Logs List Card */}
        {/* Card uses theme styles */}
        <Card className="lg:col-span-2 flex flex-col h-[500px] lg:h-[600px]">
          <CardHeader>
            <CardTitle>Call History ({filteredCalls.length})</CardTitle> {/* Uses CardTitle style */}
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <p className="text-base text-muted-foreground">Loading calls...</p>
                </div>
              ) : callHistory.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center px-4">
                    <Phone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-base text-muted-foreground">No call history found.</p>
                  </div>
                </div>
              ) : filteredCalls.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center px-4">
                    <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-base text-muted-foreground">No calls match your current filters.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-6 pt-0">
                  {filteredCalls.map((call) => (
                    <button
                      key={call.id}
                      onClick={() => { setSelectedCall(call); setCurrentNotes("") }} // Clear notes on select
                       // Use theme borders and accent background
                      className={`w-full p-4 rounded-lg border text-left transition-colors ${selectedCall?.id === call.id ? "border-primary/50 bg-accent" : "border-border hover:border-primary/40 hover:bg-accent/50"}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar uses theme styles */}
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback> {/* Background controlled by --muted */}
                            {call.full_name ? call.full_name.split(" ").map((n) => n[0]).join("") : "??"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                             {/* Use foreground text */}
                            <p className="font-medium text-foreground truncate">{call.full_name || "Unknown Caller"}</p>
                            {getOutcomeBadge(call)}
                          </div>
                           {/* Use muted foreground text */}
                          <p className="text-sm text-muted-foreground mb-2 truncate">
                            {call.client_number || call.email || "No contact info"}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <PhoneIncoming className="h-3 w-3" /> <span>Incoming</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> <span>{formatDuration(call.call_duration_seconds)}</span>
                            </div>
                            <span>{format(parseISO(call.created_at), "MMM d, h:mm a")}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Call Details Panel Card */}
         {/* Card uses theme styles */}
        <Card className="flex flex-col h-[500px] lg:h-[600px]">
          <CardHeader>
            <CardTitle>Call Details</CardTitle> {/* Uses CardTitle style */}
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {selectedCall ? (
              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-3">
                   {/* Avatar uses theme styles */}
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="text-lg"> {/* Background controlled by --muted */}
                      {selectedCall.full_name ? selectedCall.full_name.split(" ").map((n) => n[0]).join("") : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-base">{selectedCall.full_name || "Unknown Caller"}</p>
                    <p className="text-muted-foreground">{selectedCall.client_number || "No phone"}</p>
                    <p className="text-muted-foreground">{selectedCall.email || "No email"}</p>
                  </div>
                </div>
                {/* Use theme border */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Call Time</span>
                    <span className="text-foreground text-right">{format(parseISO(selectedCall.created_at), "MMM d, yyyy h:mm a")}</span>
                  </div>
                  {selectedCall.call_duration_seconds !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-foreground">{formatDuration(selectedCall.call_duration_seconds)}</span>
                    </div>
                  )}
                  {selectedCall.company_name && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company</span>
                      <span className="text-foreground text-right">{selectedCall.company_name}</span>
                    </div>
                  )}
                  {selectedCall.monthly_budget !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="text-foreground">{formatBudget(selectedCall.monthly_budget)}</span>
                    </div>
                  )}
                </div>
                {selectedCall.goal && (
                  // Use theme border
                  <div className="border-t border-border pt-4">
                    <Label className="block mb-2 font-medium">Call Goal</Label> {/* Label uses theme style */}
                     {/* Use theme input background and border */}
                    <p className="text-foreground bg-input p-3 rounded border border-border whitespace-pre-wrap">
                      {selectedCall.goal}
                    </p>
                  </div>
                )}
                 {/* Use theme border */}
                <div className="border-t border-border pt-4 space-y-2">
                  <Label className="block font-medium">Call Outcome</Label> {/* Label uses theme style */}
                   {/* Use functional colors based on badge variants */}
                  <p className={`font-medium ${selectedCall.resulted_in_meeting ? "text-green-400" : selectedCall.disqualification_reason ? "text-red-400" : "text-yellow-400"}`}>
                    {selectedCall.resulted_in_meeting ? "Meeting Booked" : selectedCall.disqualification_reason ? "Disqualified" : "No Meeting Booked"}
                  </p>
                  {selectedCall.disqualification_reason && (
                    <div>
                      <Label className="text-xs">Reason:</Label> {/* Label uses theme style */}
                       {/* Use theme input background and border */}
                      <p className="text-foreground mt-1 text-sm bg-input p-3 rounded border border-border whitespace-pre-wrap">
                        {selectedCall.disqualification_reason}
                      </p>
                    </div>
                  )}
                </div>
                 {/* Use theme border */}
                <div className="border-t border-border pt-4">
                  <Label htmlFor="callNotes" className="block mb-2 font-medium">Notes (Not Saved)</Label> {/* Label uses theme style */}
                   {/* Textarea uses theme styles */}
                  <Textarea
                    id="callNotes"
                    value={currentNotes}
                    onChange={(e) => setCurrentNotes(e.target.value)}
                    placeholder="Add temporary notes about this call..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Notes are for temporary reference only.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center px-4">
                  <Phone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-base text-muted-foreground">Select a call to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}