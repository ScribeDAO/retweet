import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { Image, Heading, FormControl, FormLabel } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { SummaryFormProps } from '../components/SubmitSummary'
import Navbar from '../components/Navbar'
import prisma from '../lib/db'

type Data = {
  tags: SummaryFormProps['tags']
}

const Profile = ({ tags }: Data) => {
  const [session, loading] = useSession()
  console.log(tags)
  const options = tags.map((tag) => ({ label: tag.name, value: tag.id }))
  return (
    <>
      <Navbar hideProfile />
      <Image
        borderRadius="full"
        width="100px"
        height="100px"
        src={session?.user?.image!}
        alt={session?.user?.name!}
      />
      <Heading mt="1rem">{session?.user?.name!}</Heading>
      <FormControl>
        <FormLabel>Select categories you are interested in</FormLabel>
        <Select isMulti options={options} />
      </FormControl>
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
