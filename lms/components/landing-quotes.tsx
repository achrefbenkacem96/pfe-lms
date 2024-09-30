import { Banana, Cherry, Citrus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LandingSection } from "@/components/landing-section"
import { LandingSubtitle } from "@/components/landing-subtitle"
import { LandingTitle } from "@/components/landing-title"

export async function LandingQuotes() {
  return (
    <LandingSection className="bg-zinc-100/80">
      <div className="space-y-2 text-center">
        <LandingSubtitle>Testimonials</LandingSubtitle>
        <LandingTitle>People love using the thing.</LandingTitle>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Quote
          quote="The thing is the best thing I've ever used. Trust me bro."
          name="Jules Winnfield"
          position="CEO, Banana Biz."
          icon={Banana}
        />
        <Quote
          quote="The thing unparalleled things that have advanced our business."
          name="Mia Wallace"
          position="Product Manager, Cherry Inc."
          icon={Cherry}
        />
        <Quote
          quote="I'm telling you - other things cannot compete with this thing."
          name="Vincent Vega"
          position="Public Relations, Citrus Co."
          icon={Citrus}
        />
      </div>
    </LandingSection>
  )
}

export function Quote({
  quote,
  name,
  position,
  icon: Icon,
}: {
  quote: string
  name: string
  position: string
  icon: React.ElementType
}) {
  return (
    <Card className="flex flex-col border-0 bg-white shadow-none">
      <CardHeader className="flex flex-1 flex-row gap-2 pb-4">
        <CardTitle className="!ml-0 !mt-0 text-xl font-medium text-zinc-800">
          &quot;{quote}&quot;
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-6 flex space-x-2">
        <span>
          <Icon className="size-8 text-zinc-500" />
        </span>
        <span>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs text-zinc-500">{position}</p>
        </span>
      </CardContent>
    </Card>
  )
}
