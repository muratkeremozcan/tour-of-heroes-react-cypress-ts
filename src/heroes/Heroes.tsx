import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from '../components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import HeroList from './HeroList'
import HeroDetail from './HeroDetail'
import {useGetHeroes} from '../hooks/useGetHeroes'
import {useDeleteHero} from 'hooks/useDeleteHero'
import {Hero} from 'models/Hero'

export default function Heroes() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [heroToDelete, setHeroToDelete] = useState<Hero | null>(null)
  const {data: heroes = [], status, error: getError} = useGetHeroes()
  // TRY: toggle useAxios ve useQuery to see the performance difference
  // const {data: heroes = [], status} = useAxios('heroes')
  const {deleteHero, isDeleteError} = useDeleteHero()

  const navigate = useNavigate()
  const addNewHero = () => navigate('/heroes/add-hero')
  const handleRefresh = () => navigate('/heroes')

  const handleCloseModal = () => {
    setHeroToDelete(null)
    setShowModal(false)
  }
  const handleDeleteHero = (hero: Hero) => {
    setHeroToDelete(hero)
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    deleteHero(heroToDelete!)
    setShowModal(false)
  }

  if (getError || isDeleteError) {
    return <p data-cy="error">there was an error</p>
  }

  if (status === 'loading') {
    return <div>loading...</div>
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
