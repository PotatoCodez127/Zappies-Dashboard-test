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

  // Fetch the user's profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="space-y-6">
       {/* --- MODIFIED: Added Animation --- */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        <h2 className="text-3xl font-bold text-[var(--dashboard-text-color)]">Settings</h2>
        <p className="text-sm text-[var(--dashboard-text-color)]/60 mt-2">Manage your account and company settings.</p>
      </div>
      {/* --- END MODIFICATION --- */}

      {/* --- MODIFIED: Added Animation & Delay --- */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
        <ProfileSettings user={user} profile={profile} />
      </div>
       {/* --- END MODIFICATION --- */}
    </div>
  )
}