Tool to automate assignment of articles, manage summaries, provide an API for content and sharing them on [@scribeDAO](https://twitter.com/scribeDAO). If you have any questions or want to help out join us on Discord [#automation](https://discord.com/invite/ySFKTEyGn8)

## Getting Started

Want to help out? Let's setup this project!

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) `<=14.x`
- [yarn](https://yarnpkg.com)
- [pscale](https://planetscale.com/cli)

#### Recommended

- [Visual Studio Code](https://code.visualstudio.com)
- [docker](https://www.docker.com)
  - [`docker-compose`](https://docs.docker.com/compose/install/)
- [GitHub CLI](https://cli.github.com)

### Running this project

1. Clone the repository
2. Run `yarn` to install dependencies
3. Copy `.env.local.example` to `.env` and fill in the values
4. You will need a MySQL database. You can:
   1. Install MySQL locally OR
   2. Run it in a docker container. There is a `db/docker-compose.yml`. You can run `cd db && docker-compose pull` to install and then `yarn start:db` to start the server. OR
   3. Use a remote database service like [planetscale](https://planetscale.com)
5. You need to also fill in the `.env` file Discord Credentials. You can get those from the ScribeDAO App on [Discord Developer Portal](https://discord.com/developers/applications/885344846024437791/oauth2)
6. Run `yarn dev` to start the server and open the browser. Happy coding!

### Design and Architecture

- For Database we use MySQL (that is what planetscale offers currently).
- Prisma v2 ORM is used.
  - You can find database schema in [`prisma/schema.prisma`](./prisma/schema.prisma). There is a DBML version in [`prisma/dbml/schema.dbml`](./prisma/dbml/schema.dbml) also generated which you can use to visualize the schema in [DB Diagram](https://dbdiagram.io/)/

#### Login Flow

- User logs in with discord
- We use our Bot to check if the users is in our server
- Then we check if the user has Knowledge Seeker or above role, if so they are logged in.
- When user account is created and linked in DB we grab user's roles from Discord and link them to user in DB.
  - Flaws: If user's role is updated we can't automatically update in DB. Read more in this issue [#5](https://github.com/ScribeDAO/retweet/issues/5)

### Deploying to Production

We use [Vercel](https://vercel.com/) to deploy this project to production. We have GitHub Actions to deploy to production.
For database Vercel will connect to MySQL instance running in [planetscale](https://planetscale.com)

#### Applying DB migrations

We use [`prisma migrate`](https://prisma.io/docs/reference/cli/migrate/) to apply migrations. Please do not apply migrations in production.

- Login to PlanetScale `pscale login`
- Create 2 branches from `main` one feature branch and other `shadow`
  - `pscale branch create scribedao-prod <FEATURE_NAME>`
  - `pscale branch create scribedao-prod shadow`
- Now connect to the branches so you can connect to DB locally.
  - `pscale connect scribedao-prod <FEATURE_NAME> --port 3309`
  - `pscale connect scribedao-prod shadow --port 3310`
- Now get that status of last applied migration
  - `yarn prisma migrate status`
- Set baseline to that migration
  - `yarn prisma migrate resolve --applied <SEE_TERMINAL_OUTPUT_FROM_LAST_STEP>`
- Now apply new migrations
  - `yarn prisma migrate deploy`
- Create a Deploy request (kinda like a PR but for DB)
  - `pscale deploy-request create scribedao-prod <FEATURE_NAME>`
- Now just need to merge your code on GitHub and apply those DB changes and we are done!

#### Applying seed data or making changes using prisma studio

**WARNING**: You will be connecting and updating prod database

- Create a `shadow` branch from `main`
  - `pscale branch create scribedao-prod shadow`
- Now connect to the branches so you can connect to DB locally.
  - `pscale connect scribedao-prod main --port 3309`
  - `pscale connect scribedao-prod shadow --port 3310`
- `yarn prisma db seed`
- You can view your change in prisma studio
  - `yarn prisma studio`

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://docs.prisma.io)
- [NextAuth.js `v3`](https://next-auth.js.org/v3/getting-started/introduction)
- [PlanetScale applying prisma migrations](https://docs.planetscale.com/tutorials/automatic-prisma-migrations)
