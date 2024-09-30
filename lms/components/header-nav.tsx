"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { publicRoutes } from "@/app.config"

const routes = [ publicRoutes.contact]

export function HeaderNav({ className }: { className?: string }) {
  return (
    <div className={cn("mt-1 flex items-center space-x-8", className)}>
      {routes.map(
        item =>
          item && (
            <Link
              className="text-black hover:text-zinc-500"
              key={item.href}
              href={item.href}
            >
              {item.translationKey}
            </Link>
          ),
      )}
    </div>
  )
}
