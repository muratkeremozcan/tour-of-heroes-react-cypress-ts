import Villains from './Villains'
import {wrappedRender, screen, waitForElementToBeRemoved} from 'test-utils'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {villains} from '../../db.json'

describe('Villains', () => {
  // mute the expected console.error message, because we are mocking non-200 responses
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => wrappedRender(<Villains />))

  it('should see error on initial load with GET', async () => {
    const handlers = [
      rest.get(
        `${import.meta.env.VITE_API_URL}/villains`,
        async (_req, res, ctx) => res(ctx.status(500)),
      ),
    ]
    const server = setupServer(...handlers)
    server.listen({
      onUnhandledRequest: 'warn',
    })
    jest.useFakeTimers()

    expect(await screen.findByTestId('page-spinner')).toBeVisible()

    jest.advanceTimersByTime(30000)
    await waitForElementToBeRemoved(
      () => screen.queryByTestId('page-spinner'),
      {
        timeout: 30000,
      },
    )

    expect(await screen.findByTestId('error')).toBeVisible()
    jest.useRealTimers()
    server.resetHandlers()
    server.close()
  })

  describe('200 flows', () => {
    const handlers = [
      rest.get(
        `${import.meta.env.VITE_API_URL}/villains`,
        async (_req, res, ctx) => res(ctx.status(200), ctx.json(villains)),
      ),
      rest.delete(
        `${import.meta.env.VITE_API_URL}/villains/${villains[0].id}`, // use /.*/ for all requests
        async (_req, res, ctx) =>
          res(ctx.status(400), ctx.json('expected error')),
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

    it('should display the villain list on render, and go through villain add & refresh flow', async () => {
      expect(await screen.findByTestId('list-header')).toBeVisible()
      expect(await screen.findByTestId('villain-list')).toBeVisible()

      await userEvent.click(await screen.findByTestId('add-button'))
      expect(window.location.pathname).toBe('/villains/add-villain')

      await userEvent.click(await screen.findByTestId('refresh-button'))
      expect(window.location.pathname).toBe('/villains')
    })

    const deleteButtons = async () => screen.findAllByTestId('delete-button')
    const modalYesNo = async () => screen.findByTestId('modal-yes-no')
    const maybeModalYesNo = () => screen.queryByTestId('modal-yes-no')
    const invokeVillainDelete = async () => {
      userEvent.click((await deleteButtons())[0])
      expect(await modalYesNo()).toBeVisible()
    }

    it('should go through the modal flow, and cover error on DELETE', async () => {
      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()

      await invokeVillainDelete()
      await userEvent.click(await screen.findByTestId('button-no'))
      expect(maybeModalYesNo()).not.toBeInTheDocument()

      await invokeVillainDelete()
      await userEvent.click(await screen.findByTestId('button-yes'))

      expect(maybeModalYesNo()).not.toBeInTheDocument()
      expect(await screen.findByTestId('error')).toBeVisible()
      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()
    })
  })
})
