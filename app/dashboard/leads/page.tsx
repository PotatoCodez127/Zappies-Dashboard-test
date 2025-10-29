"use client"

import { LeadsTable } from "@/components/dashboard/leads-table"
import { useCompanySupabase } from "@/lib/supabase/company-client"
import { AlertTriangle, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Define the structure for a single, combined lead entry
interface CombinedLead {
  id: number | string 
  created_at: string
  full_name: string | null
  email: string | null
  company_name: string | null
  goal: string | null
  monthly_budget: number | null 
  resulted_in_meeting: boolean | null // Use 'resulted_in_meeting' to align with call_history
  disqualification_reason: string | null
  call_duration_seconds: number | null 
  lead_type: 'conversation' | 'call' 
}

export default function LeadsPage() {
  const companySupabase = useCompanySupabase()
  const [leads, setLeads] = useState<CombinedLead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLeads() {
      if (!companySupabase) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      
      try {
        // --- START OF FIX ---
        // 1. Fetch Conversation Leads
        // We are now only selecting columns that exist in conversation_history
        // based on your sample data: id, created_at, status, meeting_booked
        const { data: conversationData, error: convError } = await companySupabase
          .from("conversation_history")
          .select("id, created_at, status, meeting_booked") // <-- This line is fixed
          .order("created_at", { ascending: false })

        if (convError) {
          console.error("Leads Page Error (Conversation):", convError)
          throw convError
        }

        const conversationLeads: CombinedLead[] = (conversationData || []).map((c: any) => ({
          // Map the few fields we have
          id: `conv-${c.id}`, 
          created_at: c.created_at,
          resulted_in_meeting: c.meeting_booked, // Map meeting_booked to resulted_in_meeting
          lead_type: 'conversation',
          
          // Set all other fields to null as they don't exist on this table
          full_name: null,
          email: null,
          company_name: null,
          goal: null, // 'history' JSON blob is not queried here
          monthly_budget: null,
          disqualification_reason: null, 
          call_duration_seconds: null,
        }))
        // --- END OF FIX ---


        // 2. Fetch Call Leads (This query was already correct)
        const { data: callData, error: callError } = await companySupabase
          .from("call_history")
          .select("id, created_at, full_name, email, company_name, goal, monthly_budget, resulted_in_meeting, disqualification_reason, client_number, call_duration_seconds")
          .order("created_at", { ascending: false })

        if (callError) {
          console.error("Leads Page Error (Call):", callError)
          throw callError
        }
        
        const callLeads: CombinedLead[] = (callData || []).map((c: any) => ({
          ...c,
          id: `call-${c.id}`, 
          lead_type: 'call',
        }))

        // 3. Combine and sort
        const combinedLeads = [...conversationLeads, ...callLeads].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        
        setLeads(combinedLeads)

      } catch (error) {
        console.error("Error fetching combined leads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [companySupabase])


  if (!companySupabase) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--dashboard-text-color)]">Database Not Connected</h3>
            <p className="text-[var(--dashboard-text-color)]/60 mt-2 max-w-md mx-auto">
              Please connect your bot's database in the settings to view lead data.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="bg-[#1A1A1A] border-[#2A2A2A] h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 text-[var(--dashboard-text-color)]/60 mx-auto mb-3 animate-spin" />
          <p className="text-lg text-[var(--dashboard-text-color)]/60">Loading leads data...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dashboard-text-color)] tracking-tight">Leads History</h2>
      {/* The leads table component is correct and does not need changes */}
      <LeadsTable leads={leads} /> 
    </div>
  )
}
