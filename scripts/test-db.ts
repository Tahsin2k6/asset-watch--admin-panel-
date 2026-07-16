// scripts/test-db.ts
import { prisma } from "../lib/db"

async function main() {
  const count = await prisma.user.count()
  console.log("Connected. User count:", count)
}

main()
  .catch((e) => console.error("DB test failed:", e))
  .finally(() => prisma.$disconnect())