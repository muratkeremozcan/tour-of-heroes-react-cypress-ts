import {useState} from 'react'
import {useNavigate, Routes, Route} from 'react-router-dom'
import ListHeader from 'components/ListHeader'
import ModalYesNo from 'components/ModalYesNo'
import ErrorComp from 'components/ErrorComp'
import VillainList from './VillainList'
import VillainDetail from './VillainDetail'
import {useGetEntities} from 'hooks/useGetEntities'
import {useDeleteEntity} from 'hooks/useDeleteEntity'
import {Villain} from 'models/Villain'
import VillainsContext from 'hooks/useVillainsContext'

export default function Villains() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {entities: villains, getError} = useGetEntities('villains')
  const [villainToDelete, setVillainToDelete] = useState<Villain | null>(null)
  const {deleteEntity: deleteVillain, isDeleteError} =
    useDeleteEntity('villain')

  const navigate = useNavigate()
  const addNewVillain = () => navigate('/villains/add-villain')
  const handleRefresh = () => navigate('/villains')

  const handleCloseModal = () => {
    setVillainToDelete(null)
    setShowModal(false)
  }
  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleDeleteVillain = (villain: Villain) => () => {
    setVillainToDelete(villain)
    setShowModal(true)
  }
  const handleDeleteFromModal = () => {
    villainToDelete ? deleteVillain(villainToDelete) : null
    setShowModal(false)
  }

  if (getError || isDeleteError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="villains">
      <ListHeader
        title="Villains"
        handleAdd={addNewVillain}
        handleRefresh={handleRefresh}
      />
      <div>
        <div>
          <VillainsContext.Provider value={villains}>
            <Routes>
              <Route
                path=""
                element={
                  <VillainList handleDeleteVillain={handleDeleteVillain} />
                }
              />
              <Route path="/add-villain" element={<VillainDetail />} />
              <Route path="/edit-villain/:id" element={<VillainDetail />} />
              <Route
                path="*"
                element={
                  <VillainList handleDeleteVillain={handleDeleteVillain} />
                }
              />
            </Routes>
          </VillainsContext.Provider>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message="Would you like to delete the villain?"
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  )
}
