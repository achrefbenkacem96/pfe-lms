"use client"

import Link from "next/link"
 import { cn } from "@/lib/utils"
import { useCurrentPath } from "@/hooks/use-current-path"
import { Button, ButtonProps } from "@/components/ui/button"

export function ButtonSignup({
  className,
  scroll = false,
  variant,
}: ButtonProps & { scroll?: boolean }) {
   const isCurrentPath = useCurrentPath("/login")
  return (
    <Button
      variant={variant}
      asChild
      className={cn("flex items-center justify-start", className)}
    >
      <Link href={!isCurrentPath ? "/register" : ""} scroll={scroll}>
      Sign up
      </Link>
    </Button>
  )
}
