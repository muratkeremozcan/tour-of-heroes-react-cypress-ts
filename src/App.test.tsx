import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import {heroes} from '../db.json'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

describe('200 flow', () => {
  const handlers = [
    rest.get(
      `${process.env.REACT_APP_API_URL}/heroes`,
      async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(heroes))
      },
    ),
  ]
  const server = setupServer(...handlers)
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn',
    })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
  test('renders tour of heroes', async () => {
    render(<App />)
    await act(() => new Promise(r => setTimeout(r, 0))) // spinner

    await userEvent.click(screen.getByText('About'))
    expect(screen.getByTestId('about')).toBeVisible()

    await userEvent.click(screen.getByText('Heroes'))
    expect(screen.getByTestId('heroes')).toBeVisible()
  })
})
