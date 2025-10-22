/* v0-cool-site/components/ui/badge.tsx */
import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow,border-color] overflow-hidden outline-none",
  {
    variants: {
      variant: {
        // Default uses primary (purple) with low opacity bg and border
        default: "border-primary/50 bg-primary/10 text-primary [a&]:hover:bg-primary/20",
        // Secondary uses dark gray bg and light text
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        // Destructive uses its defined colors
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        // Outline uses subtle purple border and light text
        outline: "text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Status colors - using appropriate bright colors for visibility on dark bg
        success: "border-green-600/50 bg-green-900/30 text-green-400 [a&]:hover:bg-green-800/30",
        warning: "border-yellow-600/50 bg-yellow-900/30 text-yellow-400 [a&]:hover:bg-yellow-800/30",
        error: "border-red-600/50 bg-red-900/30 text-red-400 [a&]:hover:bg-red-800/30", // Consistent red for errors
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }