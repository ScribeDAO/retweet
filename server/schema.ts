import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'
import {
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from 'graphql-relay'
import { PostConnection, PostType } from './post'
import { TagConnection, TagType } from './tag'
import { TypeNames } from './shared'
import { GraphQLContext } from './context'

/**
 * ```graphql
 * type Query {
 *   posts(after: String, first: Int, before: String, last: Int): PostConnection
 *   post(id: ID!): Post
 *   tags(after: String, first: Int, before: String, last: Int): TagConnection
 *   tag(id: ID!): Tag
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
        const posts = await prisma.post.findMany()
        return connectionFromArray(posts, args)
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
        const tags = await prisma.tag.findMany()
        return connectionFromArray(tags, args)
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
  }),
})

export const schema = new GraphQLSchema({ query: QueryType })
