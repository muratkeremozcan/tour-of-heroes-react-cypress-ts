import {useNavigate, useParams} from 'react-router-dom'
import InputDetail from 'components/InputDetail'
import {useState, ChangeEvent} from 'react'
import ButtonFooter from 'components/ButtonFooter'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import {useHeroParams} from 'hooks/useHeroParams'
import {usePostHero} from 'hooks/usePostHero'
import {useEditHero} from 'hooks/useEditHero'

export default function HeroDetail() {
  const {id} = useParams()
  const {name, description} = useHeroParams()
  const [hero, setHero] = useState({id, name, description})
  const {mutate: createHero, status, error: postError} = usePostHero()
  const {updateHero, isUpdating, isUpdateError} = useEditHero()

  const navigate = useNavigate()
  const handleCancel = () => navigate('/heroes')
  const handleSave = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return name ? updateHero(hero) : createHero(hero)
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, description: e.target.value})
  }

  if (postError || isUpdateError) {
    return <p data-cy="error">there was an error</p>
  }

  if (status === 'loading' || isUpdating) {
    return <div>Loading...</div>
  }

  return (
    <div data-cy="hero-detail" className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
        &nbsp;
      </header>
      <div className="card-content">
        <div className="content">
          {hero.id && (
            <InputDetail
              name={'id'}
              value={hero.id}
              readOnly={true}
            ></InputDetail>
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
