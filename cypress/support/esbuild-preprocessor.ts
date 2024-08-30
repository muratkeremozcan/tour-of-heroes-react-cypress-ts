import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import {polyfillNode} from 'esbuild-plugin-polyfill-node'

/**
 * The collection of tasks to use with `cy.task()`
 * @param on `on` is used to hook into various events Cypress emits
 */
export default function tasks(on: Cypress.PluginEvents): void {
  on(
    'file:preprocessor',
    createBundler({
      plugins: [polyfillNode()],
    }),
  )
}
