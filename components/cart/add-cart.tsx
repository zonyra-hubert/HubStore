"use client";

import { useCartStore } from "@/lib/client-store";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function AddCart() {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const productID = Number(params.get("productID"));
  const type = params.get("type");
  const title = params.get("title");
  const price = Number(params.get("price"));
  const image = params.get("image");
  if (!id || !productID || !type || !title || !price || !image) {
    toast.error("Product not found");
    return redirect("/");
  }
  return (
    <>
      <Suspense>
        <div className="flex items-center gap-4 justify-stretch my-4">
          <Button
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
            variant={"secondary"}
            className="text-primary"
          >
            <Minus size={18} strokeWidth={3} />
          </Button>
          <Button className="flex-1">Quantity: {quantity}</Button>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            variant={"secondary"}
            className="text-primary"
          >
            <Plus size={18} strokeWidth={3} />
          </Button>
        </div>
        <Button
          onClick={() => {
            toast.success(`Added ${title + " " + type} to cart`);
            addToCart({
              id: productID,
              variant: { variantID: id, quantity },
              name: title + " " + type,
              price,
              image,
            });
          }}
        >
          Add to cart
        </Button>
      </Suspense>
    </>
  );
}
