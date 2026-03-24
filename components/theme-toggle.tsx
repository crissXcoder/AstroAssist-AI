"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full shadow-none border border-transparent hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] opacity-100 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:opacity-0 dark:scale-0 text-neutral-800 dark:text-neutral-200" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] opacity-0 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:opacity-100 dark:scale-100 text-neutral-800 dark:text-neutral-200" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
