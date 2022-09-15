import HeaderBar from './HeaderBar'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'

describe('HeaderBar', () => {
  it('should render error', async () => {
    render(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    )
    expect(await screen.findByTestId('header-bar-brand')).toBeVisible()
  })
})
