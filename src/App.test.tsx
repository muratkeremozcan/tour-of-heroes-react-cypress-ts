import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import {heroes, villains, boys} from '../db.json'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

describe('200 flow', () => {
  const handlers = [
    rest.get(`${import.meta.env.VITE_API_URL}/heroes`, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(heroes)),
    ),
    rest.get(
      `${import.meta.env.VITE_API_URL}/villains`,
      async (_req, res, ctx) => res(ctx.status(200), ctx.json(villains)),
    ),
    rest.get(`${import.meta.env.VITE_API_URL}/boys`, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(boys)),
    ),
  ]
  const server = setupServer(...handlers)
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn',
    })
  })
  afterEach(server.resetHandlers)
  afterAll(server.close)

  test('renders tour of heroes', async () => {
    render(<App />)
    await act(() => new Promise(r => setTimeout(r, 0))) // spinner

    await userEvent.click(screen.getByText('About'))
    expect(await screen.findByTestId('about')).toBeVisible()

    await userEvent.click(screen.getByText('Heroes'))
    expect(await screen.findByTestId('heroes')).toBeVisible()

    await userEvent.click(screen.getByText('Villains'))
    expect(await screen.findByTestId('villains')).toBeVisible()

    await userEvent.click(screen.getByText('Boys'))
    expect(await screen.findByTestId('boys')).toBeVisible()
  })
})
