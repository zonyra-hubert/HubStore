"use client";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function AddCart() {
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const type = params.get("type");
  const title = params.get("title");
  const price = Number(params.get("price"));

  if (!id || !type || !title || !price) {
    return null;
  }

  return (
    <>
      <Suspense>
        <div className="grid gap-3 my-4">
          <Button
            variant={"secondary"}
            onClick={() => {
              const message = `Hello, I am interested in ${title} (${type}) listed at ${price} per month. Is this listing still available?`;
              window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank",
              );
            }}
          >
            Book a Visit
          </Button>
          <Button
            onClick={() => {
              toast.success(
                "Booking request started. Host will contact you soon.",
              );
            }}
          >
            Schedule Viewing
          </Button>
        </div>
      </Suspense>
    </>
  );
}
