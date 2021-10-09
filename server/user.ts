import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay'
import { GraphQLDateTime, GraphQLURL } from 'graphql-scalars'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { MetaNodeInterface, NodeInterface, TypeNames } from './shared'
import { RoleConnection } from './role'
import { GraphQLContext } from './context'
import { PostConnection } from './post'
import { TagConnection } from './tag'

/**
 * ```graphql
 * type User implements Node, MetaNode {
 *   id: ID!
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 *   name: String!
 *   image: URL!
 *   roles(after: String, first: Int, before: String, last: Int): RoleConnection
 *   posts(after: String, first: Int, before: String, last: Int): PostConnection
 *   interestedTags(after: String, first: Int, before: String, last: Int): TagConnection
 * }
 * ```
 */
export const UserType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.User,
  interfaces: [NodeInterface, MetaNodeInterface],
  fields: () => ({
    id: globalIdField(),
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLNonNull(GraphQLDateTime) },
    name: { type: GraphQLNonNull(GraphQLString) },
    // Do not add because of privacy reasons
    // email: { type: GraphQLNonNull(GraphQLEmailAddress) },
    // emailVerified: { type: GraphQLDateTime },
    image: { type: GraphQLNonNull(GraphQLURL) },
    roles: {
      args: connectionArgs,
      type: RoleConnection,
      resolve: async (user, args, { prisma }) => {
        const roles = await findManyCursorConnection(
          (args) =>
            prisma.user.findFirst({ ...args, where: { id: user.id } }).roles(),
          () => prisma.roles.count(),
          args,
        )

        return roles
      },
    },
    posts: {
      args: connectionArgs,
      type: PostConnection,
      resolve: async (user, args, { prisma }) => {
        const posts = await findManyCursorConnection(
          (args) =>
            prisma.user.findFirst({ ...args, where: { id: user.id } }).posts(),
          () => prisma.post.count(),
          args,
        )

        return posts
      },
    },
    interestedTags: {
      args: connectionArgs,
      type: TagConnection,
      resolve: async (user, args, { prisma }) => {
        const tags = await findManyCursorConnection(
          (args) =>
            prisma.user
              .findFirst({ ...args, where: { id: user.id } })
              .interestedTags(),
          () => prisma.tag.count(),
          args,
        )

        return tags
      },
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: UserType,
})
/**
 * ```graphql
 * type UserEdge {
 *  cursor: String!
 *  node: Post
 * }
 *
 * type UserConnection {
 *  edges: [UserEdge]
 *  pageInfo: PageInfo!
 * }
 * ```
 */
export const UserConnection = connectionType
