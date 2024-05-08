import { prisma } from '@infra/database/prisma'
import { type Example } from '@prisma/client'

interface ListExamplesResponse {
  examples: Example[]
}

export class ListExamples {
  public async execute(): Promise<ListExamplesResponse> {
    const examples = await prisma.example.findMany()

    return { examples }
  }
}
