import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const shares = sqliteTable("shares", {
  id: integer("id").primaryKey(),
  title: text("title"),
  status: text("status", { enum: ["active", "inactive"] }).default("active"),
  createdAt: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});