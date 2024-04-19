import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

export function useDb() {
  const sqlite = new Database("sqlite.db");
  return drizzle(sqlite);
}
