"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { products } from "../schema";
const action = createSafeActionClient();
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteProduct = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const data = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();
      revalidatePath("/dashboard/products");
      return { success: `Product ${data[0].title} has been deleted` };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { error: "Failed to delete product" };
    }
  }
);
