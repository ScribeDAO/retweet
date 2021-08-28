import { MoonIcon, SunIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useRef } from 'react'
import {
  Button,
  Flex,
  Heading,
  useColorMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Link,
  chakra,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import Reward from 'react-rewards'

const SummaryForm = () => {
  const yay = useRef(null)
  const formik = useFormik({
    initialValues: {
      url: undefined,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
      yay.current.rewardMe()
    },
  })

  return (
    <chakra.form width="70%" onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel> Summary Link</FormLabel>
        <Flex>
          <Input
            type="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            id="url"
            required
          />
          <Reward ref={yay} type="confetti" config={{ spread: 60 }}>
            <Button type="submit" marginLeft="1rem">
              Submit
            </Button>
          </Reward>
        </Flex>
        <FormHelperText>
          Paste the link to your summary so we can retweet it{' '}
          <Link href="https://twitter.com/scribeDAO" isExternal>
            @ScribeDAO
            <ExternalLinkIcon marginBottom="0.2rem" mx="2px" />
          </Link>
        </FormHelperText>
      </FormControl>
    </chakra.form>
  )
}
const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex height="100vh" direction="column">
      <Flex justify="flex-end" marginX="1rem" marginTop="1rem">
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
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
