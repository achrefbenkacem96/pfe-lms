"use client"

import { LocaleHasTranslationKey } from "@/lib/i18n"
import { SidebarNavItem } from "@/components/with-sidebar/sidebar-nav-item"
import { protectedRoutes } from "@/app.config"

export function SidebarNav() {
  const notifications: LocaleHasTranslationKey<React.ReactNode> = {
    dashboard: "2",
  }
  const routes = [protectedRoutes.dashboard]
  return (
    <>
      {routes.map(
        (route, index) =>
          route && (
            <SidebarNavItem
              key={index}
              className="flex justify-between"
              href={route.href}
              icon={route.icon}
              notification={notifications[route.translationKey] || null}
            >
              {route.translationKey}
            </SidebarNavItem>
          ),
      )}
    </>
  )
}
