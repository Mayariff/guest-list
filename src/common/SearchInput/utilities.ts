import { useEffect, useState } from "react"

export const useDebounce = (value, ms: number = 1000) => {
  const [debounceValue, setDebounceValue] = useState<string | number>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), ms)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debounceValue
}
