import { Hero } from "@/components/hero"
import { HeroSubtitle } from "@/components/hero-subtitle"
import { HeroTitle } from "@/components/hero-title"
import { PricingSelector } from "@/components/pricing-selector"
import { PricingFAQ } from "@/components/pricing-faq"

export default async function Pricing() {
   return (
    <main>
      <Hero>
        <HeroTitle>Pricing</HeroTitle>
        <HeroSubtitle>The below numbers are just examples, Boilerthing is free.</HeroSubtitle>
      </Hero>
      <PricingSelector />
      <PricingFAQ />
    </main>
  )
}
