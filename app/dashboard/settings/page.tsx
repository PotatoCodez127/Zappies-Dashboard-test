/* v0-cool-site/app/dashboard/settings/page.tsx */
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export default async function SettingsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch profile is no longer needed directly by ProfileSettings component
  // const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="space-y-6">
      <div>
         {/* Use theme text colors */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Settings</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Manage your account and company settings.</p>
      </div>

      {/* ProfileSettings now uses theme styles internally */}
      <ProfileSettings user={user} />
    </div>
  )
}