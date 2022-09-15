import HeroDetail from './HeroDetail'
import '@testing-library/jest-dom'
import {wrappedRender, act, screen, waitFor} from 'test-utils'
import userEvent from '@testing-library/user-event'

describe('HeroDetail', () => {
  beforeEach(() => {
    wrappedRender(<HeroDetail />)
  })

  // with msw, it is not recommended to use verify XHR calls going out of the app
  // instead, the advice is the verify the changes in the UI
  // alas, sometimes there are no changes in the component itself
  // therefore we cannot test everything 1:1 versus Cypress component test
  // should handle Save and should handle non-200 Save have no RTL mirrors

  it('should handle Cancel', async () => {
    // code that causes React state updates (ex: BrowserRouter)
    // should be wrapped into act(...):
    // userEvent.click(await screen.findByTestId('cancel-button')) // won't work
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

  const inputDetailDescription = async () =>
    screen.findByPlaceholderText('e.g. dance fight!')

  it('should handle description change', async () => {
    const newHeroDescription = '123'

    userEvent.type(await inputDetailDescription(), newHeroDescription)
    await waitFor(async () =>
      expect(await inputDetailDescription()).toHaveDisplayValue(
        newHeroDescription,
      ),
    )
  })

  it('id: false, name: false - should verify the minimal state of the component', async () => {
    expect(await screen.findByTestId('input-detail-name')).toBeVisible()
    expect(await screen.findByTestId('input-detail-description')).toBeVisible()
    expect(screen.queryByTestId('input-detail-id')).not.toBeInTheDocument()

    expect(await inputDetailDescription()).toBeVisible()

    expect(await screen.findByTestId('save-button')).toBeVisible()
    expect(await screen.findByTestId('cancel-button')).toBeVisible()
  })
})
