import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import {useQuery} from 'react-query'
import ListHeader from '../components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import HeroList from './HeroList'
import HeroDetail from './HeroDetail'
import {getItem} from '../api/api'
import useAxios from 'api/useAxios'

export default function Heroes() {
  const [showModal, setShowModal] = useState<boolean>(false)

  // increase the json-server timeout to see a bigger difference
  // useQuery is similar to our custom useAxios: takes a url, returns an object of data, status & error
  // the key arg is a unique identifier for the query / data in cache; string, array or object
  // the 2nd arg an async function that returns the data
  // const { data, status, error } = useQuery(key, () => fetch(url))
  // Whenever any component subsequently calls useQuery with the key,
  // React Query will return the previously fetched  data from its cache
  // and then fetch the latest data in the background (very similar to PWAs and service workers)
  const {data: heroes = [], status} = useQuery('heroes', () =>
    getItem('heroes'),
  )
  // TRY: toggle useAxios ve useQuery to see the performance difference
  // const {data: heroes = [], status} = useAxios('heroes')

  console.log('heroes are ', heroes)

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
