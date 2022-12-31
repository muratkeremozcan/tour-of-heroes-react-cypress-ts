// an example task that logs to the CLI console
// cy.task('log', 'e2e sanity passed')

const log = (x: string) => {
  console.log(x)

  return null
}

export default log
