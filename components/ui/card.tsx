/* v0-cool-site/components/ui/card.tsx */
import type * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styles: dark background, rounded corners, basic padding
        "text-card-foreground flex flex-col gap-6 rounded-xl bg-card relative overflow-hidden p-6", // Use p-6 for consistent padding
        // Glowing Border: thin purple border with a subtle shadow simulating glow
        "border border-primary/60 shadow-[0_0_12px_1px_hsl(var(--primary)/0.4)]", // Adjusted opacity/spread
        // Animation
        "animate-in fade-in duration-500",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Remove default padding from header, rely on Card's padding
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  // Use text-foreground for main titles
  return <div data-slot="card-title" className={cn("leading-none font-semibold text-foreground", className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  // Use text-muted-foreground for descriptions
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  // Remove default padding from content, rely on Card's padding
  return <div data-slot="card-content" className={cn("", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  // Remove default padding from footer, rely on Card's padding
  return <div data-slot="card-footer" className={cn("flex items-center", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }