import client from '../lib/db'
import { createObjectCsvWriter } from 'csv-writer'

const main = async () => {
  const csvWriter = createObjectCsvWriter({
    path: 'out.csv',
    header: [
      { id: 'name', title: 'Discord Handle' },
      { id: 'interests', title: 'Interests' },
    ],
  })
  const users = await client.user.findMany({
    include: { interestedTags: true },
  })

  const normalized = users.map((user) => {
    return {
      name: user.name,
      interests: user.interestedTags.map((tag) => tag.name),
    }
  })
  csvWriter.writeRecords(normalized).then(() => console.log('done'))
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await client.$disconnect())
