import {useEffect, useState} from 'react'
// import axios, {AxiosResponse} from 'axios'
import {getItem} from '../api/api'

/** Takes a url, returns an object of data, status & error */
export default function useAxios(url: string) {
  const [data, setData] = useState()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  // When fetching data within a call to useEffect, combine a local variable and the cleanup function
  // in order to match a data request with its response:
  // If the component re-renders, the cleanup function for the previous render will set the previous render’s doUpdate variable to false,
  // preventing the previous then method callback from performing updates with stale data.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    let doUpdate = true

    setData(undefined)
    setError(null)
    setStatus('loading')

    getItem(url)
      .then(data => {
        if (doUpdate) {
          setData(data)
          setStatus('success')
        }
        console.log('data is', data)
      })
      .catch(error => {
        if (doUpdate) {
          setError(error)
          setStatus('error')
        }
      })

    return () => (doUpdate = false)
  }, [url])

  return {data, status, error}
}
