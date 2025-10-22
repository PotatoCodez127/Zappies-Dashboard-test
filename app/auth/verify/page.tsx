/* v0-cool-site/app/auth/verify/page.tsx */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyPage() {
  return (
    // Use theme variables for background
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        {/* Use theme variables for card */}
        <Card>
          <CardHeader>
            {/* Use theme variables */}
            <CardTitle className="text-2xl text-foreground">Check your email</CardTitle>
            <CardDescription className="text-muted-foreground">We&apos;ve sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Use theme variables */}
            <p className="text-sm text-foreground/80">
              Please check your email and click the verification link to activate your account. Once verified, you can
              log in to access the dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}