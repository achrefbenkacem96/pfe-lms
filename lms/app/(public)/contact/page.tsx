import { FormContact } from "@/components/form-contact"
import { Hero } from "@/components/hero"
import { HeroSubtitle } from "@/components/hero-subtitle"
import { HeroTitle } from "@/components/hero-title"
import { Section } from "@/components/section"

export default async function Contact() {
   return (
    <main>
      <Hero>
        <HeroTitle>Contact</HeroTitle>
        <HeroSubtitle>Don{"'"}t be a stranger, get in touch!</HeroSubtitle>
      </Hero>
      <Section container className="mb-24 max-w-3xl">
        <FormContact />
      </Section>
    </main>
  )
}
