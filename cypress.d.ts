/* eslint-disable @typescript-eslint/no-explicit-any */
import {MountOptions, MountReturn} from 'cypress/react'
import type {Hero} from './cypress/support/commands'

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Yields the element that partially matches the css class
       * ```
       * cy.getByClassLike('StyledIconBase') // where the class is class="StyledIconBase-ea9ulj-0 lbJwfL"
       * ```
       */
      getByClassLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts the component wrapped by all the providers:
       * QueryClientProvider, ErrorBoundary, Suspense, BrowserRouter
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      wrappedMount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Visits baseUrl, uses real network, verifies path */
      visitHeroes(): Cypress.Chainable<string>

      /** Visits villains route, uses real network, verifies path */
      visitVillains(): Cypress.Chainable<string>

      /** Visits baseUrl, uses stubbed network, verifies path */
      visitStubbedHeroes(): Cypress.Chainable<string>

      /** Visits villains route, uses stubbed network, verifies path */
      visitStubbedVillains(): Cypress.Chainable<string>

      /**
       * Gets an entity by name.
       * ```js
       * cy.getEntityByName(newHero.name).then(myHero => ...)
       * ```
       * @param name: Hero['name']
       */
      getHeroByProperty(
        property: Hero['name'] | Hero['description'] | Hero['id'],
      ): Cypress.Chainable<Hero>

      getVillainByProperty(
        property: Villain['name'] | Villain['description'] | Villain['id'],
      ): Cypress.Chainable<Villain>

      /**
       * Given a hero property (name, description or id),
       * returns the index of the hero, and the entire collection, as an object.
       */
      findHeroIndex(
        property: Hero['name'] | Hero['description'] | Hero['id'],
      ): Cypress.Chainable<{heroIndex: number; heroesArray: Hero[]}>

      /**
       * Given a villain property (name, description or id),
       * returns the index of the villain, and the entire collection, as an object.
       */
      findVillainIndex(
        property: Villain['name'] | Villain['description'] | Villain['id'],
      ): Cypress.Chainable<{villainIndex: number; villainsArray: Villain[]}>

      /**
       * Performs crud operations GET, POST, PUT and DELETE.
       *
       * `body` and `allowedToFail are optional.
       *
       * If they are not passed in, body is empty but `allowedToFail` still is `false`.
       *
       * If the body is passed in and the method is `POST` or `PUT`, the payload will be taken,
       * otherwise undefined for `GET` and `DELETE`.
       * @param method
       * @param route
       * @param options: {body?: Hero | object; allowedToFail?: boolean}
       */
      crud(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        route: string,
        {
          body,
          allowedToFail = false,
        }: {body?: Hero | object; allowedToFail?: boolean} = {},
      ): Cypress.Chainable<Response<Hero[] & Hero>>

      /**
       * Resets the data in the database to the initial data.
       */
      resetData(): Cypress.Chainable<Response<Hero[] & Hero>>
    }
  }
}
