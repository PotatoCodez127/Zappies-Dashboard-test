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

interface ProfileSettingsProps {
  user: {
    id: string
    email?: string
  }
  profile: {
    full_name: string | null
    company: string | null // This might be redundant if using CompanyProvider?
  } | null
}

export function ProfileSettings({ user, profile }: ProfileSettingsProps) {
  const companyInfo = useCompany()
  const router = useRouter()
  const { toast } = useToast()

  const [companyName, setCompanyName] = useState("")
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("")

  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (companyInfo) {
      setCompanyName(companyInfo.name || "");
      setSupabaseUrl(companyInfo.supabase_url || "");
      setSupabaseAnonKey(companyInfo.supabase_anon_key || "");
    }
  }, [companyInfo]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    if (!companyInfo || !companyInfo.id) {
      toast({ title: "Frontend Error", description: "Could not find company info.", variant: "destructive", });
      setIsUpdating(false); return;
    }

    const supabase = createClient()
    try {
      const updates = { name: companyName, supabase_url: supabaseUrl, supabase_anon_key: supabaseAnonKey, updated_at: new Date().toISOString() };
      const { data, error } = await supabase.from("companies").update(updates).eq("id", companyInfo.id).select();
      if (error) throw error;
      toast({ title: "Success!", description: "Settings updated." });
      router.refresh();
    } catch (error) {
      const err = error as any;
      toast({ title: "Update Failed", description: err.message || "An unknown database error occurred.", variant: "destructive", });
    } finally { setIsUpdating(false); }
  }

  return (
    <form onSubmit={handleUpdate} className="grid gap-6">
       {/* Card uses theme styling */}
      <Card>
        <CardHeader>
           {/* Use theme variables */}
          <CardTitle className="text-foreground">Company & Database Settings</CardTitle>
          <CardDescription className="text-muted-foreground">Manage details and connect your bot's database.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
             {/* Label uses theme styling */}
            <Label htmlFor="companyName">Company Name</Label>
             {/* Input uses theme styling */}
            <Input id="companyName" type="text" value={companyName || ''} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your Company Name" />
          </div>
          <div className="space-y-2">
            {/* Fix typo here */}
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
         {/* Button uses default theme variant */}
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}