"use client";

import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { updateProfile } from "@/actions/user";

interface FormProfileProps {
  initialData: User;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Title is required",
  }),
  email: z.string().min(1, {
    message: "Title is required",
  }),
  phone: z.string().min(1, {
    message: "Title is required",
  }),
  password: z.string().min(1, {
    message: "Title is required",
  }),
  new_password: z.string().min(1, {
    message: "Title is required",
  }),
  confirm_password: z.string().min(1, {
    message: "Title is required",
  }),
});

const FormProfile = ({ initialData }: FormProfileProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    
    try {
      await  updateProfile(values,initialData).then((data) => {
        if(data.success){
          toast.success(data.success);
          
        }else{
            //@ts-ignore
      toast.error(data.error);

          }
        })
    } catch (e) {
      console.log("🚀 ~ onSubmit ~ e:", e)
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <div className="px-4 space-y-6 md:px-6">
            <header className="space-y-1.5">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    initialData.image ? initialData.image : "/placeholder.svg"
                  }
                  alt="Avatar"
                  width="96"
                  height="96"
                  className="border rounded-full"
                  style={{ aspectRatio: "96/96", objectFit: "cover" }}
                />
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-bold">{initialData.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    {initialData.role}
                  </p>
                </div>
              </div>
            </header>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder={field.value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder={field.value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder={field.value || "+216 58 455 236"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              type="password"
                              placeholder={"*******"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              type="password"
                              placeholder={"*******"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              type="password"
                              placeholder={ "*******"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormProfile;
