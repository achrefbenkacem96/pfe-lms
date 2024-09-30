"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingCard, PricingMode } from "@/components/pricing-card"

export function PricingSelector() {
  const [pricingMode, setPricingMode] = useState(PricingMode.Monthly)
  return (
    <div className="py-6 lg:py-12">
      <div className="flex justify-center py-6 md:py-12">
        <Tabs
          value={pricingMode}
          onValueChange={pricingMode =>
            setPricingMode(pricingMode as PricingMode)
          }
          defaultValue="monthly"
        >
          <TabsList>
            <TabsTrigger value="monthly">{"Pay monthly"}</TabsTrigger>
            <TabsTrigger value="annual">
             Pay annually 
                  <Badge className="ml-2 bg-rose-500">
                  -20{"%"}
                  </Badge>
                
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="container w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <PricingCard
            name={"Free Thing"}
            subtitle={"For individuals"}
            monthlyPrice={0}
            annualPrice={0}
            features={[
              "Unlimited things",
              "Basic support",
              "Community access",
              "Standard security",
            ]}
            pricingMode={pricingMode}
          />
          <PricingCard
            name={"Pro Thing"}
            subtitle={"Advanced features"}
            monthlyPrice={100}
            annualPrice={1000}
            features={[
              "Custom things",
              "Priority support",
              "Advanced analytics",
              "Enhanced security",
            ]}
            pricingMode={pricingMode}
            recommended
          />
          <PricingCard
            name={"Team Thing"}
            subtitle={"For teams"}
            monthlyPrice={500}
            annualPrice={5000}
            features={[
              "Collaboration things",
              "Custom roles",
              "Dedicated support",
              "Custom integrations",
            ]}
            pricingMode={pricingMode}
          />
        </div>
        <div className="py-6 text-center text-xs text-zinc-500">
          <p className="">{"* Prices are in EUR and do not include VAT"}</p>
        </div>
      </div>
    </div>
  )
}
