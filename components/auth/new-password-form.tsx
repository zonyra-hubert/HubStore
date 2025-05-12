"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "./auth-card";

import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

import { useAction } from "next-safe-action/hook";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-succes";
import { FormError } from "./form-error";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { newPasswordSchema } from "@/types/new-password-schema";
import { newPassword } from "@/server/actions/new-password";

export const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(newPassword, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        setSuccess(data.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    execute({ password: values.password, token });
  };

  return (
    <Suspense>
      <AuthCard
        className=""
        cardTitle="Enter a new password"
        backButtonHref="/auth/login"
        backButtonLable="Back to login"
        showSocials
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*********"
                          type="password"
                          autoComplete="current-password"
                          disabled={status === "executing"}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button size={"sm"} variant={"link"} asChild>
                  <Link href="/auth/reset">Forgot your password</Link>
                </Button>
              </div>
              <Button
                type="submit"
                className={cn(
                  "w-full",
                  status === "executing" ? "animate-pulse" : ""
                )}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </Suspense>
  );
};
