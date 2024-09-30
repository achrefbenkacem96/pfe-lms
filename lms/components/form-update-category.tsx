"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
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
import { update } from "@/actions/category";
import Link from "next/link";
import { CategorySchema } from "@/schemas/category";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function FormUpdateCategory({
  id,
  name,
  setOpen,
}: {
  id: string,
  name:string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}) {
   const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); 
  const router = useRouter()
  const form = useForm<z. infer<typeof CategorySchema>> ({
    resolver: zodResolver (CategorySchema),
    defaultValues: { 
    name:"",
    id:id,
    },
    });
    const onSubmit= (values: z. infer<typeof CategorySchema>) => {
      console.log("🚀 ~ onSubmit ~ values:", values)
      setError("")
      setSuccess("")
      startTransition (() => {
        update(values)
        .then((data) => {
          setError(data.error) ;
          setSuccess (data.success) ;
          if (data.success) {
            toast.success("Category updated");
            
          } else {
            toast.error("Something went wrong!");
            
          }
          setOpen(false)

          router.refresh()
        });
      })
    }
  return (
    <section className="space-y-8 py-12">
      <header className="flex justify-center">
        <h1 className="flex flex-col items-center space-y-4 text-3xl font-extrabold">
          <span>Update Category</span>
        </h1>
        
      </header>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
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
                  placeholder={name}
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
