import { NewPasswordForm } from "@/components/auth/new-password-form";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";
const NewPass = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPass;
