import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { GraphQLJSONObject } from 'graphql-scalars'
import { GraphQLContext } from './context'
import { TypeNames } from './shared'

/**
 * ```graphql
 * type Stats {
 *   posts: Int!
 *   tags: GraphQLJSONObject!
 *   roles: GraphQLJSONObject!
 * }
 * ```
 */
export const StatsType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Stats,
  fields: () => ({
    posts: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Number of posts',
      resolve: (_, __, { prisma }) => {
        return prisma.post.count()
      },
    },
    tags: {
      type: GraphQLNonNull(GraphQLJSONObject),
      description: 'Count for different categories',
      resolve: async (_, __, { prisma }) => {
        const tags = await prisma.tag.findMany({
          select: { name: true, _count: true },
        })

        const normalizedTags = tags.reduce(
          (acc: Record<string, any>, tag: typeof tags[0]) => {
            acc[tag.name] = tag._count
            return acc
          },
          {},
        )

        return normalizedTags
      },
    },
    roles: {
      type: GraphQLNonNull(GraphQLJSONObject),
      description: 'Count for different roles',
      resolve: async (_, __, { prisma }) => {
        const roles = await prisma.roles.findMany({
          select: { name: true, _count: true },
        })

        const normalizedRoles = roles.reduce(
          (acc: Record<string, any>, tag: typeof roles[0]) => {
            acc[tag.name] = tag._count?.users
            return acc
          },
          {},
        )

        return normalizedRoles
      },
    },
  }),
})
