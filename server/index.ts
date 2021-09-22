/* eslint-disable react-hooks/rules-of-hooks */
import { CreateApp } from '@graphql-ez/vercel'
import { ezSchema } from '@graphql-ez/plugin-schema'
import { ezGraphiQLIDE } from '@graphql-ez/plugin-graphiql'
import { useDepthLimit } from '@envelop/depth-limit'
import { schema } from './schema'
import prisma from '../lib/db'

const ezApp = CreateApp({
  cors: true,
  buildContext: () => {
    return {
      prisma,
    }
  },
  ez: {
    plugins: [ezSchema({ schema }), ezGraphiQLIDE()],
  },
  envelop: {
    plugins: [useDepthLimit({ maxDepth: 10 })],
  },
})

export default ezApp
