import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "next-themes"

import { Inter, Geist, Geist_Mono, Source_Serif_4, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"] })
const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Zappies AI - The Project Pipeline AI",
  description:
    "Automate lead qualification for elite renovators. 24/7 AI assistant that captures and qualifies high-budget clients instantly.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
