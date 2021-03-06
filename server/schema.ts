import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'
import { connectionArgs, fromGlobalId } from 'graphql-relay'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { PostConnection, PostType } from './post'
import { TagConnection, TagType } from './tag'
import { TypeNames } from './shared'
import { GraphQLContext } from './context'
import { UserConnection, UserType } from './user'
import { StatsType } from './stats'

/**
 * ```graphql
 * type Query {
 *   posts(after: String, first: Int, before: String, last: Int): PostConnection
 *   post(id: ID!): Post
 *   tags(after: String, first: Int, before: String, last: Int): TagConnection
 *   tag(id: ID!): Tag
 *   me: User
 * }
 * ```
 */
const QueryType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Query,
  fields: () => ({
    posts: {
      args: connectionArgs,
      type: PostConnection,
      resolve: async (_, args, { prisma }) => {
        const posts = await findManyCursorConnection(
          (args) => prisma.post.findMany({ ...args }),
          () => prisma.post.count(),
          args,
        )

        return posts
      },
    },
    post: {
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      type: PostType,
      resolve: async (_, { id }, { prisma }) => {
        const { id: postId } = fromGlobalId(id)
        return await prisma.post.findUnique({ where: { id: postId } })
      },
    },
    tags: {
      args: connectionArgs,
      type: TagConnection,
      resolve: async (_, args, { prisma }) => {
        const tags = await findManyCursorConnection(
          (args) => prisma.tag.findMany({ ...args }),
          () => prisma.tag.count(),
          args,
        )

        return tags
      },
    },
    tag: {
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      type: TagType,
      resolve: async (_, { id }, { prisma }) => {
        const { id: tagId } = fromGlobalId(id)
        return await prisma.tag.findUnique({ where: { id: tagId } })
      },
    },
    users: {
      args: connectionArgs,
      type: UserConnection,
      resolve: async (_, args, { prisma }) => {
        const users = await findManyCursorConnection(
          (args) => prisma.user.findMany({ ...args }),
          () => prisma.user.count(),
          args,
        )

        return users
      },
    },
    me: {
      type: UserType,
      resolve: async (_, __, { prisma, user }) => {
        if (!user) throw new Error('You are not logged in!')
        return user
      },
    },
    stats: {
      type: StatsType,
      // field resolvers resolve all values so not sure what to do here
      resolve: () => true,
    },
  }),
})

/**
 * ```graphql
 * type Mutation {
 *   updateUserCategories(categories: [ID]!): User
 * }
 * ```
 */
const MutationType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Mutation,
  fields: () => ({
    updateUserCategories: {
      type: UserType,
      description: 'Update categories user is interested in.',
      args: {
        categories: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
      },
      resolve: async (_, { categories }, { prisma, user }) => {
        if (!user) throw new Error('You must login to continue')
        const categoriesIds = categories.map((category: string) => {
          const { id } = fromGlobalId(category)
          return { id: id }
        })

        return await prisma.user.update({
          where: { id: user.id },
          data: {
            interestedTags: {
              set: categoriesIds,
            },
          },
        })
      },
    },
  }),
})

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
