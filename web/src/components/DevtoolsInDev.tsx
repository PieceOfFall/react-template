import { useEffect, useState } from 'react'

type DevtoolsComponent = typeof import('@tanstack/react-query-devtools').ReactQueryDevtools

const DevtoolsInDev = () => {
  const [Devtools, setDevtools] = useState<DevtoolsComponent | null>(null)

  useEffect(() => {
    let active = true

    void import('@tanstack/react-query-devtools').then((module) => {
      if (active) {
        setDevtools(() => module.ReactQueryDevtools)
      }
    })

    return () => {
      active = false
    }
  }, [])

  if (!Devtools) {
    return null
  }

  return <Devtools initialIsOpen={false} />
}

export default DevtoolsInDev
