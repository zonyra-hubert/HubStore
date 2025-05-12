import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { db } from "@/server";
import { orderProduct } from "@/server/schema";
import { desc } from "drizzle-orm";
import Sales from "./sales";
import Earnings from "./earnings";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Analytics = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");
  const totoalOrders = await db.query.orderProduct.findMany({
    orderBy: [desc(orderProduct.id)],
    limit: 10,
    with: {
      order: { with: { user: true } },
      product: true,
      productVariants: { with: { variantImages: true } },
    },
  });
  if (totoalOrders.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Orders</CardTitle>
        </CardHeader>
      </Card>
    );
  if (totoalOrders)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Card>
          <CardHeader>
            <CardTitle>Your Analytics </CardTitle>
            <CardDescription>
              Check your sales, new customers and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Sales totalOrders={totoalOrders} />
            <Earnings totalOrders={totoalOrders} />
          </CardContent>
        </Card>
      </Suspense>
    );
};
export default Analytics;
