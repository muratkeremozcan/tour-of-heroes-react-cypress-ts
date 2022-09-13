import NavBar from './NavBar'
import {render, screen, within, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('NavBar', () => {
  it('should navigate to the correct routes', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    )

    expect(await screen.findByText('Menu')).toBeVisible()

    const menuList = await screen.findByTestId('menu-list')
    const routes = ['Heroes', 'Villains', 'About']
    routes.map(route => within(menuList).getByText(route))

    const link = async (name: string) => screen.findByRole('link', {name})
    const heroes = await link(routes[0])
    const villains = await link(routes[1])
    const about = await link(routes[2])

    userEvent.click(villains)
    await waitFor(() => expect(villains).toHaveClass('active-link'))
    expect(heroes).not.toHaveClass('active-link')
    expect(about).not.toHaveClass('active-link')
    expect(window.location.pathname).toEqual('/villains')

    userEvent.click(about)
    await waitFor(() => expect(about).toHaveClass('active-link'))
    expect(heroes).not.toHaveClass('active-link')
    expect(villains).not.toHaveClass('active-link')
    expect(window.location.pathname).toEqual('/about')

    userEvent.click(heroes)
    await waitFor(() => expect(heroes).toHaveClass('active-link'))
    expect(about).not.toHaveClass('active-link')
    expect(villains).not.toHaveClass('active-link')
    expect(window.location.pathname).toEqual('/heroes')
  })
})
