"use server";
import { ProductSchema } from "@/types/product-schema";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { products } from "../schema";
import { db } from "..";
import { revalidatePath } from "next/cache";
const action = createSafeActionClient();
export const createProduct = action(
  ProductSchema,
  async ({ description, price, title, id }) => {
    try {
      //edit mode
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!currentProduct) return { error: "products not found" };

        const editedProduct = await db
          .update(products)
          .set({
            description,
            price,
            title,
          })
          .where(eq(products.id, id))
          .returning();
        revalidatePath("/dashboard/products");
        return {
          success: `Product ${editedProduct[0].title} has been updated`,
        };
      }
      if (!id) {
        const newProduct = await db
          .insert(products)
          .values({
            description,
            price,
            title,
          })
          .returning();
        revalidatePath("/dashboard/products");

        return {
          success: `Product ${newProduct[0].title} has been created`,
        };
      }
    } catch (error) {
      console.error("Error creating product:", error);
      return { error: "Failed to create product" };
    }
  }
);
