import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay'
import { GraphQLDateTime } from 'graphql-scalars'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { GraphQLContext } from './context'
import { PostConnection } from './post'
import { MetaNodeInterface, NodeInterface, TypeNames } from './shared'

/**
 * ```graphql
 * type Tag implements Node, MetaNode {
 *   id: ID!
 *   name: String!
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 *   posts(after: String, first: Int, before: String, last: Int): PostConnection
 * }
 * ```
 */
export const TagType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Tag,
  interfaces: [NodeInterface, MetaNodeInterface],
  fields: () => ({
    id: globalIdField(),
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLNonNull(GraphQLDateTime) },
    name: { type: GraphQLNonNull(GraphQLString) },
    posts: {
      args: connectionArgs,
      type: PostConnection,
      resolve: async (tag, args, { prisma }) => {
        const posts = await findManyCursorConnection(
          (args) =>
            prisma.tag.findFirst({ ...args, where: { id: tag.id } }).posts(),
          () => prisma.post.count(),
          args,
        )

        return posts
      },
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: TagType,
})
/**
 * ```graphql
 * type TagEdge {
 *  cursor: String!
 *  node: Post
 * }
 *
 * type TagConnection {
 *  edges: [TagEdge]
 *  pageInfo: PageInfo!
 * }
 * ```
 */
export const TagConnection = connectionType
