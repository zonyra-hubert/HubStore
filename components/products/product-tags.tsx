"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
export default function ProductTags() {
  const router = useRouter();
  const params = useSearchParams();
  const tag = params.get("tag");

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }
    if (!tag) {
      router.push("/");
    }
  };

  return (
    <Suspense>
      <div className="my-4 flex gap-4 items-center justify-center">
        <Badge
          onClick={() => setFilter("")}
          className={cn(
            "cursor-pointer dark:text-white bg-black hover:bg-black/75 hover:opacity-100",
            !tag ? "opacity-100" : "opacity-50",
          )}
        >
          All
        </Badge>
        <Badge
          onClick={() => setFilter("hostel")}
          className={cn(
            "cursor-pointer dark:text-white bg-sky-500 hover:bg-sky-600 hover:opacity-100",
            tag === "hostel" && tag ? "opacity-100" : "opacity-50",
          )}
        >
          Hostel
        </Badge>
        <Badge
          onClick={() => setFilter("room")}
          className={cn(
            "cursor-pointer dark:text-white bg-green-500 hover:bg-green-600 hover:opacity-100",
            tag === "room" && tag ? "opacity-100" : "opacity-50",
          )}
        >
          Room
        </Badge>
        <Badge
          onClick={() => setFilter("house")}
          className={cn(
            "cursor-pointer dark:text-white bg-amber-500 hover:bg-amber-600 hover:opacity-100",
            tag === "house" && tag ? "opacity-100" : "opacity-50",
          )}
        >
          House
        </Badge>
      </div>
    </Suspense>
  );
}
