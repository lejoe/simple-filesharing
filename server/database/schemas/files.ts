import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { shares } from "./shares";

export const files = sqliteTable("files", {
  id: integer("id").primaryKey(),
  share_id: integer("share_id").references(() => shares.id),
  original_filename: text("original_filename"),
  new_filename: text("new_filename"),
  url: text("url").notNull().unique(),
  mimetype: text("mimetype"),
  size: integer("size"),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type FilesSelect = typeof files.$inferSelect;
export type FilesInsert = typeof files.$inferInsert;
