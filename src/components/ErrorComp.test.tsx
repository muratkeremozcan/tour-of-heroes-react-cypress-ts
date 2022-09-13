import ErrorComp from './ErrorComp'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ErrorComp', () => {
  it('should render error', async () => {
    render(<ErrorComp />)
    expect(await screen.findByTestId('error')).toBeVisible()
  })
})
