"use client"

 import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FormLogin } from "@/components/form-login"
import { useRouter } from "next/navigation"

export default function DialogLogin() {
  const router = useRouter()
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="w-full p-4 md:max-w-md overflow-y-scroll">
        <FormLogin />
      </DialogContent>
    </Dialog>
  )
}
