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
  createStandaloneToast,
  chakra,
} from '@chakra-ui/react'
import { Field, Formik, Form } from 'formik'
import Reward from 'react-rewards'

const SummaryForm = () => {
  const yay = useRef()
  const toast = createStandaloneToast()

  const validateTwitterUrl = (value: string) => {
    const match = value.match(/\/status\/(\d+)/)
    if (!match) return 'Gm! We need a twitter thread please. ✌'
  }

  return (
    <Formik
      initialValues={{ url: '' }}
      onSubmit={async (values, actions) => {
        const res = await fetch('/api/retweet', {
          method: 'POST',
          body: JSON.stringify({
            tweet_id: values.url.match(/\/status\/(\d+)/)![1],
          }),
        })

        actions.setSubmitting(false)

        if (res.status >= 400) {
          const body = await res.json()
          toast({
            title: 'An error occurred.',
            description: body.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
          // @ts-ignore -  we know this exists find a better way to type this
          yay.current.punishMe()
        } else {
          // @ts-ignore - we know this exists find a better way to type this
          yay.current.rewardMe()
        }
      }}
    >
      {(props) => (
        <Form style={{ width: '70%' }}>
          <FormControl>
            <FormLabel htmlFor="url">Summary Link</FormLabel>
            <Flex>
              <Field name="url" validate={validateTwitterUrl}>
                {/* @ts-ignore TODO: improve typings */}
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.url && form.touched.url}>
                    <Input {...field} id="url" placeholder="Tweet URL" />
                    <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* @ts-ignore TODO: improve typings */}
              <Reward
                ref={yay}
                type="confetti"
                config={{ spread: 135, elementCount: 900 }}
              >
                <Button
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  marginLeft="1rem"
                >
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
        </Form>
      )}
    </Formik>
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
