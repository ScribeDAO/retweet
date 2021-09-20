import { Tag } from '.prisma/client'
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay'
import { GraphQLDateTime } from 'graphql-scalars'
import { GraphQLContext } from './context'
import { MetaNodeInterface, NodeInterface, TypeNames } from './shared'
import { TagConnection } from './tag'
import { UserType } from './user'

/**
 * ```graphql
 * type Post implements Node, MetaNode {
 *   id: ID!
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 *   tweetId: String!
 *   author: User!
 *   tags(after: String, first: Int, before: String, last: Int): TagConnection
 * }
 * ```
 */
export const PostType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Post,
  interfaces: [NodeInterface, MetaNodeInterface],
  fields: () => ({
    id: globalIdField(),
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLNonNull(GraphQLDateTime) },
    tweetId: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(UserType) },
    tags: {
      args: connectionArgs,
      type: TagConnection,
      resolve: async (post, args, { prisma }) => {
        const tagIds = post.tags.map((tag: Tag) => tag.id)
        const posts = await prisma.tag.findMany({
          where: { id: { in: tagIds } },
          include: { posts: { select: { id: true } } },
        })

        return connectionFromArray(posts, args)
      },
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: PostType,
})
/**
 * ```graphql
 * type PostEdge {
 *  cursor: String!
 *  node: Post
 * }
 *
 * type PostConnection {
 *  edges: [PostEdge]
 *  pageInfo: PageInfo!
 * }
 * ```
 */
export const PostConnection = connectionType
