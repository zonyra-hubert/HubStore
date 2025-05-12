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
import { LoginSchema } from "@/types/login-schema";
import { Input } from "../ui/input";
import * as z from "zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { emailSignIn } from "@/server/actions/email-signin";
import { useAction } from "next-safe-action/hook";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-succes";
import { signIn } from "next-auth/react"; // ✅ add this
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingSpinner from "../Loading";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [succes, setSuccess] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const { execute, status } = useAction(emailSignIn, {
    onSuccess: async (data) => {
      if (data?.error) {
        setError(data.error);
      }

      if (data?.success) {
        setSuccess(data.success);
      }

      if (data?.twoFactor) {
        setShowTwoFactor(true);
      }

      // ✅ Perform client-side sign in
      if (data?.verified) {
        await signIn("credentials", {
          email: form.getValues("email"),
          password: form.getValues("password"),
          redirect: true,
          callbackUrl: "/", // or wherever you want to send them
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    execute(values);
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthCard
        className=""
        cardTitle="Welcome back!"
        backButtonHref="/auth/register"
        backButtonLable="Create a new account"
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      We&apos;ve sent you a two factor code to your email
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        disabled={status === "executing"}
                        {...field}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
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
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
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
                          placeholder="**************"
                          type="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormSuccess message={succes} />
            <FormError message={error} />

            <Button className="px-0" size={"sm"} variant={"link"}>
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>

            <Button
              type="submit"
              className={cn(
                "w-full my-4",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              {showTwoFactor ? "Verify" : "Login"}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </Suspense>
  );
};

export default LoginForm;
