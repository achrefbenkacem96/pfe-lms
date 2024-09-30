import { Apple, Banana, Cherry, Citrus } from "lucide-react"
import { LandingSection } from "@/components/landing-section"
import { LandingSubtitle } from "@/components/landing-subtitle"
import { LandingTitle } from "@/components/landing-title"

export async function LandingReferences() {
  return (
    <LandingSection className="bg-zinc-50" classNameContainer="py-6 lg:py-12">
      <div className="space-y-2 text-center">
        <LandingSubtitle>References</LandingSubtitle>
        <LandingTitle>Top companies trust the thing.</LandingTitle>
      </div>
      <div className="grid gap-4 sm:mx-auto sm:max-w-lg sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4 lg:gap-8">
        <div className="flex items-center justify-center space-x-4">
          <Cherry className="size-6 shrink-0 text-zinc-500 lg:size-10" />
          <p className="text-xl font-bold text-zinc-500">
            Cherry Inc.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Banana className="size-6 shrink-0 text-zinc-500 lg:size-10" />
          <p className="text-xl font-bold text-zinc-500">
            Banana Biz.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Apple className="size-6 shrink-0 text-zinc-500 lg:size-10" />
          <p className="text-xl font-bold text-zinc-500">
            Braeburn Ltd.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Citrus className="size-6 shrink-0 text-zinc-500 lg:size-10" />
          <p className="text-xl font-bold text-zinc-500">
            Citrus Co.
          </p>
        </div>
      </div>
    </LandingSection>
  )
}
