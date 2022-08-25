import InputDetail from '../components/InputDetail'
import {useState, ChangeEvent} from 'react'
import ButtonFooter from '../components/ButtonFooter'
import {FaUndo, FaRegSave} from 'react-icons/fa'

type Hero = {
  id: string
  name: string
  description: string
}
type HeroDetailProps = {
  hero: Hero
}

export default function HeroDetail({hero: initHero}: HeroDetailProps) {
  const [hero, setHero] = useState<Hero>({...initHero})

  const handleCancel = () => console.log('handleCancel')
  const updateHero = () => console.log('updateHero')
  const saveHero = () => console.log('saveHero')
  const handleSave = () => {
    console.log('handleSave')
    return hero.name ? updateHero() : saveHero()
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleNameChange')
    setHero({...hero, name: e.target.value})
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleDescriptionChange')
    setHero({...hero, description: e.target.value})
  }

  return (
    <div data-cy="hero-detail" className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">{hero.name}</p>
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
            value={hero.name}
            placeholder="e.g. Colleen"
            onChange={handleNameChange}
          ></InputDetail>
          <InputDetail
            name={'description'}
            value={hero.description}
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
