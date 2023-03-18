import { useCallback, useEffect, useState } from 'react'
// const MARKDOWN_IMAGE_REGEX = /!\[(.*?)\]\((.*?[\s"]?)\)/g

const { REACT_APP_BUCKET } = process.env

type BucketData = Response | { error: any } | null

const cache: Record<string, BucketData> = {}

interface FUseWithBucketData {
  (path?: string): BucketData
  <K extends keyof Pick<Response, 'text' | 'json' | 'arrayBuffer' | 'blob'>>(
    path?: string,
    awaitedKey?: K,
  ): Awaited<ReturnType<Response[K]>> | Exclude<BucketData, Response>
}
// @ts-ignore
const useWithBucketFile: FUseWithBucketData = (path, awaitedKey) => {
  const [data, setData] = useState<ReturnType<FUseWithBucketData>>(null)

  const handleAwaitedKey = useCallback((response: Response) => {
    switch (awaitedKey) {
      case 'text':
        response.text().then((value) => setData(value))
        break
      case 'json':
        response.json().then((value) => setData(value))
        break
      case 'arrayBuffer':
        response.arrayBuffer().then((value) => setData(value))
        break
      case 'blob':
        response.blob().then((value) => setData(value))
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    if (!path) {
      setData(null)
    } else {
      const cached = cache[path]
      if (cached) {
        if (cached instanceof Response) {
          handleAwaitedKey(cached)
        } else {
          setData(cached)
        }
      } else if (REACT_APP_BUCKET) {
        fetch(path).then(async (response) => {
          cache[path] = response
          if (awaitedKey) {
            handleAwaitedKey(response)
          } else {
            setData(response)
          }
        }).catch((error) => {
          cache[path] = { error }
          setData({ error })
        })
      } else {
        const error = { error: 'Bucket path missing' }
        cache[path] = error
        setData(error)
      }
    }
  }, [path, awaitedKey])

  return data
}
export default useWithBucketFile
