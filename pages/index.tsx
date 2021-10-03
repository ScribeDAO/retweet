import { GetStaticProps } from 'next'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex, Heading, Link } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { PropsWithServerCache } from '@gqty/react'
import DiscordButton from '../components/LoginWithDiscord'
import Navbar from '../components/Navbar'
import SummaryForm, { SummaryFormProps } from '../components/SubmitSummary'
import ThemeButton from '../components/ThemeButton'
import { DISCORD_SERVER_INVITE } from '../lib/consts'
import { useHydrateCache, prepareReactRender, query, resolved } from '../gqty'

type HomeProps = PropsWithServerCache<{ tags: SummaryFormProps['tags'] }>

const Home = ({ tags, cacheSnapshot }: HomeProps) => {
  useHydrateCache({ cacheSnapshot })
  const [session] = useSession()

  if (!session) {
    return (
      <Flex height="100vh" direction="column">
        <Flex justify="flex-end" marginX="1rem" marginTop="1rem">
          <ThemeButton />
        </Flex>
        <Flex
          marginTop="-1rem"
          margin="auto"
          direction="column"
          align="center"
          justify="center"
          w="100%"
        >
          <Heading size="md" mb={2}>
            You need have Scribe role in{' '}
            <Link href={DISCORD_SERVER_INVITE} isExternal>
              Discord <ExternalLinkIcon marginBottom="0.3rem" />{' '}
            </Link>
            to get started
          </Heading>
          <DiscordButton />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex height="100vh" direction="column">
      <Navbar />
      <Flex
        marginTop="-1rem"
        margin="auto"
        direction="column"
        align="center"
        justify="center"
        w="100%"
      >
        <SummaryForm tags={tags} />
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // get all the tags to choose from
  const tags = await resolved(
    () => query.tags()!.edges!.map(({ node: { id, name } }) => ({ id, name }))!,
  )

  const { cacheSnapshot } = await prepareReactRender(<Home tags={tags} />)

  return {
    props: {
      cacheSnapshot,
      tags,
    },
  }
}

export default Home
