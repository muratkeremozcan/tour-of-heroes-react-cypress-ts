import log from './log'
import generateAccessToken from './generateAccessToken'

/**
 * The collection of tasks to use with `cy.task()`
 * @param on `on` is used to hook into various events Cypress emits
 */
export default function tasks(on: Cypress.PluginEvents) {
  on('task', {log})

  // add tasks here
  on('task', {generateAccessToken})
}
