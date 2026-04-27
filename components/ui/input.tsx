import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-full border border-border bg-surface-container-high px-4 py-2 text-body-md text-text-main transition-all duration-300 outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50",
        className
      )}

      {...props}
    />
  )
}

export { Input }
