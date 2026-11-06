// Grants the admin role to an existing account: node scripts/make-admin.ts someone@example.com
// Admin is never granted at sign-up, because sign-up does not prove the person owns the email.
import postgres from "postgres";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error("usage: make-admin <email>");
  process.exit(1);
}
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const sql = postgres(url, { max: 1 });
const rows = await sql`update "user" set role = 'admin' where lower(email) = ${email} returning email`;
await sql.end();
if (rows.length === 0) {
  console.error(`no account for ${email}; sign up first`);
  process.exit(1);
}
console.log(`${email} is now an admin`);
