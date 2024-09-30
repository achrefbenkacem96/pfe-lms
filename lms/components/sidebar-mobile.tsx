"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
 import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { SidebarMobileNavItem } from "@/components/sidebar-mobile-nav-item"
import { publicRoutes } from "@/app.config"

const routes = [publicRoutes.pricing, publicRoutes.contact]

export function SidebarMobile({ className }: { className?: string }) {
   const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger
        className={cn("transition hover:opacity-30", className)}
        aria-label={"Open Sidebar"}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        role="navigation"
        aria-label={"Mobile Navigation"}
      >
        <SheetHeader>
          <SheetTitle>
            <Logo href="/" />
          </SheetTitle>
          <SheetDescription asChild>
            <div className="space-y-8">
              <ul className="flex flex-col items-start space-y-2 pt-4">
                {routes.map(
                  item =>
                    item && (
                      <SidebarMobileNavItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        onClick={() => setSheetOpen(false)}
                      >
                        {  item.translationKey }
                      </SidebarMobileNavItem>
                    ),
                )}
                <SidebarMobileNavItem
                  className="mt-8"
                  href={publicRoutes.login?.href}
                  icon={publicRoutes.login?.icon}
                  scroll={false}
                  onClick={() => setSheetOpen(false)}
                >
                  { publicRoutes.login?.translationKey || "login" }
                </SidebarMobileNavItem>
              </ul>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
