import HeaderBarBrand from './HeaderBarBrand'
import {render, screen, within} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('HeaderBarBrand', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HeaderBarBrand />
      </BrowserRouter>,
    )
  })
  it('should verify external link attributes', async () => {
    const link = await screen.findByTestId('header-bar-brand-link')
    expect(link).toHaveAttribute('href', 'https://reactjs.org/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    // not easy to get a tag with RTL, needed to use a test id
    within(await screen.findByTestId('header-bar-brand')).getByTestId(
      'react-icon-svg',
    )
  })

  it('should verify internal link spans and navigation', async () => {
    const navLink = await screen.findByTestId('navLink')
    const withinNavLink = within(navLink)
    ;['TOUR', 'OF', 'HEROES'].forEach(part => withinNavLink.getByText(part))

    await userEvent.click(navLink)
    expect(window.location.pathname).toBe('/')
  })
})
