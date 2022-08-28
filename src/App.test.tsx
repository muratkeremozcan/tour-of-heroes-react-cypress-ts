import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders tour of heroes', async () => {
  render(<App />)
  // there is no concept of url in virtual DOM,
  // therefore 'not-found' component is not relevant here

  userEvent.click(screen.getByText('About'))
  expect(screen.getByTestId('about')).toBeVisible()

  userEvent.click(screen.getByText('Heroes'))
  expect(screen.getByTestId('heroes')).toBeVisible()
})

// CT vs RTL: src/App.cy.tsx
