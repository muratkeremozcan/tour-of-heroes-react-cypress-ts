import {useSearchParams} from 'react-router-dom'

export function useEntityParams() {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  const description = searchParams.get('description')

  return {name, description}
}
