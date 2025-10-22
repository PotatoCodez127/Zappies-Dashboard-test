/* v0-cool-site/components/dashboard/leads-table.tsx */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, AlertTriangle, Clock, User, Mail, ThumbsUp, ThumbsDown, DollarSign, Phone } from "lucide-react"
import Link from "next/link"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { useToast } from "@/hooks/use-toast"
import { format, parseISO } from "date-fns"

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

export function LeadsTable() {
  const companySupabase = useCompanySupabase()
  const { toast } = useToast()
  const [callHistory, setCallHistory] = useState<CallHistoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [selectedCall, setSelectedCall] = useState<CallHistoryEntry | null>(null)
  const [currentNotes, setCurrentNotes] = useState<string>("")

  useEffect(() => {
    async function fetchCallHistory() {
      if (!companySupabase) {
        setIsLoading(false)
        console.log("CallHistoryTable: Company Supabase client is null.")
        return
      }
      console.log("CallHistoryTable: Fetching data from 'call_history'...")
      setIsLoading(true)
      try {
        const { data, error, count } = await companySupabase
          .from("call_history")
          .select(
            "id, created_at, full_name, email, company_name, goal, monthly_budget, resulted_in_meeting, disqualification_reason, client_number, call_duration_seconds",
            { count: "exact" },
          )
          .order("created_at", { ascending: false })

        if (error) {
          console.error("CallHistoryTable: Error fetching call history:", error)
          toast({
            title: "Error",
            description: `Failed to fetch call history: ${error.message}`,
            variant: "destructive",
          })
          setCallHistory([])
        } else {
          console.log(`CallHistoryTable: Successfully fetched ${count ?? "unknown"} calls.`)
          setCallHistory(data || [])
        }
      } catch (catchError) {
        console.error("CallHistoryTable: Unexpected error during fetchCallHistory:", catchError)
        toast({
          title: "Fetch Error",
          description: "An unexpected error occurred while fetching call history.",
          variant: "destructive",
        })
        setCallHistory([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCallHistory()
  }, [companySupabase, toast])

  const filteredCalls = callHistory.filter((call) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      call.full_name?.toLowerCase().includes(searchLower) ||
      call.email?.toLowerCase().includes(searchLower) ||
      call.company_name?.toLowerCase().includes(searchLower)

    const matchesFilter =
      filterOption === "all" ||
      (filterOption === "meeting_yes" && call.resulted_in_meeting === true) ||
      (filterOption === "meeting_no" && call.resulted_in_meeting === false)

    return matchesSearch && matchesFilter
  })

  const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds === undefined) return "N/A"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatBudget = (budget: number | null): string => {
    if (budget === null || budget === undefined) return "N/A"
    return `R ${budget.toLocaleString("en-ZA")}`
  }

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

  if (isLoading) {
    return (
       // Card uses theme styling
      <Card>
        <CardHeader>
           {/* Use theme variable */}
          <CardTitle className="text-foreground">Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12 min-h-[200px]">
             {/* Use theme variable */}
            <p className="text-base text-muted-foreground">Loading call history...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
     // Card uses theme styling
    <Card>
      <CardHeader>
         {/* Use theme variables */}
        <CardTitle className="text-foreground">Call History ({filteredCalls.length})</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
             {/* Use theme variables */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
             {/* Input uses theme styling */}
            <Input
              placeholder="Search name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
           {/* Select uses theme styling */}
          <Select value={filterOption} onValueChange={setFilterOption}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filter call results" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              <SelectItem value="meeting_yes">Resulted in Meeting</SelectItem>
              <SelectItem value="meeting_no">Did Not Result in Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {callHistory.length === 0 ? (
            <div className="flex items-center justify-center py-12 min-h-[200px]">
              <div className="text-center px-4">
                 {/* Use theme variables */}
                <Phone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-base text-muted-foreground">No call history found.</p>
              </div>
            </div>
          ) : filteredCalls.length === 0 ? (
            <div className="flex items-center justify-center py-12 min-h-[200px]">
              <div className="text-center px-4">
                 {/* Use theme variables */}
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-base text-muted-foreground">No calls match your current filters.</p>
              </div>
            </div>
          ) : (
            filteredCalls.map((call) => (
              <div
                key={call.id}
                 // Use theme variables for background and border
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-accent/30 border border-border"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                     {/* Use theme variables */}
                    <p className="font-medium text-foreground">{call.full_name || "N/A"}</p>
                    {/* Badges use theme variants */}
                    {call.resulted_in_meeting === true && (
                      <Badge variant="success">
                        <ThumbsUp className="h-3 w-3 mr-1" /> Meeting
                      </Badge>
                    )}
                    {call.resulted_in_meeting === false && !call.disqualification_reason && (
                      <Badge variant="warning">
                        <ThumbsDown className="h-3 w-3 mr-1" /> No Meeting
                      </Badge>
                    )}
                    {call.disqualification_reason && (
                      <Badge variant="destructive">
                        <ThumbsDown className="h-3 w-3 mr-1" /> Disqualified
                      </Badge>
                    )}
                  </div>
                   {/* Use theme variables */}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3 flex-shrink-0" /> {call.email || "N/A"}
                    </p>
                    {call.company_name && (
                      <p className="flex items-center gap-1.5">
                        <User className="h-3 w-3 flex-shrink-0" /> {call.company_name}
                      </p>
                    )}
                  </div>
                   {/* Use theme variables */}
                  <p className="text-xs text-muted-foreground/60">{format(parseISO(call.created_at), "MMM d, yyyy h:mm a")}</p>
                </div>
                 {/* Button uses outline theme variant */}
                <Dialog onOpenChange={(open) => setSelectedCall(open ? call : null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </Button>
                  </DialogTrigger>
                   {/* Dialog uses theme styling */}
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                       {/* Use theme variables */}
                      <DialogTitle className="text-foreground">Call Details</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Detailed information about the call.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCall && (
                      <div className="space-y-6 pt-4 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                             {/* Use theme variables */}
                            <Label className="text-muted-foreground">Caller Name</Label>
                            <p className="text-foreground flex items-center gap-2">
                              <User className="h-4 w-4" /> {selectedCall.full_name || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-muted-foreground">Caller Email</Label>
                            <p className="text-foreground flex items-center gap-2">
                              <Mail className="h-4 w-4" /> {selectedCall.email || "N/A"}
                            </p>
                          </div>
                          {selectedCall.company_name && (
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Company</Label>
                              <p className="text-foreground">{selectedCall.company_name}</p>
                            </div>
                          )}
                          <div className="space-y-1">
                            <Label className="text-muted-foreground">Call Time</Label>
                            <p className="text-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />{" "}
                              {format(parseISO(selectedCall.created_at), "MMM d, yyyy h:mm a")}
                            </p>
                          </div>
                          {selectedCall.call_duration_seconds !== null && (
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Call Duration</Label>
                              <p className="text-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" /> {formatDuration(selectedCall.call_duration_seconds)}
                              </p>
                            </div>
                          )}
                          {selectedCall.monthly_budget !== null && (
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Monthly Budget</Label>
                              <p className="text-foreground flex items-center gap-2">
                                <DollarSign className="h-4 w-4" /> {formatBudget(selectedCall.monthly_budget)}
                              </p>
                            </div>
                          )}
                        </div>
                        {selectedCall.goal && (
                          <div>
                            <Label className="text-muted-foreground">Call Goal</Label>
                             {/* Use theme variables */}
                            <p className="text-foreground mt-1 text-sm bg-accent/30 p-3 rounded border border-border whitespace-pre-wrap">
                              {selectedCall.goal}
                            </p>
                          </div>
                        )}
                        <div className="space-y-1">
                          <Label className="text-muted-foreground">Resulted in Meeting?</Label>
                          {/* Use theme status colors */}
                          <p
                            className={`text-base font-medium ${selectedCall.resulted_in_meeting ? "text-green-500" : "text-yellow-500"}`}
                          >
                            {selectedCall.resulted_in_meeting ? "Yes" : "No"}
                          </p>
                        </div>
                        {selectedCall.disqualification_reason && (
                          <div>
                            <Label className="text-muted-foreground">Disqualification Reason</Label>
                            <p className="text-foreground mt-1 text-sm bg-accent/30 p-3 rounded border border-border whitespace-pre-wrap">
                              {selectedCall.disqualification_reason}
                            </p>
                          </div>
                        )}
                        <div>
                          <Label htmlFor="notes" className="text-muted-foreground">
                            Notes (Not Saved)
                          </Label>
                           {/* Textarea uses theme styling */}
                          <Textarea
                            id="notes"
                            value={currentNotes}
                            onChange={(e) => setCurrentNotes(e.target.value)}
                            placeholder="Add temporary notes here..."
                            className="mt-1"
                            rows={3}
                          />
                           {/* Use theme variable */}
                          <p className="text-xs text-muted-foreground/60 mt-1">Notes are for temporary reference only.</p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}