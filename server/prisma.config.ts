import "dotenv/config";
import { defineConfig } from "prisma/config";

// This helps us see what is happening during the 'npx prisma migrate' command
console.log(
  "🛠️  Prisma Config is using URL:",
  process.env.DIRECT_URL ? "URL detected from .env" : "❌ NO URL FOUND IN .env",
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
