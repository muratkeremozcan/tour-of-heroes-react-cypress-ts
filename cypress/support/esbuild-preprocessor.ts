import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

/**
 * The collection of tasks to use with `cy.task()`
 * @param on `on` is used to hook into various events Cypress emits
 */
export default function tasks(on: Cypress.PluginEvents) {
  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    }),
  )
  // add tasks here
}
