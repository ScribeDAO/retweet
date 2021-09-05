import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex, Heading, Link } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import DiscordButton from '../components/LoginWithDiscord'
import Navbar from '../components/Navbar'
import SummaryForm from '../components/SubmitSummary'
import ThemeButton from '../components/ThemeButton'
import { DISCORD_SERVER_INVITE } from '../lib/consts'

const Home = () => {
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
            You need Knowledge Seeker role in{' '}
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
        <SummaryForm />
      </Flex>
    </Flex>
  )
}

export default Home
