import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

// Crea el cliente conectado al archivo SQLite indicado en DATABASE_URL (.env)
function createPrismaClient() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" })
    return new PrismaClient({ adapter })
}

// En desarrollo, Next recarga los archivos al guardar. Guardamos el cliente en
// globalThis para reutilizarlo y no abrir una conexión nueva en cada recarga.
const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}
