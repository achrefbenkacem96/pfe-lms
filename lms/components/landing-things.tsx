import Link from "next/link"
import { Mail, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LandingSection } from "@/components/landing-section"
import { LandingTitle } from "@/components/landing-title"

export async function LandingThings() {
  return (
    <div className="grid divide-y divide-dashed text-center lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <LandingSection>
        <div className="space-y-4">
          <Mail size={48} className="mx-auto text-zinc-500" />
          <LandingTitle>Wanna talk?</LandingTitle>
          <p className="text-zinc-500">We{"'"}re here to help.</p>
          <div className="space-x-4">
            <Button variant="outline" size="xl" asChild>
              <Link href="/">Contact us</Link>
            </Button>
          </div>
        </div>
      </LandingSection>
      <LandingSection>
        <div className="space-y-4">
          <Rocket size={48} className="mx-auto text-zinc-500" />
          <LandingTitle>Join the gang.</LandingTitle>
          <p className="text-zinc-500">Get started with Boilerthing today.</p>
          <div className="space-x-4">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/">Get started</Link>
            </Button>
          </div>
        </div>
      </LandingSection>
    </div>
  )
}
