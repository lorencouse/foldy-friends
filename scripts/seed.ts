// Inserts the starter catalogue into an empty shop. Does nothing once products exist,
// so products an admin deleted are not brought back on the next deploy.
import { readFile } from "node:fs/promises";
import postgres from "postgres";

type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  sale?: number;
  stock: number;
  art: string;
  options?: string[];
  summary: string;
  description: string;
};

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const products: SeedProduct[] = JSON.parse(
  await readFile(new URL("../data/products.json", import.meta.url), "utf8"),
);

const sql = postgres(url, { max: 1 });
const [{ n }] = await sql`select count(*)::int as n from products`;
if (n > 0) {
  console.log(`seed skipped: ${n} products already exist`);
  await sql.end();
  process.exit(0);
}
let inserted = 0;
for (const p of products) {
  const rows = await sql`
    insert into products (slug, name, summary, description, category, tags, price_cents, sale_price_cents, stock, art, options)
    values (${p.slug}, ${p.name}, ${p.summary}, ${p.description}, ${p.category}, ${p.tags},
            ${p.price}, ${p.sale ?? null}, ${p.stock}, ${p.art}, ${p.options ?? []})
    on conflict (slug) do nothing
    returning id`;
  inserted += rows.length;
}
await sql.end();
console.log(`seeded ${inserted} new products (${products.length} in catalogue)`);
