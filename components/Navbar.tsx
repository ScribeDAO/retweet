import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  useColorMode,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/client'
import DiscordButton from './LoginWithDiscord'

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
                <Button size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      )}
    </>
  )
}

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex marginX="1rem" marginTop="1rem" justifyContent="space-between">
      <AuthButton />
      <Flex justify="flex-end">
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
