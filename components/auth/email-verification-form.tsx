"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { newVerification } from "@/server/actions/tokens/tokens";
import { useCallback, useEffect, useState } from "react";
import AuthCard from "./auth-card";
import { FormSuccess } from "./form-succes";
import { FormError } from "./form-error";
import { Suspense } from "react";
import LoadingSpinner from "../Loading";

export const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("No token found");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, [error, router, success, token]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthCard
        className=""
        backButtonLable="Back to login"
        backButtonHref="/auth/login"
        cardTitle="Verify your account."
      >
        <div className="flex items-center flex-col w-full justify-center">
          <p>{!success && !error ? "Verifying email..." : null}</p>
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </AuthCard>
    </Suspense>
  );
};
