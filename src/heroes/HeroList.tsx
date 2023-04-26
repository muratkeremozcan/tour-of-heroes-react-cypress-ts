import {useNavigate} from 'react-router-dom'
import CardContent from 'components/CardContent'
import ButtonFooter from 'components/ButtonFooter'
import {FaEdit, FaRegSave} from 'react-icons/fa'
import type {ChangeEvent, MouseEvent} from 'react'
import {useTransition, useEffect, useState, useDeferredValue} from 'react'
import type {Hero} from 'models/Hero'
import type {HeroProperty} from 'models/types'
import {curry} from 'ramda'

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
  // const handleSelectHero = (heroId: string) => () => {
  //   const hero = deferredHeroes.find((h: Hero) => h.id === heroId)
  //   navigate(
  //     `/heroes/edit-hero/${hero?.id}?name=${hero?.name}&description=${hero?.description}`,
  //   )
  // }
  // we can use Ramda curry instead, we have to pass the unused event argument though
  const handleSelectHero = curry(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (heroId: string, e: MouseEvent<HTMLButtonElement>) => {
      const hero = deferredHeroes.find((h: Hero) => h.id === heroId)
      navigate(
        `/heroes/edit-hero/${hero?.id}?name=${hero?.name}&description=${hero?.description}`,
      )
    },
  )

  /** returns a boolean whether the hero properties exist in the search field */
  const searchExists = (searchProperty: HeroProperty, searchField: string) =>
    String(searchProperty).toLowerCase().indexOf(searchField.toLowerCase()) !==
    -1

  /** given the data and the search field, returns the data in which the search field exists */
  const searchProperties = (searchField: string, data: Hero[]) =>
    [...data].filter((item: Hero) =>
      Object.values(item).find((property: HeroProperty) =>
        searchExists(property, searchField),
      ),
    )

  /** filters the heroes data to see if the any of the properties exist in the list */
  const handleSearch =
    (data: Hero[]) => (event: ChangeEvent<HTMLInputElement>) => {
      const searchField = event.target.value

      return startTransition(() =>
        setFilteredHeroes(searchProperties(searchField, data)),
      )
    }

  return (
    <div
      style={{
        opacity: isPending ? 0.5 : 1,
        color: isStale ? 'dimgray' : 'black',
      }}
    >
      {deferredHeroes.length > 0 && (
        <div className="card-content">
          <span>Search </span>
          <input data-cy="search" onChange={handleSearch(deferredHeroes)} />
        </div>
      )}
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
