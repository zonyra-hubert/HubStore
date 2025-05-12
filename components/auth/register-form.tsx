"use client";

import AuthCard from "./auth-card";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/types/register-schema";
import { Input } from "../ui/input";
import * as z from "zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { useAction } from "next-safe-action/hook";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { emailRegister } from "@/server/actions/email-register";
import { FormSuccess } from "./form-succes";
import { Suspense } from "react";
import LoadingSpinner from "../Loading";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { execute, status } = useAction(emailRegister, {
    onSuccess(data) {
      if (data.error) {
        setError(data.error);
      }

      if (data.success) {
        setSuccess(data.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
    // console.log(values);
  };
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <AuthCard
          className=""
          cardTitle="Create an account"
          backButtonHref="/auth/login"
          backButtonLable="Already have an account?"
          showSocials
        >
          {/* Add children content here */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      const restField = field; // Use field directly
                      return (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              {...restField} // Spread only valid props
                              placeholder="John Doe"
                              type="name"
                              autoComplete="name"
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      const restField = field; // Use field directly
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...restField} // Spread only valid props
                              placeholder="example@email.com"
                              type="email"
                              autoCapitalize="email"
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      const restField = field; // Use field directly
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...restField} // Spread only valid props
                              placeholder="**************"
                              type="password"
                              autoCapitalize="current-password"
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormSuccess message={success} />
                  <FormError message={error} />

                  <Button size={"sm"} variant={"link"}>
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                </div>
                <Button
                  type="submit"
                  className={cn(
                    "w-full",
                    status === "executing" ? "animate-pulse" : ""
                  )}
                >
                  {"Register"}
                </Button>
              </form>
            </Form>
          </div>
        </AuthCard>
      </Suspense>
    </>
  );
};

export default RegisterForm;
