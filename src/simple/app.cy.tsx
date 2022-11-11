import App from './app'
import * as sum from './sum'

it('Should mock a function being used in a component', () => {
  cy.stub(sum, 'default').as('sum').returns(5)
  cy.mount(<App />)
  cy.contains('sum is 5')
})
