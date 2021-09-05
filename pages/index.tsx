import { Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import SummaryForm from '../components/SubmitSummary'

const Home = () => {
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
