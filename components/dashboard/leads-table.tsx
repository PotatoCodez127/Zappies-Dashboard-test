"use client"

import { useState } from "react"
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
import { Search, Eye, Clock, User, Mail, ThumbsUp, ThumbsDown, DollarSign, Phone, MessageSquare } from "lucide-react"
import { format, parseISO } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define the 'Lead' interface based on the combined data from the parent page
interface Lead {
  id: number | string
  created_at: string
  full_name: string | null
  email: string | null
  company_name: string | null
  goal: string | null
  monthly_budget: number | null
  resulted_in_meeting: boolean | null
  disqualification_reason: string | null
  call_duration_seconds: number | null
  lead_type: 'conversation' | 'call'
}

interface LeadsTableProps {
  leads: Lead[] // Component accepts 'leads' as a prop
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [currentNotes, setCurrentNotes] = useState<string>("") // Temporary notes state

  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      lead.full_name?.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.company_name?.toLowerCase().includes(searchLower) ||
      lead.lead_type.includes(searchLower)

    const matchesFilter =
      filterOption === "all" ||
      (filterOption === "meeting_yes" && lead.resulted_in_meeting === true) ||
      (filterOption === "meeting_no" && lead.resulted_in_meeting === false) ||
      (filterOption === "call" && lead.lead_type === 'call') ||
      (filterOption === "conversation" && lead.lead_type === 'conversation')

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
  
  // Custom filter options for the combined data
  const filterOptions = [
    { value: "all", label: "All Leads" },
    { value: "meeting_yes", label: "Resulted in Meeting" },
    { value: "meeting_no", label: "Did Not Result in Meeting" },
    { value: "call", label: "Filter: Voice Calls" },
    { value: "conversation", label: "Filter: Conversations" },
  ];

