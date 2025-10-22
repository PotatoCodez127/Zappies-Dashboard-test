/* v0-cool-site/components/dashboard/profile-settings.tsx */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useCompany } from "@/components/dashboard/company-provider"

// Ensure Company interface matches expected data if needed
interface Company {
  id: string
  name: string | null
  owner_id: string | null
  supabase_url: string | null
  supabase_anon_key: string | null
  // Add any other company fields here
}

export function ProfileSettings({ user }: { user: { id: string; email?: string } }) { // Removed unused profile prop
  const companyInfo = useCompany()
  const router = useRouter()
  const { toast } = useToast()

  const [companyName, setCompanyName] = useState("")
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("")

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (companyInfo) {
      setCompanyName(companyInfo.name || "")
      setSupabaseUrl(companyInfo.supabase_url || "")
      setSupabaseAnonKey(companyInfo.supabase_anon_key || "")
    }
  }, [companyInfo])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    if (!companyInfo || !companyInfo.id) {
       toast({ title: "Frontend Error", description: "Company info missing.", variant: "destructive" })
       setIsUpdating(false)
       return;
    }

    const supabase = createClient()

    try {
      const updates = {
        name: companyName,
        supabase_url: supabaseUrl,
        supabase_anon_key: supabaseAnonKey,
        updated_at: new Date().toISOString(),
      }
      const { error } = await supabase.from("companies").update(updates).eq("id", companyInfo.id)
      if (error) throw error

      toast({ title: "Success!", description: "Your settings have been updated." })
      router.refresh()
    } catch (error) {
       const err = error as any;
       toast({ title: "Update Failed", description: err.message || "An unknown error occurred.", variant: "destructive" })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <form onSubmit={handleUpdate} className="grid gap-6">
      {/* Card uses theme styles now */}
      <Card>
        <CardHeader>
          {/* Titles/Descriptions use theme colors */}
          <CardTitle>Company & Database Settings</CardTitle>
          <CardDescription>Manage your company details and connect your bot's database.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {/* Label uses theme muted color */}
            <Label htmlFor="companyName">Company Name</Label>
            {/* Input uses theme styles */}
            <Input id="companyName" type="text" value={companyName || ''} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your Company Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supabaseUrl">Supabase URL</Label>
            <Input id="supabaseUrl" type="url" value={supabaseUrl || ''} onChange={(e) => setSupabaseUrl(e.target.value)} placeholder="https://<your-project-ref>.supabase.co" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supabaseAnonKey">Supabase Anon Key</Label>
            <Input id="supabaseAnonKey" type="text" value={supabaseAnonKey || ''} onChange={(e) => setSupabaseAnonKey(e.target.value)} placeholder="Enter your Supabase anon (public) key" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        {/* Button uses default light variant */}
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}