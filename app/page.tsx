import LoadingSpinner from "@/components/Loading";
import Algolia from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import Products from "@/components/products/products";
import { db } from "@/server";
import { Suspense } from "react";

// export const revalidate = 360;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="">
        <Algolia />
        <ProductTags />
        <Products variants={data} />
      </main>
    </Suspense>
  );
}
