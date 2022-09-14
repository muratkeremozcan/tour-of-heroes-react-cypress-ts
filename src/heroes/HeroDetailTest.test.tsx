import HeroDetail from './HeroDetail'
import '@testing-library/jest-dom'
import {act, logRoles, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'

describe('HeroDetail', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>
      </QueryClientProvider>,
    )
  })

  it('should handle Cancel', async () => {
    // code that causes React state updates (ex: BrowserRouter) should be wrapped into act(...):
    act(() => screen.getByTestId('cancel-button').click())

    expect(window.location.pathname).toBe('/heroes')
  })

  it('should handle name change', async () => {
    const newHeroName = 'abc'
    const inputDetailName = await screen.findByPlaceholderText('e.g. Colleen')
    userEvent.type(inputDetailName, newHeroName)

    await waitFor(async () =>
      expect(inputDetailName).toHaveDisplayValue(newHeroName),
    )
  })

  it('should handle description change', async () => {
    const newHeroDescription = '123'
    const inputDetailDescription = await screen.findByPlaceholderText(
      'e.g. dance fight!',
    )
    userEvent.type(inputDetailDescription, newHeroDescription)

    await waitFor(async () =>
      expect(inputDetailDescription).toHaveDisplayValue(newHeroDescription),
    )
  })

  it('id: false, name: false - should verify the minimal state of the component', async () => {
    expect(await screen.findByTestId('input-detail-name')).toBeVisible()
    expect(await screen.findByTestId('input-detail-description')).toBeVisible()
    expect(screen.queryByTestId('input-detail-id')).not.toBeInTheDocument()

    expect(
      await screen.findByPlaceholderText('e.g. dance fight!'),
    ).toBeVisible()

    expect(await screen.findByTestId('save-button')).toBeVisible()
    expect(await screen.findByTestId('cancel-button')).toBeVisible()
  })

  // NOTE: it is recommended not to use msw for verifying the outgoing network calls
  // instead it advises to check the consequences of the network within the UI
  // I could not get it to work as advertized
  // https://mswjs.io/docs/extensions/life-cycle-events#tracking-a-request
  // describe.skip('verify network calls', () => {
  //   function waitForRequest(
  //     method: string,
  //     url: string,
  //     server: SetupServerApi,
  //   ) {
  //     let requestId = ''
  //     return new Promise<MockedRequest>((resolve, reject) => {
  //       server.events.on('request:start', req => {
  //         const matchesMethod =
  //           req.method.toLowerCase() === method.toLowerCase()
  //         const matchesUrl = matchRequestUrl(req.url, url).matches
  //         if (matchesMethod && matchesUrl) {
  //           requestId = req.id
  //         }
  //       })
  //       server.events.on('request:match', req => {
  //         if (req.id === requestId) {
  //           resolve(req)
  //         }
  //       })
  //       server.events.on('request:unhandled', req => {
  //         if (req.id === requestId) {
  //           reject(
  //             new Error(
  //               `The ${req.method} ${req.url.href} request was unhandled.`,
  //             ),
  //           )
  //         }
  //       })
  //     })
  //   }

  //   it('should handle save', async () => {
  //     const handlers = [
  //       rest.post(
  //         `${process.env.REACT_APP_API_URL}/heroes`,
  //         async (_req, res, ctx) => {
  //           return res(ctx.status(200))
  //         },
  //       ),
  //     ]
  //     const server = setupServer(...handlers)
  //     const pendingRequest = waitForRequest('POST', '/heroes', server)
  //     server.listen({
  //       onUnhandledRequest: 'warn',
  //     })

  //     // cause the request to go out
  //     const saveButton = await screen.findByTestId('save-button')
  //     expect(saveButton).toBeVisible()
  //     await userEvent.click(saveButton)

  //     // ensure that a network call was made (but it times out)
  //     await pendingRequest

  //     server.resetHandlers()
  //     server.close()
  //   })
  // })
})
