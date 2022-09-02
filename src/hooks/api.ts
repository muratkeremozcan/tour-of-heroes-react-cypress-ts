import axios from 'axios'
import {Hero} from 'models/Hero'

export type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type CrudOptions = {item?: Hero | object; config?: object}

export const client = (route: string, method: CrudType, item?: Hero | object) =>
  axios({
    method,
    baseURL: `${process.env.REACT_APP_API_URL}/${route}`,
    data: method === 'POST' || method === 'PUT' ? item : undefined,
  })
    .then(res => res.data)
    .catch(err => {
      throw Error(`There was a problem fetching data: ${err}`)
    })

export function createItem(route: string, item: Hero | object) {
  return client(route, 'POST', item)
}

export function editItem(route: string, item: Hero | object) {
  return client(route, 'PUT', item)
}

export function deleteItem(route: string) {
  return client(route, 'DELETE')
}

export function getItem(route: string) {
  return client(route, 'GET')
}
