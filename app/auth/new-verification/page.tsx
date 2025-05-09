import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import { Suspense } from "react";
const EmailVerification = () => {
  return (
    <Suspense>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default EmailVerification;
