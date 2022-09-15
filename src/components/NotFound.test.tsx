import NotFound from './NotFound'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('NotFound', () => {
  it('should', async () => {
    render(<NotFound />)

    expect(await screen.findByTestId('not-found')).toBeVisible()
    expect(await screen.findByTestId('exclamation')).toBeVisible()
    expect(
      await screen.findByText("These aren't the bits you're looking for"),
    ).toBeVisible()
  })
})
