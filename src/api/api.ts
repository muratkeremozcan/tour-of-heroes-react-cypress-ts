import axios from 'axios'
import {Hero} from '../models/Hero'

export type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type CrudOptions = {body?: Hero | object; config?: object}

/**
 * Performs crud operations GET, POST, PUT and DELETE.
 *
 * `body` and `config` are optional.
 *
 * If the body is passed in and the method is `POST` or `PUT`, the payload will be taken,
 * otherwise undefined for `GET` and `DELETE`.
 * @param method
 * @param baseUrl
 * @param options: {CrudOptions}
 */
export const client = (
  method: CrudType,
  route: string,
  {body, ...config}: CrudOptions = {},
) =>
  axios({
    method,
    baseURL: `${process.env.REACT_APP_API_URL}/${route}`,
    data: method === 'POST' || method === 'PUT' ? body : undefined,
    ...config,
  })
    .then(res => res.data)
    .catch(err => {
      throw Error(`There was a problem fetching data: ${err}`)
    })
