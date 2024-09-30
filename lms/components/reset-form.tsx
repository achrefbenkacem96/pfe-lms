"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SocialProvider } from "@/lib/auth/types";
import { ButtonSocialLogin } from "@/components/button-social-login";
import { LoginSchema } from "@/schemas/login";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-errors";
import { FormSuccess } from "./form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { ResetSchema } from "@/schemas/reset";
import { reset } from "@/actions/reset";

export function ResetForm() {
 
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",

    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <section className="space-y-8 py-12 ">
      <header className="flex justify-center">
        <h1 className="flex flex-col items-center space-y-4 text-3xl font-extrabold">
          <span>Sign in</span>
        </h1>
      </header>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
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
            
            </div>
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              {/* <Link href="/auth/reset">Forgot password?</Link> */}
            </Button>
            <FormError message={error } />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Send reset email
            </Button>
          </form>
        </Form>
      </div>
   
    </section>
  );
}
