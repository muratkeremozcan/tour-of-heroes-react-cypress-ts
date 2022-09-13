import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from 'components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import HeroList from './HeroList'
import HeroDetail from './HeroDetail'
import {useGetHeroes} from 'hooks/useGetHeroes'
import {useDeleteHero} from 'hooks/useDeleteHero'
import {Hero} from 'models/Hero'

export default function Heroes() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {heroes, status, getError} = useGetHeroes()
  const [heroToDelete, setHeroToDelete] = useState<Hero | null>(null)
  const {deleteHero, isDeleteError} = useDeleteHero()

  const navigate = useNavigate()
  const addNewHero = () => navigate('/heroes/add-hero')
  const handleRefresh = () => navigate('/heroes')

  const handleCloseModal = () => {
    setHeroToDelete(null)
    setShowModal(false)
  }
  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleDeleteHero = (hero: Hero) => () => {
    setHeroToDelete(hero)
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    heroToDelete ? deleteHero(heroToDelete) : null
    setShowModal(false)
  }

  if (status === 'loading') {
    return <PageSpinner />
  }

  if (getError || isDeleteError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="heroes">
      <ListHeader
        title="Heroes"
        handleAdd={addNewHero}
        handleRefresh={handleRefresh}
      />
      <div>
        <div>
          <Routes>
            <Route
              path=""
              element={
                <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />
              }
            />
            <Route path="/add-hero" element={<HeroDetail />} />
            <Route path="/edit-hero/:id" element={<HeroDetail />} />
            <Route
              path="*"
              element={
                <HeroList heroes={heroes} handleDeleteHero={handleDeleteHero} />
              }
            />
          </Routes>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message="Would you like to delete the hero?"
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  )
}
