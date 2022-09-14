import Heroes from './Heroes'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import {Suspense} from 'react'
import ErrorComp from 'components/ErrorComp'
import PageSpinner from 'components/PageSpinner'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {heroes} from '../../db.json'

describe('Heroes', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ErrorBoundary fallback={<ErrorComp />}>
          <Suspense fallback={<PageSpinner />}>
            <BrowserRouter>
              <Heroes />
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>,
    )
  })

  const handlers = [
    rest.get(
      `${process.env.REACT_APP_API_URL}/heroes`,
      async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(heroes))
      },
    ),
    rest.delete(
      `${process.env.REACT_APP_API_URL}/heroes/${heroes[0].id}`, // use /.*/ for all requests
      async (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json('expected error'))
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

  describe('200 flows', () => {
    it('should display the hero list on render, and go through hero add & refresh flow', async () => {
      expect(await screen.findByTestId('list-header')).toBeVisible()
      expect(await screen.findByTestId('hero-list')).toBeVisible()

      await userEvent.click(await screen.findByTestId('add-button'))
      expect(window.location.pathname).toBe('/heroes/add-hero')

      await userEvent.click(await screen.findByTestId('refresh-button'))
      expect(window.location.pathname).toBe('/heroes')
    })

    it('should go through the modal flow - do not delete', async () => {
      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()
      const deleteButtons = await screen.findAllByTestId('delete-button')

      // TODO: can we make this part into a helper function like invokeHeroDelete() in Heroes.cy.tsx?
      await userEvent.click(deleteButtons[0])
      const modalYesNo = await screen.findByTestId('modal-yes-no')

      expect(modalYesNo).toBeVisible()
      await userEvent.click(await screen.findByTestId('button-no'))
      expect(modalYesNo).not.toBeInTheDocument()
    })

    // NOTE: it is not easy to merge these two tests, or create helpers to reduce code bloat
    // in comparison to Cypress api
    // therefore we took advantage of the situation by incorporating the non-200 flow into this test
    // in the Cypress CT version we covered the non-200 separately, on initial load "should go through the error flow"
    // covering the error message on GET on initial flow was painful,
    // working with jest timers

    it('should go through the modal delete flow, and get a delete error', async () => {
      // mute the expected console.error message, because we are mocking a 400 response
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()
      const deleteButtons = await screen.findAllByTestId('delete-button')

      await userEvent.click(deleteButtons[0])
      const modalYesNo = await screen.findByTestId('modal-yes-no')

      expect(modalYesNo).toBeVisible()
      await userEvent.click(await screen.findByTestId('button-yes'))

      expect(modalYesNo).not.toBeInTheDocument()
      expect(await screen.findByTestId('error')).toBeVisible()
    })
  })
})
