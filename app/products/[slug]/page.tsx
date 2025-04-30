import ProductType from "@/components/products/product-type";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Separator } from "@/components/ui/separator";
import FormatPrice from "@/lib/format-price";
import ProductPick from "@/components/products/product-pick";

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  if (data) {
    const slugID = data.map((variant) => ({ slug: variant.id.toString() }));
    return slugID;
  }
  return [];
}
const Page = async ({ params }: { params: { slug: string } }) => {
  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, Number(params.slug)),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantImages: true,
              variantTags: true,
            },
          },
        },
      },
    },
  });
  if (variant) {
    return (
      <main>
        <div className="flex-1">
          <h1>Images</h1>
        </div>
        <div className="flex gap-2 flex-col flex-1">
          <h2 className="">{variant?.product.title}</h2>
          <div>
            <ProductType variants={variant.product.productVariants} />
          </div>
          <Separator />
          <p className="text-2xl font-mono">
            {FormatPrice(variant.product.price)}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: variant.product.description }}
          ></div>
          <p className="text-secondary-foreground">Available Colors</p>
          <div className="flex gap-4">
            {variant.product.productVariants.map((productVariant) => (
              <ProductPick
                key={productVariant.id}
                productID={productVariant.productID}
                id={productVariant.id}
                color={productVariant.color}
                productType={productVariant.productType}
                title={variant.product.title}
                price={variant.product.price}
                image={productVariant.variantImages[0].url}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
};

export default Page;
