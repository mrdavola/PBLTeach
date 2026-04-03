import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "font-body flex field-sizing-content min-h-[120px] w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-neutral-500 focus-visible:border-brand-teal focus-visible:shadow-[0_0_0_3px_rgba(13,115,119,0.1)] disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
