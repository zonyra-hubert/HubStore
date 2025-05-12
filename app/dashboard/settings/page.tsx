import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import SettingsCard from "./settings-card";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";
export default async function Settings() {
  const session = await auth();

  if (!session) redirect("/");
  if (session)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <SettingsCard session={session} />
      </Suspense>
    );
}
