import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";
const NewPass = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPass;
