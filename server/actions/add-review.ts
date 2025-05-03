"use server";

import { reviewSchema } from "@/types/reviews-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { reviews } from "../schema";
import { and, eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";

const action = createSafeActionClient();
export const addReview = action(
  reviewSchema,
  async ({ productID, rating, comment }) => {
    try {
      const session = await auth();
      if (!session) {
        return { error: "Please sign in" };
      }
      const reviewExists = await db.query.reviews.findFirst({
        where: and(
          eq(reviews.productID, productID),
          eq(reviews.userID, session.user.id)
        ),
      });
      if (reviewExists) return { error: "You already reviewed this product" };
      const newReview = await db
        .insert(reviews)
        .values({
          productID,
          rating,
          comment,
          userID: session.user.id,
        })
        .returning();
      revalidatePath(`/products/${productID}`);
      return { success: newReview[0] };
    } catch (error) {
      console.log(error);
      return { error: JSON.stringify(error) };
    }
  }
);
