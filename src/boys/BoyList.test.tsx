import BoyList from './BoyList'
import {wrappedRender, screen, waitFor} from 'test-utils'
import userEvent from '@testing-library/user-event'
import {boys} from '../../db.json'

describe('BoyList', () => {
  const handleDeleteBoy = jest.fn()

  it('no boys should not display a list nor search bar', async () => {
    wrappedRender(<BoyList boys={[]} handleDeleteBoy={handleDeleteBoy} />)

    expect(await screen.findByTestId('boy-list')).toBeInTheDocument()
    expect(screen.queryByTestId('boy-list-item-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument()
  })

  describe('with boys in the list', () => {
    beforeEach(() => {
      wrappedRender(<BoyList boys={boys} handleDeleteBoy={handleDeleteBoy} />)
    })

    const cardContents = async () => screen.findAllByTestId('card-content')
    const deleteButtons = async () => screen.findAllByTestId('delete-button')
    const editButtons = async () => screen.findAllByTestId('edit-button')

    it('should render the boy layout', async () => {
      expect(
        await screen.findByTestId(`boy-list-item-${boys.length - 1}`),
      ).toBeInTheDocument()

      expect(await screen.findByText(boys[0].name)).toBeInTheDocument()
      expect(await screen.findByText(boys[0].description)).toBeInTheDocument()
      expect(await cardContents()).toHaveLength(boys.length)
      expect(await deleteButtons()).toHaveLength(boys.length)
      expect(await editButtons()).toHaveLength(boys.length)
    })

    it('should search and filter boy by name and description', async () => {
      const search = await screen.findByTestId('search')

      userEvent.type(search, boys[0].name)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
      await screen.findByText(boys[0].name)

      userEvent.clear(search)
      await waitFor(async () =>
        expect(await cardContents()).toHaveLength(boys.length),
      )

      userEvent.type(search, boys[2].description)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
    })

    it('should handle delete', async () => {
      userEvent.click((await deleteButtons())[0])
      expect(handleDeleteBoy).toHaveBeenCalled()
    })

    it('should handle edit', async () => {
      userEvent.click((await editButtons())[0])
      await waitFor(() =>
        expect(window.location.pathname).toEqual(
          '/boys/edit-boy/' + boys[0].id,
        ),
      )
    })
  })
})
