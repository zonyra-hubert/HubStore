import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance, subMinutes } from "date-fns";

import {} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";

const Page = async () => {
  const user = await auth();
  if (!user) {
    redirect("/login");
  }
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userID, user.user.id),
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: { with: { variantImages: true } },
          order: true,
        },
      },
    },
  });
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Card className="">
        <CardHeader>
          <CardTitle>Your appointments</CardTitle>
          <CardDescription>
            Check the status of your property viewing appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent appointments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === "succeeded"
                          ? "bg-green-700 hover:bg-green-800"
                          : "bg-yellow-700 hover:bg-yellow-800"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {formatDistance(subMinutes(order.created!, 0), new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"}>
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <DialogTrigger>
                              <Button className="w-full" variant={"ghost"}>
                                View Appointment
                              </Button>
                            </DialogTrigger>
                          </DropdownMenuItem>
                          {order.receiptURL ? (
                            <DropdownMenuItem>
                              <Button
                                asChild
                                className="w-full"
                                variant={"ghost"}
                              >
                                <Link href={order.receiptURL} target="_blank">
                                  Download Confirmation
                                </Link>
                              </Button>
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="rounded-md">
                        <DialogHeader>
                          <DialogTitle>
                            Appointment Details #{order.id}
                          </DialogTitle>
                          <DialogDescription>
                            Appointment summary is ${order.total}
                          </DialogDescription>
                        </DialogHeader>
                        <Card className="overflow-auto p-2 flex flex-col gap-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Starting From</TableHead>
                                <TableHead>Listing</TableHead>
                                <TableHead>Property Type</TableHead>
                                <TableHead>Number of Visitors</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.orderProduct.map(
                                ({ product, productVariants, quantity }) => (
                                  <TableRow key={product.id}>
                                    <TableCell>
                                      <Image
                                        src={
                                          productVariants.variantImages[0].url
                                        }
                                        width={48}
                                        height={48}
                                        alt={product.title}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      Starting From ${product.price}
                                    </TableCell>
                                    <TableCell>
                                      <p>{product.title}</p>
                                    </TableCell>
                                    <TableCell>
                                      <div
                                        className="h-4 w-4 rounded-full"
                                        style={{
                                          backgroundColor:
                                            productVariants.color,
                                        }}
                                      ></div>
                                    </TableCell>
                                    <TableCell>{quantity}</TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default Page;
