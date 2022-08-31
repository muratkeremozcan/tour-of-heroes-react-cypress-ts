import {useNavigate} from 'react-router-dom'
import CardContent from '../components/CardContent'
import ButtonFooter from '../components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import type {Hero} from './HeroDetail'
type HeroListProps = {
  heroes: Hero[]
  handleDeleteHero: () => void // TODO: consider better type
}

export default function HeroList({heroes, handleDeleteHero}: HeroListProps) {
  const navigate = useNavigate()
  const handleSelectHero = (id: string) => {
    navigate(`/heroes/edit-hero/${id}`)
  }

  return (
    <ul data-cy="hero-list" className="list">
      {heroes.map((hero, index) => (
        <li data-cy={`hero-list-item-${index}`} key={hero.id}>
          <div className="card">
            <CardContent name={hero.name} description={hero.description} />
            <footer className="card-footer">
              <ButtonFooter
                label="Delete"
                IconClass={FaRegSave}
                onClick={handleDeleteHero}
              />
              <ButtonFooter
                label="Edit"
                IconClass={FaEdit}
                onClick={() => handleSelectHero(hero.id)}
              />
            </footer>
          </div>
        </li>
      ))}
    </ul>
  )
}
