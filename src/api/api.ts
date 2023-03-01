import axios from 'axios'
import {Hero} from 'models/Hero'

export type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type CrudOptions = {item?: Hero | object; config?: object}

export const client = (route: string, method: CrudType, item?: Hero | object) =>
  axios({
    method,
    baseURL: `${import.meta.env.VITE_API_URL}/${route}`,
    data: method === 'POST' || method === 'PUT' ? item : undefined,
  })
    .then(res => res.data)
    .catch(err => {
      throw Error(`There was a problem fetching data: ${err}`)
    })

export const createItem = (route: string, item: Hero | object) =>
  client(route, 'POST', item)

export const editItem = (route: string, item: Hero | object) =>
  client(route, 'PUT', item)

export const deleteItem = (route: string) => client(route, 'DELETE')

export const getItem = (route: string) => client(route, 'GET')
