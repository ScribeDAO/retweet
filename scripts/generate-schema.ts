import { schema } from '../server/schema'
import { printSchema } from 'graphql'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

writeFileSync(resolve(__dirname, '../schema.graphql'), printSchema(schema))
