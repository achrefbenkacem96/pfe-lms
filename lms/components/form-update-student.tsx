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
import { RegisterSchema } from "@/schemas/register";
import { update } from "@/actions/user";
import { UserSchema } from "@/schemas/user";
import Link from "next/link";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function FormUpdateStudent({
  id,
  student,
  setOpen,
}: {
  id: string,
  student:User,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}){
   const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); 
  const router =useRouter();
  const form = useForm<z. infer<typeof UserSchema>> ({
    resolver: zodResolver (UserSchema),
    defaultValues: {
    email: student?.email || "",
    password: student?.password || "",
    name:student?.name || "",
    userId:id,
    },
    });
    const onSubmit= (values: z. infer<typeof UserSchema>) => {
      console.log("🚀 ~ onSubmit ~ values:", values)
      setError("")
      setSuccess("")
      startTransition (() => {
        update(values)
        .then((data) => {
          setError(data.error) ;
          setSuccess (data.success) ;
          if (data.success) {
            toast.success("Student updated");
          } else {
            toast.error("Something went wrong!");
          }
          setOpen(false);
          router.refresh();
        });
      })
    }
  return (
    <section className="">
      
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
            name="email"
            render={({ field}) => (
              <FormItem>
              <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  placeholder="email@gmail.com"
                  type="email"
                   
                  />
                </FormControl>
            </FormItem>
              )}
            />
             <FormField
            control={form.control}
            name="password"
            render={({ field}) => (
              <FormItem>
              <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="********"
                  disabled={isPending}

                  type="password"
                  />
                </FormControl>
            </FormItem>
              )}
            />
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
