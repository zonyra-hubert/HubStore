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

export const revalidate = 0;

const Analytics = async () => {
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
    );
};
export default Analytics;
