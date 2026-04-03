import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RequestAccessPage() {
  const session = await auth();

  if (session?.user.role === "admin") {
    redirect("/dashboard/add-product");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Privileges Required</CardTitle>
        <CardDescription>
          You need admin privileges to list a property.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Please contact the admin to request listing privileges. If you are an
          admin please log in with the appropriate account. else email us at
          danielshubert@gmail.com WhatsApp: +233553724521
        </p>
      </CardContent>
    </Card>
  );
}
