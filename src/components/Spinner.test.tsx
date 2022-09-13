import Spinner from './Spinner'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Spinner', () => {
  it('should render a spinner', async () => {
    render(<Spinner />)
    await screen.findByTestId('spinner')
  })
})
