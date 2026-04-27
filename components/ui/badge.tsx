import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-1 text-label-sm font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary-container text-on-primary-container",
        primary: "bg-primary text-on-primary",
        secondary: "bg-surface-container-high text-text-main border-white/10",
        success: "bg-success-container text-on-success-container",
        warning: "bg-warning-container text-on-warning-container",
        destructive: "bg-error-container text-on-error-container",
        outline: "border-border text-text-soft hover:bg-surface-container-low",
        glass: "glass-panel text-text-main border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
