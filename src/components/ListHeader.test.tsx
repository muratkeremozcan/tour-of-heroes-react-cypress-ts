import ListHeader from './ListHeader'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('ListHeader', () => {
  it('should call click handlers on add & refresh button clicks', async () => {
    const handleAdd = jest.fn()
    const handleRefresh = jest.fn()
    const title = 'Heroes'
    render(
      <BrowserRouter>
        <ListHeader
          title={title}
          handleAdd={handleAdd}
          handleRefresh={handleRefresh}
        />
      </BrowserRouter>,
    )

    await userEvent.click(await screen.findByTestId('add-button'))
    expect(handleAdd).toHaveBeenCalled()

    await userEvent.click(await screen.findByTestId('refresh-button'))
    expect(handleRefresh).toHaveBeenCalled()

    await userEvent.click(await screen.findByText(title))
    expect(window.location.pathname).toBe(`/${title}`)
  })
})
