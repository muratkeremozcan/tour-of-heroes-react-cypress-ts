import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {MouseEvent} from 'react'
import {Hero} from 'models/Hero'

type HeroListProps = {
  heroes: Hero[]
  handleDeleteHero: (hero: Hero) => (e: MouseEvent<HTMLButtonElement>) => void
}

export default function HeroList({heroes, handleDeleteHero}: HeroListProps) {
  const navigate = useNavigate()
  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleSelectHero = (id: string) => () => {
    const hero = heroes.find((h: Hero) => h.id === id)
    navigate(
      `/heroes/edit-hero/${id}?name=${hero?.name}&description=${hero?.description}`,
    )
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
                onClick={handleDeleteHero(hero)}
              />
              <ButtonFooter
                label="Edit"
                IconClass={FaEdit}
                onClick={handleSelectHero(hero.id)}
              />
            </footer>
          </div>
        </li>
      ))}
    </ul>
  )
}
