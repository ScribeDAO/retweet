import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'
import DiscordButton from './LoginWithDiscord'
import ThemeButton from './ThemeButton'

const AuthButton = () => {
  const [session, loading] = useSession()

  return (
    <>
      {!session && <DiscordButton />}
      {session && (
        <Flex>
          <Popover isLazy>
            <PopoverTrigger>
              <Button variant="ghost" isLoading={loading}>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  width="40px"
                  height="40px"
                  src={session?.user?.image!}
                  alt={session?.user?.name!}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent mx={2}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Hello {session?.user?.name} 👋</PopoverHeader>
              <PopoverBody>
                <Flex direction="column">
                  <Link href="/profile" passHref>
                    <Button size="sm" mb="0.5rem">
                      Profile
                    </Button>
                  </Link>
                  <Button size="sm" onClick={() => signOut()}>
                    Sign out
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      )}
    </>
  )
}

type NavbarProps = {
  hideProfile?: boolean
}

const Navbar = ({ hideProfile = false }: NavbarProps) => {
  return (
    <Flex marginX="1rem" marginTop="1rem" justifyContent="space-between">
      {hideProfile ? <div /> : <AuthButton />}
      <Flex justify="flex-end">
        <ThemeButton />
      </Flex>
    </Flex>
  )
}

export default Navbar
