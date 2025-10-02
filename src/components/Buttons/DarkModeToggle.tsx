"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true) // ensures theme is loaded client-side
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="relative rounded-full">
          {/* Sun for light mode */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />
          {/* Moon for dark mode */}
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-accent">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
