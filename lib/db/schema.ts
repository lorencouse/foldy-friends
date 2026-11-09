import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import type { Category } from "../categories";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const products = pgTable(
  "products",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull().unique(),
    name: text().notNull(),
    summary: text().notNull().default(""),
    description: text().notNull().default(""),
    category: text().$type<Category>().notNull(),
    tags: text().array().notNull().default(sql`'{}'::text[]`),
    /** Prices are stored in cents. */
    priceCents: integer().notNull(),
    salePriceCents: integer(),
    stock: integer().notNull().default(0),
    sku: text(),
    /** Key of the drawn illustration used until a photo is uploaded. */
    art: text().notNull(),
    /** Colour options a buyer can pick, e.g. paper colours. */
    options: text().array().notNull().default(sql`'{}'::text[]`),
    /** Uploaded photo filenames, served from /media. */
    images: text().array().notNull().default(sql`'{}'::text[]`),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("products_category_idx").on(t.category),
    check("products_price_positive", sql`${t.priceCents} > 0`),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid()
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    rating: smallint().notNull(),
    title: text().notNull(),
    body: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("reviews_product_user_idx").on(t.productId, t.userId),
    check("reviews_rating_range", sql`${t.rating} between 1 and 5`),
  ],
);

export type Address = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export const orders = pgTable(
  "orders",
  {
    id: uuid().primaryKey().defaultRandom(),
    /** Short, human-friendly reference shown to the buyer. */
    reference: text().notNull().unique(),
    userId: text().references(() => user.id, { onDelete: "set null" }),
    email: text().notNull(),
    shipping: jsonb().$type<Address>().notNull(),
    subtotalCents: integer().notNull(),
    shippingCents: integer().notNull(),
    totalCents: integer().notNull(),
    /** "demo" until real payments are wired in. */
    status: text().notNull().default("demo"),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("orders_user_idx").on(t.userId)],
);

export const orderItems = pgTable("order_items", {
  id: uuid().primaryKey().defaultRandom(),
  orderId: uuid()
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid().references(() => products.id, { onDelete: "set null" }),
  name: text().notNull(),
  option: text(),
  unitPriceCents: integer().notNull(),
  quantity: integer().notNull(),
});

export const productRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  author: one(user, { fields: [reviews.userId], references: [user.id] }),
}));

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));
