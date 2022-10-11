import NavBar from './NavBar'
import {render, screen, within, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

const routes = ['Heroes', 'Villains', 'Boys', 'About']
const link = async (name: string) => screen.findByRole('link', {name})

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    )
  })

  it('should verify route layout', async () => {
    expect(await screen.findByText('Menu')).toBeVisible()

    const menuList = await screen.findByTestId('menu-list')
    routes.map(route => within(menuList).getByText(route))
  })

  it.each(routes)('should navigate to route %s', async (route: string) => {
    const activeRouteLink = await link(route)
    userEvent.click(activeRouteLink)
    await waitFor(() => expect(activeRouteLink).toHaveClass('active-link'))
    expect(window.location.pathname).toEqual(`/${route.toLowerCase()}`)

    const remainingRoutes = routes.filter(r => r !== route)
    remainingRoutes.map(async inActiveRoute => {
      expect(await link(inActiveRoute)).not.toHaveClass('active-link')
    })
  })
})
