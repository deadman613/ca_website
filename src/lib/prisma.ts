import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { isPrismaDatabaseConfigured } from "@/lib/prisma-config";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function getPrismaClient() {
  if (!isPrismaDatabaseConfigured()) {
    throw new Error(
      "Prisma is not configured. Set DATABASE_URL to the rotated, pooled PostgreSQL connection string in the local environment."
    );
  }

  globalForPrisma.prisma ??= new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });
  return globalForPrisma.prisma;
}
