it('should work', () => {
  cy.task('generateAccessToken').then(token => {
    cy.log(token as string)
  })
})
