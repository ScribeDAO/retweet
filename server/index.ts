/* eslint-disable react-hooks/rules-of-hooks */
import { CreateApp, BuildContextArgs } from '@graphql-ez/vercel'
import { ezSchema } from '@graphql-ez/plugin-schema'
import { ezGraphiQLIDE } from '@graphql-ez/plugin-graphiql'
import { useDepthLimit } from '@envelop/depth-limit'
import { useSentry } from '@envelop/sentry'
import { schema } from './schema'
import { getSession } from 'next-auth/client'
import prisma from '../lib/db'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://97933d06cca1473f881ae740eb6bd2f5@o1012894.ingest.sentry.io/5978462',
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
}

const ezApp = CreateApp({
  cors: true,
  buildContext: async (req) => {
    let user = null

    // Gets session info for current logged in user
    // https://next-auth.js.org/v3/getting-started/client#getsession
    const session = await getSession(req)
    // This will inject current user into context
    if (session?.accessToken) {
      user = await prisma.session
        .findFirst({
          where: { accessToken: session?.accessToken as string },
        })
        .user()
    }

    return {
      prisma,
      user,
    }
  },
  ez: {
    plugins: [ezSchema({ schema }), ezGraphiQLIDE()],
  },
  envelop: {
    plugins: [
      useDepthLimit({ maxDepth: 10 }),
      useSentry({
        includeResolverArgs: true,
        includeExecuteVariables: true,
        transactionName: (args) => {
          return (
            // Anonymous query is undefined so we use the name of field we are querying
            args.operationName ??
            args.contextValue.operation.selectionSet.selections[0].name.value
          )
        },
      }),
    ],
  },
})

export default ezApp
