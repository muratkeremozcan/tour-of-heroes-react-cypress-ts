import * as sum from './sum'
import * as sum2 from './sum2'

describe('Spy on / Stub modules', () => {
  it('should spy on a default export', () => {
    cy.spy(sum, 'default').as('sum')
    const result = sum.default(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(3)
  })
  it('should stub a default export', () => {
    cy.stub(sum, 'default').as('sum').returns(5)
    const result = sum.default(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(5)
  })
  it('should spy on an export', () => {
    cy.spy(sum2, 'sumFn').as('sum')
    sum2.sumFn(1, 2)
    const result = sum2.sumFn(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(3)
  })
  it('should stub an export', () => {
    cy.stub(sum2, 'sumFn').as('sum').returns(5)
    const result = sum2.sumFn(1, 2)
    cy.get('@sum').should('be.called')
    expect(result).to.equal(5)
  })
})
