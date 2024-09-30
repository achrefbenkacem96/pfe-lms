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

export function FormLogin() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
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
            </div>
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button
          className="bg-white text-black border-gray-400"
          onClick={() => onClick("google")}
          size="lg"
        >
          <FcGoogle className="w-5 " /> Sign in with Google
        </Button>
        <Button
          className="bg-white text-black border-gray-400"
          onClick={() => onClick("github")}
          size="lg"
        >
          <FaGithub className="w-5 " />
          Sign in with GitHub
        </Button>
      </div>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button
          variant="link"
          className="font-normal w-full"
          size="sm"
          type="button"
          asChild
        >
          <Link href={"/register"} scroll={false}>
            Don{"'"}t have an account?
          </Link>
        </Button>
      </div>
    </section>
  );
}
