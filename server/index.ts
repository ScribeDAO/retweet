import { CreateApp } from '@graphql-ez/vercel'
import { ezSchema } from '@graphql-ez/plugin-schema'
import { ezGraphiQLIDE } from '@graphql-ez/plugin-graphiql'
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
})

export default ezApp
