import client from '../lib/db'
import { ServerRoleIds } from '../lib/consts'

const main = async () => {
  await client.roles.createMany({
    data: [
      { name: 'Scribe', discordId: ServerRoleIds['SCRIBE'] },
      {
        name: 'Knowledge Seekers',
        discordId: ServerRoleIds['KNOWLEDGE_SEEKER'],
      },
      { name: 'DAOists', discordId: ServerRoleIds['DAOIST'] },
    ],
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await client.$disconnect())
