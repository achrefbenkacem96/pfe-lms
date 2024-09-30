"use client"

import Link from "next/link"
import { FaGithub } from "react-icons/fa6"
import TypewriterComponent from "typewriter-effect"
import { useCurrentUser } from "@/lib/auth/hooks/use-current-user"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  const user = useCurrentUser()
  return (
    <div className="space-y-3 py-36 text-center font-bold sm:space-y-5">
      <div className="lg:text-7-xl z-50 space-y-1 text-3xl font-extrabold sm:space-y-5 sm:text-5xl md:text-6xl">
        <h1>
          <span className="underline">  LMS. </span>
          
        </h1>
        
        <div className="text-sm font-medium text-zinc-600 md:text-xl  ">
        learning management system 
        </div>
        <div className="!mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="gradient" size="xl">
            {user ? (
              <Link href="/dashboard">Get started</Link>
            ) : (
              <Link href="/login" scroll={false}>
                Start learning
              </Link>
            )}
          </Button>
        
        </div>
      </div>
    </div>
  )
}
