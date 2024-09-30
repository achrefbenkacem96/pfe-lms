import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function PricingFAQ() {
  return (
    <div className="container max-w-2xl pb-24 pt-12">
      <Accordion type="single" collapsible>
        <AccordionItem value={String(1)}>
          <AccordionTrigger className="text-left text-xl font-bold">
          How do I upgrade the thing?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
          You can upgrade your thing at any time by visiting the billing page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={String(2)}>
          <AccordionTrigger className="text-left text-xl font-bold">
          Are there any hidden things?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
          No, there are no hidden things. What you see is what you get.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={String(3)}>
          <AccordionTrigger className="text-left text-xl font-bold">
          Can I share my thing with others?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
          Yes, you can share your thing with team members and collaborators.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={String(4)}>
          <AccordionTrigger className="text-left text-xl font-bold">
          Can I customize my thing?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
          Yes, our thing allows for extensive customization to fit your needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={String(5)}>
          <AccordionTrigger className="text-left text-xl font-bold">
           What if I need help with my thing?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
           Our support team is available 24/7 to help you with any thing-related issues.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
