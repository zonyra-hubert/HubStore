"use server";

import { ResetSchema } from "@/types/reset-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { generatePasswordResetToken } from "./tokens/tokens";
import { users } from "@/server/schema";
import { sendPasswordResetEmail } from "./email";

const action = createSafeActionClient();

export const reset = action(ResetSchema, async ({ email }) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken) {
    return { error: "Something went wrong" };
  }
  await sendPasswordResetEmail(
    passwordResetToken[0].email,
    passwordResetToken[0].token
  );
  return { success: "Reset Email Sent" };
});
