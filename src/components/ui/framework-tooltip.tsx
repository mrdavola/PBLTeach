"use client"

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { getTooltip } from "@/lib/data/tooltips"
import { cn } from "@/lib/utils"

interface FrameworkTooltipProps {
  term: string
  children: React.ReactNode
  className?: string
}

export function FrameworkTooltip({ term, children, className }: FrameworkTooltipProps) {
  const tooltip = getTooltip(term)

  if (!tooltip) {
    return <>{children}</>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "border-b border-dashed border-neutral-400 cursor-help",
            className
          )}
          render={<span />}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>{tooltip.definition}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface FrameworkTermProps {
  term: string
  className?: string
}

export function FrameworkTerm({ term, className }: FrameworkTermProps) {
  const tooltip = getTooltip(term)
  if (!tooltip) return null

  return (
    <FrameworkTooltip term={term}>
      <span className={cn("font-medium", className)}>{tooltip.term}</span>
    </FrameworkTooltip>
  )
}
