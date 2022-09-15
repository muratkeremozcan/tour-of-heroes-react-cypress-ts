import HeroList from './HeroList'
import {wrappedRender, screen, waitFor} from 'test-utils'
import userEvent from '@testing-library/user-event'
import {heroes} from '../../db.json'

describe('HeroList', () => {
  const handleDeleteHero = jest.fn()

  it('no heroes should not display a list nor search bar', async () => {
    wrappedRender(<HeroList heroes={[]} handleDeleteHero={handleDeleteHero} />)

    expect(await screen.findByTestId('hero-list')).toBeInTheDocument()
    expect(screen.queryByTestId('hero-list-item-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument()
  })

  describe('with heroes in the list', () => {
    beforeEach(() => {
      wrappedRender(
        <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />,
      )
    })

    const cardContents = async () => screen.findAllByTestId('card-content')
    const deleteButtons = async () => screen.findAllByTestId('delete-button')
    const editButtons = async () => screen.findAllByTestId('edit-button')

    it('should render the hero layout', async () => {
      expect(
        await screen.findByTestId(`hero-list-item-${heroes.length - 1}`),
      ).toBeInTheDocument()

      expect(await screen.findByText(heroes[0].name)).toBeInTheDocument()
      expect(await screen.findByText(heroes[0].description)).toBeInTheDocument()
      expect(await cardContents()).toHaveLength(heroes.length)
      expect(await deleteButtons()).toHaveLength(heroes.length)
      expect(await editButtons()).toHaveLength(heroes.length)
    })

    it('should search and filter hero by name and description', async () => {
      const search = await screen.findByTestId('search')

      userEvent.type(search, heroes[0].name)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
      await screen.findByText(heroes[0].name)

      userEvent.clear(search)
      await waitFor(async () =>
        expect(await cardContents()).toHaveLength(heroes.length),
      )

      userEvent.type(search, heroes[2].description)
      await waitFor(async () => expect(await cardContents()).toHaveLength(1))
    })

    it('should handle delete', async () => {
      userEvent.click((await deleteButtons())[0])
      expect(handleDeleteHero).toHaveBeenCalled()
    })

    it('should handle edit', async () => {
      userEvent.click((await editButtons())[0])
      await waitFor(() =>
        expect(window.location.pathname).toEqual(
          '/heroes/edit-hero/' + heroes[0].id,
        ),
      )
    })
  })
})
