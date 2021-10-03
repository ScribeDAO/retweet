import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { Image, Heading, FormControl, FormLabel, Flex } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { SummaryFormProps } from '../components/SubmitSummary'
import Navbar from '../components/Navbar'
import prisma from '../lib/db'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Data = {
  tags: SummaryFormProps['tags']
}

const Profile = ({ tags }: Data) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [router, session])

  const options = tags.map((tag) => ({ label: tag.name, value: tag.id }))
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
        <FormControl maxWidth="40rem" marginTop="2rem">
          <FormLabel textAlign="center">
            Select categories you are interested in
          </FormLabel>
          {/* @ts-ignore Docs say this exists and it works. */}
          <Select isMulti options={options} />
        </FormControl>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // get all the tags to choose from
  const tags = await prisma.tag.findMany({ select: { id: true, name: true } })

  return {
    props: {
      tags,
    },
  }
}
export default Profile
