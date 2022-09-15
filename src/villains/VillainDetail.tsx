import {useState, ChangeEvent} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import InputDetail from 'components/InputDetail'
import ButtonFooter from 'components/ButtonFooter'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import {useEntityParams} from 'hooks/useEntityParams'
import {usePostVillain} from 'hooks/usePostVillain'
import {Villain} from 'models/Villain'
import {usePutVillain} from 'hooks/usePutVillain'

export default function VillainDetail() {
  const {id} = useParams()
  const {name, description} = useEntityParams()
  const [villain, setVillain] = useState({id, name, description})
  const {mutate: createVillain, status, error: postError} = usePostVillain()
  const {updateVillain, isUpdating, isUpdateError} = usePutVillain()

  const navigate = useNavigate()
  const handleCancel = () => navigate('/villains')
  const handleSave = () =>
    name ? updateVillain(villain as Villain) : createVillain(villain as Villain)
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVillain({...villain, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVillain({...villain, description: e.target.value})
  }

  if (status === 'loading' || isUpdating) {
    return <PageSpinner />
  }

  if (postError || isUpdateError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="villain-detail" className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
        &nbsp;
      </header>
      <div className="card-content">
        <div className="content">
          {id && (
            <InputDetail name={'id'} value={id} readOnly={true}></InputDetail>
          )}
          <InputDetail
            name={'name'}
            value={name ? name : ''}
            placeholder="e.g. Colleen"
            onChange={handleNameChange}
          ></InputDetail>
          <InputDetail
            name={'description'}
            value={description ? description : ''}
            placeholder="e.g. dance fight!"
            onChange={handleDescriptionChange}
          ></InputDetail>
        </div>
      </div>
      <footer className="card-footer">
        <ButtonFooter
          label="Cancel"
          IconClass={FaUndo}
          onClick={handleCancel}
        />
        <ButtonFooter label="Save" IconClass={FaRegSave} onClick={handleSave} />
      </footer>
    </div>
  )
}
