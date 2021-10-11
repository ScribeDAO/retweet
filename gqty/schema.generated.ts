/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { SchemaUnionsKey } from 'gqty'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
}

export const scalarsEnumsHash: import('gqty').ScalarsEnumsHash = {
  Boolean: true,
  String: true,
  ID: true,
  DateTime: true,
  URL: true,
  Int: true,
}
export const generatedSchema = {
  query: {
    __typename: { __type: 'String!' },
    posts: {
      __type: 'PostConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
    post: { __type: 'Post', __args: { id: 'ID!' } },
    tags: {
      __type: 'TagConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
    tag: { __type: 'Tag', __args: { id: 'ID!' } },
    users: {
      __type: 'UserConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
    me: { __type: 'User' },
  },
  mutation: {
    __typename: { __type: 'String!' },
    updateUserCategories: { __type: 'User', __args: { categories: '[ID]!' } },
  },
  subscription: {},
  PostConnection: {
    __typename: { __type: 'String!' },
    pageInfo: { __type: 'PageInfo!' },
    edges: { __type: '[PostEdge]' },
  },
  PageInfo: {
    __typename: { __type: 'String!' },
    hasNextPage: { __type: 'Boolean!' },
    hasPreviousPage: { __type: 'Boolean!' },
    startCursor: { __type: 'String' },
    endCursor: { __type: 'String' },
  },
  PostEdge: {
    __typename: { __type: 'String!' },
    node: { __type: 'Post' },
    cursor: { __type: 'String!' },
  },
  Post: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    createdAt: { __type: 'DateTime!' },
    updatedAt: { __type: 'DateTime!' },
    tweetId: { __type: 'String!' },
    author: { __type: 'User!' },
    tags: {
      __type: 'TagConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
  },
  Node: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    $on: { __type: '$Node!' },
  },
  MetaNode: {
    __typename: { __type: 'String!' },
    createdAt: { __type: 'DateTime!' },
    updatedAt: { __type: 'DateTime!' },
    $on: { __type: '$MetaNode!' },
  },
  User: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    createdAt: { __type: 'DateTime!' },
    updatedAt: { __type: 'DateTime!' },
    name: { __type: 'String!' },
    image: { __type: 'URL!' },
    roles: {
      __type: 'RoleConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
    posts: {
      __type: 'PostConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
    interestedTags: {
      __type: 'TagConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
  },
  RoleConnection: {
    __typename: { __type: 'String!' },
    pageInfo: { __type: 'PageInfo!' },
    edges: { __type: '[RoleEdge]' },
  },
  RoleEdge: {
    __typename: { __type: 'String!' },
    node: { __type: 'Role' },
    cursor: { __type: 'String!' },
  },
  Role: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    createdAt: { __type: 'DateTime!' },
    updatedAt: { __type: 'DateTime!' },
    name: { __type: 'String!' },
    discordId: { __type: 'String!' },
    users: {
      __type: 'UserConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
  },
  UserConnection: {
    __typename: { __type: 'String!' },
    pageInfo: { __type: 'PageInfo!' },
    edges: { __type: '[UserEdge]' },
  },
  UserEdge: {
    __typename: { __type: 'String!' },
    node: { __type: 'User' },
    cursor: { __type: 'String!' },
  },
  TagConnection: {
    __typename: { __type: 'String!' },
    pageInfo: { __type: 'PageInfo!' },
    edges: { __type: '[TagEdge]' },
  },
  TagEdge: {
    __typename: { __type: 'String!' },
    node: { __type: 'Tag' },
    cursor: { __type: 'String!' },
  },
  Tag: {
    __typename: { __type: 'String!' },
    id: { __type: 'ID!' },
    createdAt: { __type: 'DateTime!' },
    updatedAt: { __type: 'DateTime!' },
    name: { __type: 'String!' },
    posts: {
      __type: 'PostConnection',
      __args: { after: 'String', first: 'Int', before: 'String', last: 'Int' },
    },
  },
  [SchemaUnionsKey]: {
    Node: ['Post', 'User', 'Role', 'Tag'],
    MetaNode: ['Post', 'User', 'Role', 'Tag'],
  },
} as const

export interface Query {
  __typename?: 'Query'
  posts: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<PostConnection>
  post: (args: { id: Scalars['ID'] }) => Maybe<Post>
  tags: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<TagConnection>
  tag: (args: { id: Scalars['ID'] }) => Maybe<Tag>
  users: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<UserConnection>
  me?: Maybe<User>
}

export interface Mutation {
  __typename?: 'Mutation'
  /**
   * Update categories user is interested in.
   */
  updateUserCategories: (args: {
    categories: Array<Maybe<Scalars['ID']>>
  }) => Maybe<User>
}

export interface Subscription {
  __typename?: 'Subscription'
}

/**
 * A connection to a list of items.
 */
export interface PostConnection {
  __typename?: 'PostConnection'
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<PostEdge>>>
}

/**
 * Information about pagination in a connection.
 */
export interface PageInfo {
  __typename?: 'PageInfo'
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums['Boolean']
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums['Boolean']
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums['String']>
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums['String']>
}

/**
 * An edge in a connection.
 */
export interface PostEdge {
  __typename?: 'PostEdge'
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums['String']
}

export interface Post {
  __typename?: 'Post'
  /**
   * The ID of an object
   */
  id: ScalarsEnums['ID']
  createdAt: ScalarsEnums['DateTime']
  updatedAt: ScalarsEnums['DateTime']
  tweetId: ScalarsEnums['String']
  author: User
  tags: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<TagConnection>
}

/**
 * An object with an ID
 */
export interface Node {
  __typename?: 'Post' | 'User' | 'Role' | 'Tag'
  /**
   * The id of the object.
   */
  id: ScalarsEnums['ID']
  $on: $Node
}

export interface MetaNode {
  __typename?: 'Post' | 'User' | 'Role' | 'Tag'
  createdAt: ScalarsEnums['DateTime']
  updatedAt: ScalarsEnums['DateTime']
  $on: $MetaNode
}

export interface User {
  __typename?: 'User'
  /**
   * The ID of an object
   */
  id: ScalarsEnums['ID']
  createdAt: ScalarsEnums['DateTime']
  updatedAt: ScalarsEnums['DateTime']
  name: ScalarsEnums['String']
  image: ScalarsEnums['URL']
  roles: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<RoleConnection>
  posts: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<PostConnection>
  interestedTags: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<TagConnection>
}

/**
 * A connection to a list of items.
 */
export interface RoleConnection {
  __typename?: 'RoleConnection'
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<RoleEdge>>>
}

/**
 * An edge in a connection.
 */
export interface RoleEdge {
  __typename?: 'RoleEdge'
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Role>
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums['String']
}

export interface Role {
  __typename?: 'Role'
  /**
   * The ID of an object
   */
  id: ScalarsEnums['ID']
  createdAt: ScalarsEnums['DateTime']
  updatedAt: ScalarsEnums['DateTime']
  name: ScalarsEnums['String']
  discordId: ScalarsEnums['String']
  users: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<UserConnection>
}

/**
 * A connection to a list of items.
 */
export interface UserConnection {
  __typename?: 'UserConnection'
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<UserEdge>>>
}

/**
 * An edge in a connection.
 */
export interface UserEdge {
  __typename?: 'UserEdge'
  /**
   * The item at the end of the edge
   */
  node?: Maybe<User>
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums['String']
}

/**
 * A connection to a list of items.
 */
export interface TagConnection {
  __typename?: 'TagConnection'
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<TagEdge>>>
}

/**
 * An edge in a connection.
 */
export interface TagEdge {
  __typename?: 'TagEdge'
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Tag>
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums['String']
}

export interface Tag {
  __typename?: 'Tag'
  /**
   * The ID of an object
   */
  id: ScalarsEnums['ID']
  createdAt: ScalarsEnums['DateTime']
  updatedAt: ScalarsEnums['DateTime']
  name: ScalarsEnums['String']
  posts: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars['String']>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars['Int']>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars['String']>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars['Int']>
  }) => Maybe<PostConnection>
}

export interface SchemaObjectTypes {
  Query: Query
  Mutation: Mutation
  Subscription: Subscription
  PostConnection: PostConnection
  PageInfo: PageInfo
  PostEdge: PostEdge
  Post: Post
  User: User
  RoleConnection: RoleConnection
  RoleEdge: RoleEdge
  Role: Role
  UserConnection: UserConnection
  UserEdge: UserEdge
  TagConnection: TagConnection
  TagEdge: TagEdge
  Tag: Tag
}
export type SchemaObjectTypesNames =
  | 'Query'
  | 'Mutation'
  | 'Subscription'
  | 'PostConnection'
  | 'PageInfo'
  | 'PostEdge'
  | 'Post'
  | 'User'
  | 'RoleConnection'
  | 'RoleEdge'
  | 'Role'
  | 'UserConnection'
  | 'UserEdge'
  | 'TagConnection'
  | 'TagEdge'
  | 'Tag'

export interface $Node {
  Post?: Post
  User?: User
  Role?: Role
  Tag?: Tag
}

export interface $MetaNode {
  Post?: Post
  User?: User
  Role?: Role
  Tag?: Tag
}

export interface GeneratedSchema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined
}

export interface ScalarsEnums extends MakeNullable<Scalars> {}
