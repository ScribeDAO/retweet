import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import {
  Image,
  Heading,
  FormControl,
  FormLabel,
  Flex,
  createStandaloneToast,
  Button,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import Navbar from '../components/Navbar'
import { useMutation, useQuery } from '../gqty'

const CategorySelection = () => {
  const toast = createStandaloneToast()
  const query = useQuery()
  const myTags =
    query.me?.interestedTags()?.edges?.map((tag) => ({
      label: tag?.node?.name!,
      value: tag?.node?.id!,
    })) || []

  const [categories, setCategories] =
    useState<Array<{ label: string; value: string }>>(myTags)

  const [categoryUpdate, { isLoading }] = useMutation(
    (mutation, args: { categories: string[] }) => {
      const user = mutation.updateUserCategories(args)

      if (user) {
        return {
          interestedTags: user.interestedTags()?.edges?.map((tag) => ({
            label: tag?.node?.name,
            value: tag?.node?.id,
          })),
        }
      }
    },
    {
      onCompleted() {
        toast({ status: 'success', description: 'Categories updated' })
      },
      onError(error) {
        toast({ status: 'error', description: error.message })
      },
      refetchQueries: [query.me],
      awaitRefetchQueries: true,
      suspense: false,
    },
  )

  const options = query!
    .tags()!
    .edges!.map((tag) => ({ label: tag?.node?.name, value: tag?.node?.id }))

  const updateCategories = () => {
    const update = categories.map((category) => category.value)
    categoryUpdate({ args: { categories: update } })
  }

  return (
    <FormControl maxW="70%">
      <Flex direction="column" marginTop="2rem">
        <FormLabel>Select categories you are interested in</FormLabel>
        <Flex justifyContent="center" alignItems="center">
          <FormControl>
            <Select
              // @ts-ignore Docs say this exists and it works.
              isMulti
              options={options}
              value={categories}
              onChange={(e: any) => setCategories(e)}
            />
          </FormControl>
          <Button
            isLoading={isLoading}
            ml="1rem"
            colorScheme="teal"
            onClick={updateCategories}
          >
            Update
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}

const Profile = () => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [router, session])

  return (
    <>
      <Navbar hideProfile />
      <Flex justifyContent="center">
        <Flex direction="column">
          <Image
            borderRadius="full"
            width="100px"
            height="100px"
            marginTop="2rem"
            src={session?.user?.image!}
            alt={session?.user?.name!}
          />
          <Heading mt="1rem">{session?.user?.name!}</Heading>
        </Flex>
      </Flex>
      <Flex justifyContent="center">
        <CategorySelection />
      </Flex>
    </>
  )
}

export default Profile
