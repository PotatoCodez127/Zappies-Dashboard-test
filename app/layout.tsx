// File: app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
// --- CORRECTED: Ensure this import is present ---
import { ThemeProvider } from "@/components/theme-provider"
// --- END CORRECTION ---

export const metadata: Metadata = {
  title: "Zappies AI - Custom AI Agents for Premium Home Builders",
  description:
    "Transform your custom home building operations with exclusive AI agents designed for South Africa's most prestigious builders.",
  generator: "v0.app",
  icons: {
    icon: '/favicon.png', // Or '/favicon.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning for next-themes */}
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Wrap children with ThemeProvider and apply necessary props */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false} // Optional: Disable system theme preference override
        >
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}