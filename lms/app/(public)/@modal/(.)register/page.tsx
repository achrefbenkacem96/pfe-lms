"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FormRegister } from "@/components/form-register"

export default function DialogRegister() {
  const router = useRouter()
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="w-full p-4 md:max-w-md">
        <FormRegister />
      </DialogContent>
    </Dialog>
  )
}
