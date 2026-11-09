import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  // Extra origins allowed to call the auth API, e.g. the bare domain next to www.
  trustedOrigins: (process.env.TRUSTED_ORIGINS ?? "").split(",").filter(Boolean),
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  // On by default in production; the end-to-end tests switch it off.
  rateLimit: { enabled: process.env.AUTH_RATE_LIMIT !== "off" },
  plugins: [admin(), nextCookies()],
});
