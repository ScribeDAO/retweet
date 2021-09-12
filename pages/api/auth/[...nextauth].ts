import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {
  SERVER_GUILD_ID,
  DISCORD_API_BASE,
  ServerRoleIds,
} from '../../../lib/consts'
import type { GuildMember } from '../../../lib/discordTypes'
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
  events: {
    async linkAccount(user) {
      // get the user's discord account
      const member = await fetch(
        `${DISCORD_API_BASE}guilds/${SERVER_GUILD_ID}/members/${user.providerAccount.id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_ACCESS_TOKEN}`,
          },
        },
      )
      // user will always exist since this is done after the user is created
      const discordUser = (await member.json()) as GuildMember

      // find users discord roles in our DB
      const roles = await prisma.roles.findMany({
        where: { discordId: { in: discordUser.roles } },
        select: { id: true },
      })

      // link users roles to our DB
      await prisma.user.update({
        where: { id: user.user.id as string },
        data: {
          roles: {
            connect: roles.map((r) => ({ id: r.id })),
          },
        },
      })
    },
  },
  callbacks: {
    async signIn(_, account) {
      const member = await fetch(
        `${DISCORD_API_BASE}guilds/${SERVER_GUILD_ID}/members/${account.id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_ACCESS_TOKEN}`,
          },
        },
      )

      // not in server
      if (member.status >= 400) return false

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
