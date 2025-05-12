import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import ProductForm from "./product-form";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";

export default async function AddProductLayout() {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductForm />
    </Suspense>
  );
}
