"use client"

import { useTransition } from "react"
import { useParams } from "next/navigation"
import { Globe } from "lucide-react"
// import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { appConfig } from "@/app.config"

export function LocaleSwitcher({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition()
  // const locale = useLocale()
  // const router = useRouter()
  // const pathname = usePathname()
  // const params = useParams()

  // function handleChange(value: string) {
  //   startTransition(() => {
  //     router.replace(
  //       // @ts-expect-error -- TypeScript will validate that only known `params`
  //       // are used in combination with a given `pathname`. Since the two will
  //       // always match for the current route, we can skip runtime checks.
  //       { pathname, params },
  //       { locale: value },
  //     )
  //     router.refresh()
  //   })
  // }

  return (
     <></>
  )
}
