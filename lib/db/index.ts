import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

// postgres() connects lazily on the first query, so building without a
// database works; a missing DATABASE_URL surfaces as a failed query at runtime.
function connect() {
  const url = process.env.DATABASE_URL;
  return url ? postgres(url, { max: 10 }) : postgres({ max: 10 });
}

const sql = globalForDb.sql ?? connect();
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle(sql, { schema, casing: "snake_case" });
export { schema };
