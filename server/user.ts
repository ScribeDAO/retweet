import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay'
import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLURL,
} from 'graphql-scalars'
import { MetaNodeInterface, NodeInterface, TypeNames } from './shared'
import { RoleConnection } from './role'
import { GraphQLContext } from './context'
import { PostConnection } from './post'

/**
 * ```graphql
 * type User implements Node, MetaNode {
 *   id: ID!
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 *   name: String!
 *   email: EmailAddress!
 *   image: URL!
 *   emailVerified: DateTime
 *   roles(after: String, first: Int, before: String, last: Int): RoleConnection
 *   posts(after: String, first: Int, before: String, last: Int): PostConnection
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
    email: { type: GraphQLNonNull(GraphQLEmailAddress) },
    emailVerified: { type: GraphQLDateTime },
    image: { type: GraphQLNonNull(GraphQLURL) },
    roles: {
      args: connectionArgs,
      type: RoleConnection,
      resolve: async (user, args, { prisma }) => {
        const roles = await prisma.user
          .findUnique({ where: { id: user.id } })
          .roles()

        return connectionFromArray(roles, args)
      },
    },
    posts: {
      args: connectionArgs,
      type: PostConnection,
      resolve: async (user, args, { prisma }) => {
        const posts = await prisma.user
          .findUnique({ where: { id: user.id } })
          .posts()

        return connectionFromArray(posts, args)
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
