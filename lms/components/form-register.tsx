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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-errors";
import { FormSuccess } from "./form-success";
import { RegisterSchema } from "@/schemas/register";
import { register } from "@/actions/register";
import Image from "next/image";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function FormRegister() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      image: "",
      role: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "buglcs6v"); // Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dj9glpwmu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("🚀 ~ handleImageUpload ~ data:", data);
      form.setValue("image", data.secure_url);
      setImage(data.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };
  return (
    <section className="space-y-8 py-12">
      <header className="flex justify-center">
        <h1 className="flex flex-col items-center space-y-4 text-3xl font-extrabold">
          <span>Sign up</span>
        </h1>
      </header>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div
                className=" 
                            relative 
                            inline-block 
                            rounded-full 
                            overflow-hidden
                            h-28
                            w-28
                            md:h-28 
                            md:w-28
                          "
              >
                <Image
                  fill
                  src={image || "/images/placeholder.jpg"}
                  alt="Avatar"
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel  className="sr-only">Upload Profile Image</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                        onChange={handleImageUpload}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone"
                        disabled={isPending}
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            {...field}
                            value="TEACHER"
                            id="option-one"
                          />
                          <Label htmlFor="option-one">Teacher</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            {...field}
                            value="STUDENT"
                            id="option-two"
                          />
                          <Label htmlFor="option-two">Student</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="w-full">
              Create an account
            </Button>
          </form>
        </Form>
      </div>
      <hr className="mx-auto max-w-64" />
      <div className="flex flex-col items-center justify-center space-y-4">
        <ButtonSocialLogin provider={SocialProvider.Google} size="lg">
          Sign in with Google
        </ButtonSocialLogin>
        <ButtonSocialLogin provider={SocialProvider.Github} size="lg">
          Sign in with GitHub
        </ButtonSocialLogin>
      </div>
    </section>
  );
}
