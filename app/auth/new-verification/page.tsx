import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";
const EmailVerification = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default EmailVerification;
