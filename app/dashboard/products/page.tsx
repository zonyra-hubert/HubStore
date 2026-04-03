import { db } from "@/server";
import placeholder from "@/public/placeholder_small.jpg";
import { DataTable } from "./dataTable";
import { columns } from "./coulums";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function Products() {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");
  const listings = await db.query.products.findMany({
    with: {
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  if (!listings) throw new Error("No listings found");

  const dataTable = listings.map((listing) => {
    if (listing.productVariants.length === 0) {
      return {
        id: listing.id,
        title: listing.title,
        price: listing.price,
        image: placeholder.src,
        variants: [],
      };
    }
    const image = listing.productVariants[0].variantImages[0].url;
    return {
      id: listing.id,
      title: listing.title,
      price: listing.price,
      variants: listing.productVariants,
      image,
    };
  });
  if (!dataTable) throw new Error("No data found");
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <DataTable columns={columns} data={dataTable} />
      </div>
    </Suspense>
  );
}
