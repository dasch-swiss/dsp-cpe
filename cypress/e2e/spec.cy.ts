describe('Test Navigation', () => {
  it('should visit the home page', () => {
    cy.visit('/')
    cy.contains('Musikalisches Lexikon')
  })

  it('should visit the projects list', () => {
    cy.visit('/projects')
    cy.get('.project-buttons').find('cpe-button').its('length').should('eq', 2)
  })

  it('should navigate to a project', () => {
    cy.visit('/projects')
    cy.get('.project-buttons').find('cpe-button').first().click()
    cy.contains('This is the first project')
  })
})
