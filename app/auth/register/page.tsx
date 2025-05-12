import RegisterForm from "@/components/auth/register-form";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";
export default function Register() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterForm />
    </Suspense>
  );
}
