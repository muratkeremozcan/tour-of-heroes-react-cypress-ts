import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from 'components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import ErrorComp from 'components/ErrorComp'
import BoyList from './BoyList'
import BoyDetail from './BoyDetail'
import {useGetEntities} from 'hooks/useGetEntities'
import {useDeleteEntity} from 'hooks/useDeleteEntity'
import type {Boy} from 'models/Boy'
import {partial, pipe} from 'ramda'

export default function Boys() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {entities: boys, getError} = useGetEntities('boys')
  const [boyToDelete, setBoyToDelete] = useState<Boy | null>(null)
  const {deleteEntity: deleteBoy, isDeleteError} = useDeleteEntity('boy')

  const navigate = useNavigate()
  const addNewBoy = partial(navigate, ['/boys/add-boy'])
  const handleRefresh = partial(navigate, ['/boys'])

  const handleCloseModal = pipe(
    partial(setBoyToDelete, [null]),
    partial(setShowModal, [false]),
  )

  const handleDeleteBoy = (boy: Boy) =>
    pipe(partial(setBoyToDelete, [boy]), partial(setShowModal, [true]))

  const handleDeleteFromModal = pipe(
    () => (boyToDelete ? deleteBoy(boyToDelete) : null),
    partial(setShowModal, [false]),
  )

  if (getError || isDeleteError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="boys">
      <ListHeader
        title="Boys"
        handleAdd={addNewBoy}
        handleRefresh={handleRefresh}
      />
      <div>
        <div>
          <Routes>
            <Route
              path=""
              element={
                <BoyList boys={boys} handleDeleteBoy={handleDeleteBoy} />
              }
            />
            <Route path="/add-boy" element={<BoyDetail />} />
            <Route path="/edit-boy/:id" element={<BoyDetail />} />
            <Route
              path="*"
              element={
                <BoyList boys={boys} handleDeleteBoy={handleDeleteBoy} />
              }
            />
          </Routes>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message="Would you like to delete the boy?"
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  )
}
