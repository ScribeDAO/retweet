import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode, Button } from '@chakra-ui/react'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode} variant="ghost">
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default ThemeButton
