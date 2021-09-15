import { getCsrfToken } from 'next-auth/client'
import { useEffect, useState } from 'react'

const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<undefined | string>(undefined)

  const getToken = async () => {
    const t = await getCsrfToken()
    if (t) setCsrfToken(t)
  }

  useEffect(() => {
    getToken()
  }, [])

  return csrfToken
}

export default useCsrfToken
