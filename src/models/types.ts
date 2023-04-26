import type {Hero} from './Hero'
import type {Villain} from './Villain'
import type {Boy} from './Boy'

export type HeroProperty = Hero['name'] | Hero['description'] | Hero['id']
export type VillainProperty =
  | Villain['name']
  | Villain['description']
  | Villain['id']

export type BoyProperty = Boy['name'] | Boy['description'] | Boy['id']
export type EntityRoute = 'heroes' | 'villains' | 'boys'
export type EntityType = 'hero' | 'villain' | 'boy'

/** Returns the corresponding route for the entity;
 *
 * `hero` -> `/heroes`, `villain` -> `/villains`, `boy` -> `/boys` */
export const entityRoute = (entityType: EntityType) =>
  entityType === 'hero'
    ? 'heroes'
    : entityType === 'villain'
    ? 'villains'
    : 'boys'

/* istanbul ignore file */
