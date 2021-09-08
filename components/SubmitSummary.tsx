import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useRef } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Link,
  createStandaloneToast,
  Select,
} from '@chakra-ui/react'
import { Field, Formik, Form } from 'formik'
import Reward from 'react-rewards'
import { Prisma } from '.prisma/client'
import { useSession } from 'next-auth/client'

export type SummaryFormProps = {
  tags: Pick<Prisma.TagGroupByOutputType, 'id' | 'name'>[]
}

const SummaryForm = ({ tags }: SummaryFormProps) => {
  const yay = useRef()
  const toast = createStandaloneToast()
  const [session] = useSession()

  const validateTwitterUrl = (value: string) => {
    const match = value.match(/\/status\/(\d+)/)
    if (!match) return 'Gm! We need a twitter thread please. ✌'
  }

  const validateCategory = (value: string) => {
    if (value.length <= 0) return 'Please select a category.'
  }

  return (
    <Formik
      initialValues={{ url: '', category: '' }}
      onSubmit={async (values, actions) => {
        const res = await fetch('/api/retweet', {
          method: 'POST',
          body: JSON.stringify({
            tweet_id: values.url.match(/\/status\/(\d+)/)![1],
            category_id: values.category,
            access_token: session?.accessToken,
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
            <Field name="url" validate={validateTwitterUrl}>
              {/* @ts-ignore TODO: improve typings */}
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.url && form.touched.url}>
                  <Input {...field} id="url" placeholder="Tweet URL" />
                  <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex marginTop="0.5rem">
              <Field name="category" validate={validateCategory}>
                {/* @ts-ignore TODO: improve typings */}
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.category && form.touched.category}
                  >
                    <Select {...field} placeholder="Select a category" required>
                      {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Reward
                // @ts-ignore TODO: improve typings
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

export default SummaryForm
