import PageSpinner from './PageSpinner'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('PageSpinner', () => {
  it('should render a PageSpinner', async () => {
    render(<PageSpinner />)
    await screen.findByTestId('page-spinner')
  })
})
