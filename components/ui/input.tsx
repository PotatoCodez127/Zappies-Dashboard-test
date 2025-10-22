// File: components/ui/input.tsx
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles - Keep as is
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

        // --- MODIFICATION START ---
        // Removed: 'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        // Keep outline-none (already present in base)
        // Keep subtle border color change on focus
        'focus-visible:border-ring',
        // Add purple glow shadow on focus
        'focus-visible:shadow-[0_0_0_3px_theme(colors.ring/0.4)]',
        // --- MODIFICATION END ---

        // Invalid state - Keep as is
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }