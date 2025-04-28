"use server";
import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { twoFactorTokens, users } from "../schema";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./tokens/tokens";
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from "./email";

const action = createSafeActionClient();
//password
export const emailSignIn = action(LoginSchema, async ({ email, code }) => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Email not found" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );
      return { success: "Confirmation Email Sent!" };
    }

    if (existingUser.twofactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken) {
          return { error: "Invalid Token" };
        }
        if (twoFactorToken.token !== code) {
          return { error: "Invalid Token" };
        }
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) {
          return { error: "Token has expired" };
        }

        await db
          .delete(twoFactorTokens)
          .where(eq(twoFactorTokens.id, twoFactorToken.id));
      } else {
        const token = await generateTwoFactorToken(existingUser.email);

        if (!token) {
          return { error: "Token not generated!" };
        }

        await sendTwoFactorTokenByEmail(token[0].email, token[0].token);
        return { twoFactor: "Two Factor Token Sent!" };
      }
    }

    // ✅ Return verified so the client can call signIn
    return {
      success: "Credentials Validated",
      verified: true,
    };
  } catch (error) {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Email or Password Incorrect" };
        case "AccessDenied":
          return { error: "Access Denied" };
        case "OAuthSignInError":
          return { error: "OAuth Sign In Error" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
});
