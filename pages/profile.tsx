import { Suspense, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Image, Heading, Flex, Button } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import CategorySelection from '../components/CategorySelection'

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
