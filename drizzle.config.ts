import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./server/schema.ts",
  out: "./server/migrations",
  // driver: "pg", // Change "pg" to "pglite"
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} as Config;
