"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "next-safe-action/hook";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { deleteProduct } from "@/server/actions/delete-product";
import { toast } from "sonner";
import Link from "next/link";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductVariant from "./product-variant";

export type ProductColumn = {
  title: string;
  price: number;
  image: string;
  variants: VariantsWithImagesTags[];
  id: number;
};

const ActionCell = ({ row }: { row: Row<ProductColumn> }) => {
  const { execute } = useAction(deleteProduct, {
    onSuccess: (data) => {
      if (!data) {
        toast.error("Data not found");
        return;
      }
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
    onExecute: () => {
      const toastId = toast.loading("Deleting product...");
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
  });

  const product = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
          <Link href={`/dashboard/add-product?id=${product.id}`}>
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            execute({ id: product.id });
          }}
          className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns: ColumnDef<ProductColumn>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];
      return (
        <div className="flex gap-2">
          {variants?.map((variant) => {
            return (
              <div key={variant.id}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ProductVariant
                        productID={variant.productID}
                        variant={variant}
                        editMode={true}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          key={variant.id}
                          style={{ backgroundColor: variant.color }}
                        />
                      </ProductVariant>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{variant.productType}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <ProductVariant productID={row.original.id} editMode={false}>
                    <PlusCircle className="w-5 h-5 " />
                  </ProductVariant>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new product variant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;

      return (
        <div>
          <Image
            src={image}
            alt={cellTitle}
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
