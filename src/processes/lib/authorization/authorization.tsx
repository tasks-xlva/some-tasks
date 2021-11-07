import { ReactNode, useEffect, useMemo, useState } from 'react'
import { isUserAuthorized } from './is-user-authorized'
import { AuthorizationContext } from './authorization-context'

interface Props {
  children: ReactNode
}

export const Authorization = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    isUserAuthorized()
      .then(setIsAuthorized)
      .finally(() => setIsLoading(false))
  }, [])

  const contextValue = useMemo(
    () => ({ isAuthorized, setIsAuthorized }),
    [isAuthorized],
  )

  if (isLoading) {
    return null
  }

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  )
}