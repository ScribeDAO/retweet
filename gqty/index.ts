import { createReactClient } from '@gqty/react'
import { createClient, QueryFetcher } from 'gqty'
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated'

// explore how we can just proxy `/api/graphql` in SSR envs
export const API_ENDPOINT =
  typeof window !== 'undefined'
    ? '/api/graphql'
    : 'https://scribedao.graphcdn.app'

const queryFetcher: QueryFetcher = async function (query, variables) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  })

  const json = await response.json()

  return json
}

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
})

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('@gqty/logger').then(({ createLogger }) => {
    const logger = createLogger(client)
    logger.start()
  })
}

export const {
  query,
  mutation,
  mutate,
  subscription,
  resolved,
  refetch,
  track,
} = client

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
})

export * from './schema.generated'
