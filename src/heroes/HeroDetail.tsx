import {useNavigate, useParams} from 'react-router-dom'
import InputDetail from '../components/InputDetail'
import {useState, ChangeEvent} from 'react'
import ButtonFooter from '../components/ButtonFooter'
import {FaUndo, FaRegSave} from 'react-icons/fa'
import {useHeroParams} from './useHeroParams'
import {createItem} from 'api/api'
import {useMutation, useQueryClient} from 'react-query'
import {Hero} from 'models/Hero'

export default function HeroDetail() {
  const {id} = useParams()
  const {name, description} = useHeroParams()
  const [hero, setHero] = useState({id, name, description})

  // why useMutation?
  // useParams and useQuery fetch state: UI state <- server/url , and caches it
  // useMutation is just the opposite: UI state -> server , and still caches it
  // yields data, status, error just like useQuery (10.4.2)
  // const { dataToMutate, status, error } = useMutation((url) => fetch(url) {.. non-idempotent (POST for example) ..})
  // the first arg is a function that that executes a non-idempotent request
  // the second arg is an object with onSuccess property
  const queryClient = useQueryClient()
  const {
    mutate: createHero,
    status,
    error,
  } = useMutation((item: Hero) => createItem('heroes', item), {
    onSuccess: newData => {
      //  use queryClient's setQueryData to set the cache
      // takes a key as the first arg, the 2nd arg is a cb that takes the old query cache and returns the new one
      // TODO: make the types better
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData('heroes', (oldData: any) => [
        ...(oldData || []),
        newData,
      ])

      // as an extra, we direct navigate to the new item
      return navigate(`/heroes`)
    },
  })

  const navigate = useNavigate()
  const handleCancel = () => navigate('/heroes')
  const updateHero = () => console.log('updateHero')
  const saveHero = (hero: Hero) => {
    createHero(hero)
  }
  const handleSave = () => {
    console.log('handleSave')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return name ? updateHero() : saveHero(hero)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({...hero, description: e.target.value})
  }

  if (error) {
    return <p>Error</p>
  }

  if (status === 'loading') {
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
