import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import {
  MouseEvent,
  ChangeEvent,
  useState,
  useTransition,
  useDeferredValue,
  useEffect,
} from 'react'
import {Hero} from 'models/Hero'

type HeroListProps = {
  heroes: Hero[]
  handleDeleteHero: (hero: Hero) => (e: MouseEvent<HTMLButtonElement>) => void
}

export default function HeroList({heroes, handleDeleteHero}: HeroListProps) {
  const deferredHeroes = useDeferredValue(heroes)
  const isStale = deferredHeroes !== heroes
  const [filteredList, setFilteredList] = useState(deferredHeroes)
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  // needed to refresh the list after deleting a hero
  useEffect(() => setFilteredList(deferredHeroes), [deferredHeroes])

  // currying: the outer fn takes our custom arg and returns a fn that takes the event
  const handleSelectHero = (heroId: string) => () => {
    const hero = heroes.find((h: Hero) => h.id === heroId)
    navigate(
      `/heroes/edit-hero/${hero?.id}?name=${hero?.name}&description=${hero?.description}`,
    )
  }

  /** returns a boolean whether the search phrase exists in the search string */
  const queryExists = (searchString: string, searchPhrase: string) =>
    searchPhrase.toLowerCase().indexOf(searchString.toLowerCase()) !== -1

  /** filters the heroes data to see if the name or the description exists in the list */
  const handleSearch =
    (data: Hero[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchPhrase = event.target.value
      return startTransition(() =>
        setFilteredList(
          [...data].filter(
            ({name, description}: Hero) =>
              queryExists(searchPhrase, name) ||
              queryExists(searchPhrase, description),
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
        <input data-cy="search" onChange={handleSearch(heroes)} />
      </div>
      &nbsp;
      <ul data-cy="hero-list" className="list">
        {filteredList.map((hero, index) => (
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
