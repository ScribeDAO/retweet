import { GraphQLInterfaceType, GraphQLNonNull } from 'graphql'
import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { GraphQLDateTime } from 'graphql-scalars'
import { GraphQLContext } from './context'

export enum TypeNames {
  Query = 'Query',
  Mutation = 'Mutation',
  User = 'User',
  Post = 'Post',
  Tag = 'Tag',
  Role = 'Role',
  Stats = 'Stats',
}

const { nodeInterface } = nodeDefinitions<GraphQLContext>(
  (globalId, context) => {
    const { id, type } = fromGlobalId(globalId)
    switch (type) {
      case TypeNames.Post:
        return context.prisma.post.findUnique({ where: { id } })
      case TypeNames.User:
        return context.prisma.user.findUnique({ where: { id } })
      case TypeNames.Tag:
        return context.prisma.tag.findUnique({ where: { id } })
      default:
        return null
    }
  },
)
/**
 * ```graphql
 * interface Node {
 *   """
 *   The ID of an object
 *   """
 *   id: ID!
 * }
 * ```
 */
export const NodeInterface = nodeInterface

/**
 * ```graphql
 * interface MetaNode {
 *   createdAt: DateTime!
 *   updatedAt: DateTime!
 * }
 * ```
 */
export const MetaNodeInterface = new GraphQLInterfaceType({
  name: 'MetaNode',
  fields: () => ({
    createdAt: { type: GraphQLNonNull(GraphQLDateTime) },
    updatedAt: { type: GraphQLNonNull(GraphQLDateTime) },
  }),
})
