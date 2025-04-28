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

import { Input } from "../ui/input";
import * as z from "zod";
import Link from "next/link";
import { Button } from "../ui/button";

import { useAction } from "next-safe-action/hook";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-succes";
import { reset } from "@/server/actions/password-reset";
import { ResetSchema } from "@/types/reset-schema";

const NewPasswordForm = () => {
  // ⬅️ initialize router
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState("");
  const [succes, setSuccess] = useState("");

  const { execute, status } = useAction(reset, {
    onSuccess(data) {
      if (data?.error) {
        setError(data.error);
      } else if (data?.success) {
        setSuccess(data.success);

        //     // ⏳ Wait a bit then redirect
        //     setTimeout(() => {
        //       router.push("/");
        //     }, 1000); // 1-second delay
      }
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    execute(values);
  };

  return (
    <>
      <AuthCard
        className=""
        cardTitle="Forgot yor password"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="example@email.com"
                          type="email"
                          autoComplete="email"
                          disabled={status === "executing"}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={succes} />
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
                {"Reset Passowrd"}
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </>
  );
};

export default NewPasswordForm;
