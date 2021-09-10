Tool to automate assignment of articles, manage summaries, provide an API for content and sharing them on [@scribeDAO](https://twitter.com/scribeDAO). If you have any questions or want to help out join us on Discord [#automation](https://discord.com/invite/ySFKTEyGn8)

## Getting Started

Want to help out? Let's setup this project!

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) `<=14.x`
- [yarn](https://yarnpkg.com)

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

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Deploying to Production

We use [Vercel](https://vercel.com/) to deploy this project to production. We have GitHub Actions to deploy to production.
For database Vercel will connect to MySQL instance running in [planetscale](https://planetscale.com)
