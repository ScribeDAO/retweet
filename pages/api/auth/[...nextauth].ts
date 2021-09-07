import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {
  SERVER_GUILD_ID,
  DISCORD_API_BASE,
  ServerRoleIds,
} from '../../../lib/consts'
import type { CurrentUserGuilds, GuildMember } from '../../../lib/discordTypes'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/db'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify email',
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    async signIn(_, account) {
      // Get all the servers user is in
      const guilds = await fetch(`${DISCORD_API_BASE}users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
      })
      const servers = (await guilds.json()) as CurrentUserGuilds[]

      const isDaoist =
        servers.filter(({ id }) => id === SERVER_GUILD_ID).length === 1

      if (!isDaoist) return false

      const member = await fetch(
        `${DISCORD_API_BASE}guilds/${SERVER_GUILD_ID}/members/${account.id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_ACCESS_TOKEN}`,
          },
        },
      )

      const user = (await member.json()) as GuildMember
      const roleExistence = user.roles.map((role) => {
        switch (role) {
          case ServerRoleIds.DAOIST:
          case ServerRoleIds.KNOWLEDGE_SEEKER:
            return true
          default:
            return false
        }
      })

      return roleExistence.includes(true)
    },
  },
})
