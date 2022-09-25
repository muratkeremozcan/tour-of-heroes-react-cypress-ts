import {Hero} from './Hero'
import {Villain} from './Villain'

export type HeroProperty = Hero['name'] | Hero['description'] | Hero['id']
export type VillainProperty =
  | Villain['name']
  | Villain['description']
  | Villain['id']

export type EntityRoute = 'heroes' | 'villains'

export type EntityType = 'hero' | 'villain'

/* istanbul ignore file */
