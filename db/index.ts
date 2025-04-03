import { PrismaClient } from "@prisma/client";

// Check if there's already a global instance of Prisma
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// Create a new PrismaClient instance or reuse the existing one
const prisma: PrismaClient =
  global.prismaGlobal ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Optional: Enables logging
  });

// Set the global instance only in development mode
if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
