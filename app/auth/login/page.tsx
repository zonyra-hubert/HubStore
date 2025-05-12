import LoginForm from "@/components/auth/login-form";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";

export default async function Login() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {" "}
      <LoginForm />
    </Suspense>
  );
}
