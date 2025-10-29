import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth checks
  if (!supabaseUrl || !supabaseAnonKey) {
    return res
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = req.nextUrl

  const publicRoutes = [
    "/",
    "/how-it-works",
    "/features",
    "/contact",
    "/privacy",
    "/terms",
    "/auth/login",
    "/auth/signup",
    "/auth/verify",
    "/free-bot",
    "/free-bot/personalize",
    "/free-bot/activate",
    "/bot-activated",
  ]

  // Check if the current route is a public route
  if (publicRoutes.includes(pathname)) {
    return res
  }

  // if user is not signed in and the current path is not /auth/login, redirect the user to /auth/login
  if (!user && pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // if user is signed in and the current path is /auth/login, redirect the user to /dashboard
  if (user && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more routes.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
