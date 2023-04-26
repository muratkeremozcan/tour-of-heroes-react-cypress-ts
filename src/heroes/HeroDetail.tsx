import type {ChangeEvent} from 'react'
import {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import InputDetail from 'components/InputDetail'
import ButtonFooter from 'components/ButtonFooter'
import PageSpinner from 'components/PageSpinner'
import ErrorComp from 'components/ErrorComp'
import {useEntityParams} from 'hooks/useEntityParams'
import {usePostEntity} from 'hooks/usePostEntity'
import type {Hero} from 'models/Hero'
import {usePutEntity} from 'hooks/usePutEntity'

export default function HeroDetail() {
  const {id} = useParams()
  const {name, description} = useEntityParams()
  const [hero, setHero] = useState({id, name, description})
  const {mutate: createHero, status, error: postError} = usePostEntity('hero')
  const {
    updateEntity: updateHero,
    isUpdating,
    isUpdateError,
  } = usePutEntity('hero')

  const navigate = useNavigate()
  const handleCancel = () => navigate('/heroes')
  const handleSave = () =>
    name ? updateHero(hero as Hero) : createHero(hero as Hero)
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, description: e.target.value})
  }

  if (status === 'loading' || isUpdating) {
    return <PageSpinner />
  }

  if (postError || isUpdateError) {
    return <ErrorComp />
  }

  return (
    <div data-cy="hero-detail" className="card edit-detail">
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
