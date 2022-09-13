import HeroList from './HeroList'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import {heroes} from '../../db.json'

describe('HeroList', () => {
  const handleDeleteHero = jest.fn()
  it('no heroes should not display a list nor search bar', async () => {
    render(
      <BrowserRouter>
        <HeroList heroes={[]} handleDeleteHero={handleDeleteHero} />
      </BrowserRouter>,
    )

    expect(await screen.findByTestId('hero-list')).toBeInTheDocument()
    expect(screen.queryByTestId('hero-list-item')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument()
  })

  describe('with heroes in the list', () => {
    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <BrowserRouter>
          <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />
        </BrowserRouter>,
      )
    })
    it('should render the hero layout', async () => {
      expect(
        await screen.findByTestId(`hero-list-item-${heroes.length - 1}`),
      ).toBeInTheDocument()

      expect(await screen.findByText(heroes[0].name)).toBeInTheDocument()
      expect(await screen.findByText(heroes[0].description)).toBeInTheDocument()
      expect(await screen.findAllByTestId('card-content')).toHaveLength(
        heroes.length,
      )
      expect(await screen.findAllByTestId('delete-button')).toHaveLength(
        heroes.length,
      )
      expect(await screen.findAllByTestId('edit-button')).toHaveLength(
        heroes.length,
      )
    })

    it('should search and filter hero by name', async () => {
      const search = await screen.findByTestId('search')

      userEvent.type(search, heroes[0].name)
      await waitFor(async () =>
        expect(await screen.findAllByTestId('card-content')).toHaveLength(1),
      )
      await screen.findByText(heroes[0].name)

      userEvent.clear(search)
      await waitFor(async () =>
        expect(await screen.findAllByTestId('card-content')).toHaveLength(
          heroes.length,
        ),
      )
    })

    it('should handle delete', async () => {
      const deleteButtons = await screen.findAllByTestId('delete-button')
      userEvent.click(deleteButtons[0])
      expect(handleDeleteHero).toHaveBeenCalled()
    })

    it('should handle edit', async () => {
      const editButtons = await screen.findAllByTestId('edit-button')
      userEvent.click(editButtons[0])
      await waitFor(() =>
        expect(window.location.pathname).toEqual(
          '/heroes/edit-hero/' + heroes[0].id,
        ),
      )
    })
  })
})
