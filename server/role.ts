import { Roles, User } from '.prisma/client'
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
import { UserConnection } from './user'

/**
 * ```graphql
 * type Role implements Node, MetaNode {
 *   id: ID!
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 *   name: String!
 *   discordId: String!
 *   users(after: String, first: Int, before: String, last: Int): UserConnection
 * }
 * ```
 */
export const RoleType = new GraphQLObjectType<any, GraphQLContext>({
  name: TypeNames.Role,
  interfaces: [NodeInterface, MetaNodeInterface],
  fields: () => ({
    id: globalIdField(),
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLNonNull(GraphQLDateTime) },
    name: { type: GraphQLNonNull(GraphQLString) },
    discordId: { type: GraphQLNonNull(GraphQLString) },
    users: {
      args: connectionArgs,
      type: UserConnection,
      resolve: async (role, args, { prisma }) => {
        const userIds = role.users.map((user: User) => user.id)
        const users = await prisma.user.findMany({
          where: { id: { in: userIds } },
        })

        return connectionFromArray(users, args)
      },
    },
  }),
})

const { connectionType } = connectionDefinitions({
  nodeType: RoleType,
})
/**
 * ```graphql
 * type RoleEdge {
 *  cursor: String!
 *  node: Post
 * }
 *
 * type RoleConnection {
 *  edges: [RoleEdge]
 *  pageInfo: PageInfo!
 * }
 * ```
 */
export const RoleConnection = connectionType
