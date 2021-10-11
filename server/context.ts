import { PrismaClient, User } from '@prisma/client'

export type GraphQLContext = {
  // Logged in user
  user: User | null
  prisma: PrismaClient
}
