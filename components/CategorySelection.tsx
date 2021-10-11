import { Suspense, useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Flex,
  createStandaloneToast,
  Skeleton,
  Button,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useMutation, useQuery } from '../gqty'

const CategorySelection = () => {
  const toast = createStandaloneToast()
  const query = useQuery()

  const myTags =
    query.me?.interestedTags()?.edges?.map((tag) => {
      if (tag?.node?.name) {
        return {
          label: tag?.node?.name,
          value: tag?.node?.id,
        }
      }
      return null
    }) ?? []

  const [categories, setCategories] = useState<
    Array<{
      label: string
      value: string
    }>
    // @ts-expect-error this ensures that there are no null values in the array
  >(myTags.filter(Boolean))

  // TODO: find a way to remove this and only rely in query so we don't have to manage this messy state
  useEffect(() => {
    // @ts-expect-error this ensures that there are no null values in the array
    setCategories(() => myTags.filter(Boolean))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.$state.isLoading])

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
      {query.$state.isLoading ? (
        <Skeleton height="2rem" mt="rem"></Skeleton>
      ) : (
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
      )}
    </FormControl>
  )
}

export default CategorySelection
