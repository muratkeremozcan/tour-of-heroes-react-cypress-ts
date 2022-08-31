import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from '../components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import HeroList from './HeroList'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import HeroDetail, {Hero} from './HeroDetail'
import useAxios from './useAxios'

export default function Heroes() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {id} = useParams<Hero>()
  const {data: heroes = [], status} = useAxios(
    'http://localhost:4000/api/heroes',
  )

  console.log('heroes are ', heroes)
  const hero = heroes.find((h: Hero) => h.id === id)

  const navigate = useNavigate()
  const addNewHero = () => navigate('/heroes/add-hero')
  const handleRefresh = () => navigate('/heroes')

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const handleDeleteHero = () => {
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    setShowModal(false)
    console.log('handleDeleteFromModal')
  }

  if (status === 'error') {
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
            <Route path="/edit-hero/:id" element={<HeroDetail hero={hero} />} />
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
