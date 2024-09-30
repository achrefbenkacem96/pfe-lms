"use client"

import { useCallback, useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { IconLoadingSpinner } from "@/components/icon-loading-spinner"
import { REDIRECT_NOT_AUTHENTICATED } from "@/app.config"

export function ButtonLogout({ className }: React.ComponentProps<"button">) {
  const [loading, setLoading] = useState(false)

  const handleSignOut = useCallback(async () => {
    setLoading(true)
    try {
      await signOut({ callbackUrl: REDIRECT_NOT_AUTHENTICATED })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Button
      className={className}
      variant="outline"
      onClick={() => handleSignOut()}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? (
        <IconLoadingSpinner size="xs" aria-hidden="true" />
      ) : (
        <span>Log out</span>
      )}
    </Button>
  )
}
