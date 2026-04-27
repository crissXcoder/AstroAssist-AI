import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  variant = "standard",
  ...props
}: React.ComponentProps<"div"> & { variant?: "standard" | "elevated" }) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-6 overflow-hidden transition-all duration-300",
        variant === "standard" && "bg-card text-text-main rounded-xl p-6 border border-white/5 shadow-xl",
        variant === "elevated" && "bg-card-elevated text-text-main rounded-2xl p-8 border border-white/10 shadow-2xl hover:scale-[1.01]",
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
