// https://discord.com/developers/docs/resources/user#get-current-user-guilds
export type CurrentUserGuilds = {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  features: string[]
  permissions_new: string
}

// https://discord.com/developers/docs/resources/user#user-object
export type User = {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  bot: boolean | null
  system: boolean | null
  mfa_enabled: boolean | null
  locale: string | null
  verified: boolean | null
  email: string | null
  flags: number | null
  premium_type: number | null
  public_flags: number | null
  accent_color: number | null
}

// https://discord.com/developers/docs/resources/guild#guild-member-object
export type GuildMember = {
  user: User
  nick: string | null
  roles: string[]
  joined_at: string // ISO8601 timestamp
  premium_since: string | null // ISO8601 timestamp
  deaf: boolean
  mute: boolean
  pending: boolean
  permissions: boolean
}
