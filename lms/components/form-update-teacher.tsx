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

export function FormUpdateTeacher({
  id
}: {
  id: string
}) {
   const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); 
  const form = useForm<z. infer<typeof UserSchema>> ({
    resolver: zodResolver (UserSchema),
    defaultValues: {
    email: "",
    password: "",
    name:"",
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
        });
      })
    }
  return (
    <section className="space-y-8 py-12">
      <header className="flex justify-center">
        <h1 className="flex flex-col items-center space-y-4 text-3xl font-extrabold">
          <span>Update Teacher</span>
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
          <Link href="/dashboard/teachers">
            <Button size="sm" variant="ghost">
              Teachers list
            </Button>
          </Link>
        </Form>
        </div>
   
    </section>
  )
}
