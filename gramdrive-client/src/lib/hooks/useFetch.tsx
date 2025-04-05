import { useState, useEffect, useCallback } from 'react'

export function useFetch<T>(promiseFactoryFn: () => Promise<T>, deps: React.DependencyList = []) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const promiseFactory = useCallback(promiseFactoryFn, deps)

  useEffect(() => {
    setIsLoading(true)
    promiseFactory().then(data => {
      setData(data)
      setIsLoading(false)
    }).catch(error => {
      setError(error)
      setIsLoading(false)
    })
  }, [promiseFactory])

  return { data, error, isLoading }
}