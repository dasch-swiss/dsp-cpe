describe('My First Test', () => {
  it('Visits the home page', () => {
    cy.visit('/')
    cy.contains('Musikalisches Lexikon')
  })

  it('Visits the projects page', () => {
    cy.visit('/projects')
    cy.find('button').its('length').should('eq', 2)
  })
})
