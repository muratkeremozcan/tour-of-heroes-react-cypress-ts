import axios from 'axios'

export type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type CrudOptions = {body?: Hero | object; config?: object}

export type Hero = {id: string; name: string; description: string}

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
  baseURL: string,
  {body, ...config}: CrudOptions = {},
) =>
  axios({
    method,
    baseURL,
    data: method === 'POST' || method === 'PUT' ? body : undefined,
    ...config,
  })
    .then(res => res.data)
    .catch(err => {
      throw Error(`There was a problem fetching data: ${err}`)
    })
