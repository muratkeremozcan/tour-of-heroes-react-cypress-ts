import HeaderBarBrand from './HeaderBarBrand'
import {render, screen, within} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('HeaderBarBrand', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
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

    within(await screen.findByTestId('header-bar-brand'))
    // TODO: find out how to we verify a svg with RTL
  })

  it('should verify internal link spans and navigation', async () => {
    const navLink = await screen.findByTestId('navLink')
    const withinNavLink = within(navLink)
    ;['TOUR', 'OF', 'HEROES'].map(part => withinNavLink.getByText(part))

    await userEvent.click(navLink)
    expect(window.location.href).toBe('http://localhost/')
  })
})