  return (
    <Card className="bg-[#1A1A1A] border-[#2A2A2A] flex flex-col lg:h-[80vh]">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-[var(--dashboard-text-color)]">Leads History ({filteredLeads.length})</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--dashboard-text-color)]/40" />
            <Input
              placeholder="Search name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0A0A0A] border-[#2A2A2A] text-[var(--dashboard-text-color)]"
            />
          </div>
          <Select value={filterOption} onValueChange={setFilterOption}>
            <SelectTrigger className="w-full sm:w-[220px] bg-[#0A0A0A] border-[#2A2A2A] text-[var(--dashboard-text-color)]">
              <SelectValue placeholder="Filter results" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
              {filterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="flex items-center justify-center py-12 min-h-[200px]">
                <div className="text-center px-4">
                  <Phone className="h-12 w-12 text-[var(--dashboard-text-color)]/20 mx-auto mb-3" />
                  <p className="text-base text-[var(--dashboard-text-color)]/60">No lead history found.</p>
                </div>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex items-center justify-center py-12 min-h-[200px]">
                <div className="text-center px-4">
                  <Search className="h-12 w-12 text-[var(--dashboard-text-color)]/20 mx-auto mb-3" />
                  <p className="text-base text-[var(--dashboard-text-color)]/60">No leads match your current filters.</p>
                </div>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A]"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-medium text-[var(--dashboard-text-color)]">{lead.full_name || "N/A"}</p>
                      
                      {/* Lead Type Badge */}
                      <Badge className={lead.lead_type === 'call' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}>
                        {lead.lead_type === 'call' ? <Phone className="h-3 w-3 mr-1" /> : <MessageSquare className="h-3 w-3 mr-1" />}
                        {lead.lead_type === 'call' ? 'Voice Call' : 'Conversation'}
                      </Badge>

                      {/* Meeting Status Badge */}
                      {lead.resulted_in_meeting === true && (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <ThumbsUp className="h-3 w-3 mr-1" /> Meeting
                        </Badge>
                      )}
                      {lead.resulted_in_meeting === false && !lead.disqualification_reason && (
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <ThumbsDown className="h-3 w-3 mr-1" /> No Meeting
                        </Badge>
                      )}
                      {lead.disqualification_reason && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                          <ThumbsDown className="h-3 w-3 mr-1" /> Disqualified
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-[var(--dashboard-text-color)]/60 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 flex-shrink-0" /> {lead.email || "N/A"}
                      </p>
                      {lead.company_name && (
                        <p className="flex items-center gap-1.5">
                          <User className="h-3 w-3 flex-shrink-0" /> {lead.company_name}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-[var(--dashboard-text-color)]/40">
                      {format(parseISO(lead.created_at), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                  <Dialog onOpenChange={(open) => setSelectedLead(open ? lead : null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[var(--dashboard-text-color)]/5 border-[var(--dashboard-text-color)]/20 text-[var(--dashboard-text-color)] hover:bg-[var(--dashboard-text-color)]/10"
                      >
                        <Eye className="h-4 w-4 mr-2" /> View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-[var(--dashboard-text-color)]">Lead Details</DialogTitle>
                        <DialogDescription className="text-[var(--dashboard-text-color)]/60">
                          Detailed information about the lead.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedLead && (
                        <div className="space-y-6 pt-4 text-sm">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-[var(--dashboard-text-color)]/80">Lead Type</Label>
                              <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                {selectedLead.lead_type === 'call' ? <Phone className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                                {selectedLead.lead_type === 'call' ? 'Voice Call' : 'Conversation'}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[var(--dashboard-text-color)]/80">Date</Label>
                              <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {format(parseISO(selectedLead.created_at), "MMM d, yyyy h:mm a")}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[var(--dashboard-text-color)]/80">Lead Name</Label>
                              <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                <User className="h-4 w-4" /> {selectedLead.full_name || "N/A"}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[var(--dashboard-text-color)]/80">Lead Email</Label>
                              <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                <Mail className="h-4 w-4" /> {selectedLead.email || "N/A"}
                              </p>
                            </div>
                            {selectedLead.call_duration_seconds !== null && (
                              <div className="space-y-1">
                                <Label className="text-[var(--dashboard-text-color)]/80">Call Duration</Label>
                                <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                  <Clock className="h-4 w-4" /> {formatDuration(selectedLead.call_duration_seconds)}
                                </p>
                              </div>
                            )}
                            {selectedLead.monthly_budget !== null && (
                              <div className="space-y-1">
                                <Label className="text-[var(--dashboard-text-color)]/80">Budget Stated</Label>
                                <p className="text-[var(--dashboard-text-color)] flex items-center gap-2">
                                  <DollarSign className="h-4 w-4" /> {formatBudget(selectedLead.monthly_budget)}
                                </p>
                              </div>
                            )}
                          </div>
                          {selectedLead.goal && (
                            <div>
                              <Label className="text-[var(--dashboard-text-color)]/80">Goal/Summary</Label>
                              <p className="text-[var(--dashboard-text-color)] mt-1 text-sm bg-[#0A0A0A] p-3 rounded border border-[#2A2A2A] whitespace-pre-wrap">
                                {selectedLead.goal}
                              </p>
                            </div>
                          )}
                          <div className="space-y-1 border-t border-[#2A2A2A] pt-4">
                            <Label className="text-[var(--dashboard-text-color)]/80">Resulted in Meeting?</Label>
                            <p
                              className={`text-base font-medium ${selectedLead.resulted_in_meeting ? "text-green-500" : selectedLead.disqualification_reason ? "text-red-500" : "text-yellow-500"}`}
                            >
                              {selectedLead.resulted_in_meeting ? "Yes" : "No"}
                            </p>
                          </div>
                          {selectedLead.disqualification_reason && (
                            <div>
                              <Label className="text-[var(--dashboard-text-color)]/80">Disqualification Reason</Label>
                              <p className="text-[var(--dashboard-text-color)] mt-1 text-sm bg-[#0A0A0A] p-3 rounded border border-[#2A2A2A] whitespace-pre-wrap">
                                {selectedLead.disqualification_reason}
                              </p>
                            </div>
                          )}
                          <div>
                            <Label htmlFor="notes" className="text-[var(--dashboard-text-color)]/80">
                              Notes (Not Saved)
                            </Label>
                            <Textarea
                              id="notes"
                              value={currentNotes}
                              onChange={(e) => setCurrentNotes(e.target.value)}
                              placeholder="Add temporary notes here..."
                              className="mt-1 bg-[#0A0A0A] border-[#2A2A2A] text-[var(--dashboard-text-color)]"
                              rows={3}
                            />
                            <p className="text-xs text-[var(--dashboard-text-color)]/50 mt-1">
                              Notes are for temporary reference only.
                            </p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
