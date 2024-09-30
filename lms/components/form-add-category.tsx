"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import
{Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage 
}
from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-errors";
import { FormSuccess } from "./form-success";
import { UserRole } from "@prisma/client";
import { CategorySchema } from "@/schemas/category";
import { create } from "@/actions/category";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function FormAddCategory(
  {setOpen}:
  {setOpen: React.Dispatch<React.SetStateAction<boolean>>}
) {
   const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z. infer<typeof CategorySchema>> ({
    resolver: zodResolver (CategorySchema),
    defaultValues: {
      name:"",
     },
    });
    const onSubmit= (values: z. infer<typeof CategorySchema>) => {
      setError("")
      setSuccess("")
      startTransition (() => {
        create(values)
        .then((data) => {
          setError(data.error) ;
          setSuccess (data.success) ;
          if (data.success) {
            toast.success("Category created");
            
          } else {
            toast.error("Something went wrong!");
            
          }
          setOpen(false)
          router.refresh()
        });
      })
    }
  return (
    <section className="">
      
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center">
        <Form {...form}>
          <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          > 
          <div className="space-y-4">
           
          <FormField
            control={form.control}
            name="name"
            render={({ field}) => (
              <FormItem>
              <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="Name"
                  disabled={isPending}
                  type="text"
                  />
                </FormControl>
            </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
          type="submit"
          disabled={isPending}

          className="w-full">
             Submit
          </Button>
          </form>

        </Form>
        </div>
   
    </section>
  )
}
