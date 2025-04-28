"use server";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
export async function getProduct(id: number) {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return { success: product };
  } catch (error) {
    console.error("Error getting product:", error);
    return { error: "Failed to get product" };
  }
}
