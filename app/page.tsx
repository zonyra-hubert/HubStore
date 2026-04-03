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
      <main>
        <section
          className="mb-8 rounded-xl border p-6 md:p-10 text-foreground"
          style={{
            backgroundImage: "url('/lll.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-xs uppercase tracking-wider text-secondary-foreground font-semibold">
            Find Your Next Stay
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-bold max-w-2xl">
            Browse verified hostels and rental homes near your school or work.
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">
            Compare rent, room types, and amenities, then contact hosts to book
            a visit.
          </p>
        </section>
        <Algolia />
        <ProductTags />
        <Products variants={data} />
      </main>
    </Suspense>
  );
}
