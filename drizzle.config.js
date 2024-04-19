import type { Config } from "drizzle-kit";

export default {
  schema: "./server/database/schemas/**/*.js",
  out: "./server/database/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
