import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {
  ChangeEvent,
  MouseEvent,
  useTransition,
  useEffect,
  useState,
  useDeferredValue,
} from 'react'
import {Hero} from 'models/Hero'

type HeroListProps = {
  heroes: Hero[]
  handleDeleteHero: (hero: Hero) => (e: MouseEvent<HTMLButtonElement>) => void
}

export default function HeroList({heroes, handleDeleteHero}: HeroListProps) {
  const deferredHeroes = useDeferredValue(heroes)
  const isStale = deferredHeroes !== heroes
  const [filteredHeroes, setFilteredHeroes] = useState(deferredHeroes)
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  // needed to refresh the list after deleting a hero
  useEffect(() => setFilteredHeroes(deferredHeroes), [deferredHeroes])

  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleSelectHero = (heroId: string) => () => {
    const hero = deferredHeroes.find((h: Hero) => h.id === heroId)
    navigate(
      `/heroes/edit-hero/${hero?.id}?name=${hero?.name}&description=${hero?.description}`,
    )
  }

  /** returns a boolean whether the hero properties exist in the search field */
  const searchExists = (
    searchField: string,
    searchProperty: Hero['name'] | Hero['description'],
  ) => searchProperty.toLowerCase().indexOf(searchField.toLowerCase()) !== -1

  /** filters the heroes data to see if the name or the description exists in the list */
  const handleSearch =
    (data: Hero[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchField = event.target.value

      return startTransition(() =>
        setFilteredHeroes(
          [...data].filter(
            ({name, description}: Hero) =>
              searchExists(searchField, name) ||
              searchExists(searchField, description),
          ),
        ),
      )
    }

  return (
    <div
      style={{
        opacity: isPending ? 0.5 : 1,
        color: isStale ? 'dimgray' : 'black',
      }}
    >
      <div className="card-content">
        <span>Search </span>
        <input data-cy="search" onChange={handleSearch(deferredHeroes)} />
      </div>
      &nbsp;
      <ul data-cy="hero-list" className="list">
        {filteredHeroes.map((hero, index) => (
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
    </div>
  )
}
