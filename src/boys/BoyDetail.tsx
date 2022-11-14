import {useState, ChangeEvent} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import InputDetail from 'components/InputDetail'
import ButtonFooter from 'components/ButtonFooter'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import {useEntityParams} from 'hooks/useEntityParams'
import {usePostEntity} from 'hooks/usePostEntity'
import {Boy} from 'models/Boy'
import {usePutEntity} from 'hooks/usePutEntity'
import {partial, ifElse} from 'ramda'
import {isTruthy} from 'ramda-adjunct'

export default function BoyDetail() {
  const {id} = useParams()
  const {name, description} = useEntityParams()
  const [boy, setBoy] = useState({id, name, description})
  const {mutate: createBoy, status, error: postError} = usePostEntity('boy')
  const {
    updateEntity: updateBoy,
    isUpdating,
    isUpdateError,
  } = usePutEntity('boy')

  const navigate = useNavigate()

  const handleCancel = partial(navigate, ['/boys'])

  const handleSave = ifElse(
    () => isTruthy(name),
    () => updateBoy(boy as Boy),
    () => createBoy(boy as Boy),
  )

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBoy({...boy, name: e.target.value})

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBoy({...boy, description: e.target.value})

  if (status === 'loading' || isUpdating) {
    return <PageSpinner />
  }

  if (postError || isUpdateError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="boy-detail" className="card edit-detail">
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
