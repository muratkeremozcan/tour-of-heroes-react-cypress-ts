import {Hero} from './Hero'
import {Villain} from './Villain'
import {Boy} from './Boy'

export type HeroProperty = Hero['name'] | Hero['description'] | Hero['id']
export type VillainProperty =
  | Villain['name']
  | Villain['description']
  | Villain['id']

export type BoyProperty = Boy['name'] | Boy['description'] | Boy['id']
export type EntityRoute = 'heroes' | 'villains' | 'theboys'
export type EntityType = 'hero' | 'villain' | 'boy'

/** Returns the corresponding route for the entity;
 *
 * `hero` -> `/heroes`, `villain` -> `/villains`, `boy` -> `/theboys` */
export const entityRoute = (entityType: EntityType) =>
  entityType === 'hero'
    ? 'heroes'
    : entityType === 'villain'
    ? 'villains'
    : 'theboys'

/* istanbul ignore file */
