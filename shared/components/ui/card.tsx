import * as React from "react"

import { cn } from "@/shared/utils/cn"

function Card({
  className,
  variant = "standard",
  ...props
}: React.ComponentProps<"div"> & { variant?: "standard" | "elevated" | "interactive" | "testimonial" | "selectable" | "compact" | "feature" }) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        "group/card relative flex flex-col overflow-hidden transition-all duration-300",
        variant === "standard" && "gap-6 bg-card text-text-main rounded-xl p-6 border border-white/5 shadow-xl",
        variant === "elevated" && "gap-6 bg-card-elevated text-text-main rounded-2xl p-8 border border-white/10 shadow-2xl hover:scale-[1.01]",
        variant === "interactive" && "gap-6 bg-surface-container-low text-text-main rounded-xl border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5",
        variant === "testimonial" && "gap-0 relative h-full bg-surface-container border border-white/5 rounded-xl p-8 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500",
        variant === "selectable" && "gap-4 relative p-6 rounded-xl border cursor-pointer transition-all duration-400 group border-white/5 bg-surface-container-low hover:border-white/20 hover:bg-surface-container data-[selected=true]:border-primary data-[selected=true]:bg-primary/10 data-[selected=true]:shadow-[0_10px_40px_rgba(98,87,244,0.15)]",
        variant === "compact" && "gap-5 p-5 rounded-xl bg-surface-container border border-white/5 hover:bg-surface-bright transition-all group shadow-xl flex-row items-center",
        variant === "feature" && "flex flex-col items-start p-8 md:p-10 space-y-4 bg-white/2 hover:bg-white/4 transition-colors border-0 rounded-none",
        className
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
        "flex flex-col gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-title-lg font-semibold tracking-tight text-text-main",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-body-sm text-text-soft", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-4 pt-2",
        className
      )}
      {...props}
    />
  )
}


export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
