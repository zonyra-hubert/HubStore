import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TotalOrders } from "@/lib/infer-types";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";

const Sales = ({ totalOrders }: { totalOrders: TotalOrders[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> New Sales</CardTitle>
        <CardDescription>Here are your recent sales</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalOrders.map(
              ({ order, product, quantity, productVariants }) => (
                <TableRow className="font-medium" key={order.id}>
                  <TableCell>
                    {order.user.image && order.user.name ? (
                      <div className="flex gap-2 items-center w-32">
                        <Image
                          src={order.user.image}
                          width={25}
                          height={25}
                          alt={order.user.name}
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">{order.user.name}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Image
                          src={placeholder}
                          width={25}
                          height={25}
                          alt="User not found"
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">User not found</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <Image
                      src={productVariants.variantImages[0].url}
                      width={25}
                      height={25}
                      alt={product.title}
                      className="rounded-full"
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Sales;
