import {render, screen} from '@testing-library/react'
import App from './App'

test('renders tour of heroes', () => {
  render(<App />)
  const linkElement = screen.getByText(/tour/i)
  expect(linkElement).toBeInTheDocument()
})
