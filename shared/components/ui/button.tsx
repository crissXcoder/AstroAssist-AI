"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-hover shadow-lg shadow-primary/20",
        primary: "bg-primary text-on-primary hover:bg-primary-hover shadow-lg shadow-primary/20",
        secondary: "bg-surface-container-high text-text-main hover:bg-surface-bright",
        ghost: "bg-surface-container-low text-text-soft hover:bg-surface-container-high hover:text-text-main",
        outline: "border-border bg-transparent text-text-main hover:bg-surface-container-low hover:border-primary/50",
        destructive: "bg-error text-error-foreground hover:bg-error/90 shadow-lg shadow-error/20",
        link: "text-primary underline-offset-4 hover:underline px-0 h-auto",
        glass: "glass-panel text-text-main hover:bg-white/10 hover:border-white/20 transition-all",
      },
      size: {
        default: "h-12 px-6 text-label-md",
        xs: "h-8 px-3 text-label-sm",
        sm: "h-10 px-4 text-label-md",
        lg: "h-14 px-8 text-title-md",
        icon: "size-12 rounded-full",
        "icon-sm": "size-10 rounded-full",
        "icon-xs": "size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends ButtonPrimitive.Props {
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return (
        <ButtonPrimitive
          {...props}
          ref={ref}
          nativeButton={false}
          className={cn(buttonVariants({ variant, size, className }))}
          render={children}
        />
      )
    }

    return (
      <ButtonPrimitive
        {...props}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </ButtonPrimitive>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
