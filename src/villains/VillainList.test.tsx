import VillainList from './VillainList'
import {wrappedRender, screen, waitFor} from 'test-utils'
import userEvent from '@testing-library/user-event'
import {villains} from '../../db.json'
import VillainsContext from 'hooks/useVillainsContext'

describe('VillainList', () => {
  const handleDeleteVillain = jest.fn()

  it('no villains should not display a list nor search bar', async () => {
    wrappedRender(<VillainList handleDeleteVillain={handleDeleteVillain} />)

    expect(await screen.findByTestId('villain-list')).toBeInTheDocument()
    expect(screen.queryByTestId('villain-list-item-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument()
  })

  describe('with villains in the list', () => {
    beforeEach(() => {
      wrappedRender(
        <VillainsContext.Provider value={villains}>
          <VillainList handleDeleteVillain={handleDeleteVillain} />
        </VillainsContext.Provider>,
      )
    })

    const cardContents = async () => screen.findAllByTestId('card-content')
    const deleteButtons = async () => screen.findAllByTestId('delete-button')
    const editButtons = async () => screen.findAllByTestId('edit-button')

    it('should render the villain layout', async () => {
      expect(
        await screen.findByTestId(`villain-list-item-${villains.length - 1}`),
      ).toBeInTheDocument()

      expect(await screen.findByText(villains[0].name)).toBeInTheDocument()
      expect(
        await screen.findByText(villains[0].description),
      ).toBeInTheDocument()
      expect(await cardContents()).toHaveLength(villains.length)
      expect(await deleteButtons()).toHaveLength(villains.length)
      expect(await editButtons()).toHaveLength(villains.length)
    })

    it('should search and filter villain by name and description', async () => {
      const search = await screen.findByTestId('search')

      userEvent.type(search, villains[0].name)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
      await screen.findByText(villains[0].name)

      userEvent.clear(search)
      await waitFor(async () =>
        expect(await cardContents()).toHaveLength(villains.length),
      )

      userEvent.type(search, villains[2].description)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
    })

    it('should handle delete', async () => {
      userEvent.click((await deleteButtons())[0])
      expect(handleDeleteVillain).toHaveBeenCalled()
    })

    it('should handle edit', async () => {
      userEvent.click((await editButtons())[0])
      await waitFor(() =>
        expect(window.location.pathname).toEqual(
          '/villains/edit-villain/' + villains[0].id,
        ),
      )
    })
  })
})
