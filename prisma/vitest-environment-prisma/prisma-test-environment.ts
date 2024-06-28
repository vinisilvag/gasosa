import 'dotenv/config'
import { execSync } from 'node:child_process'
import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL
    process.env.NODE_ENV = 'test'

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        await prisma.$disconnect()
      }
    }
  }
} as unknown as Environment
