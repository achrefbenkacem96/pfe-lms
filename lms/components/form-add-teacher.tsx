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
import { SocialProvider } from "@/lib/auth/types"
import { ButtonSocialLogin } from "@/components/button-social-login"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-errors";
import { FormSuccess } from "./form-success";
import { RegisterSchema } from "@/schemas/register";
import { register } from "@/actions/register";
import { CreateSchema } from "@/schemas/user";
import { create } from "@/actions/user";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function FormAddTeacher(
  {setOpen}:
  {setOpen: React.Dispatch<React.SetStateAction<boolean>>}
){
   const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z. infer<typeof CreateSchema>> ({
    resolver: zodResolver (CreateSchema),
    defaultValues: {
    email: "",
    password: "",
    name:"",
    role:UserRole.TEACHER,
    },
    });
    const onSubmit= (values: z. infer<typeof CreateSchema>) => {
      console.log("🚀 ~ onSubmit ~ values:", values)
      setError("")
      setSuccess("")
      startTransition (() => {
        create(values)
        .then((data) => {
          setError(data.error) ;
          setSuccess (data.success) ;
          if (data.success) {
            toast.success("Student created");
            
          } else {
            toast.error("Something went wrong!");
            
          }
          setOpen(false)

          router.refresh()
        });
      })
    }
  return (
    <section className="space-y-8  ">
     
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
