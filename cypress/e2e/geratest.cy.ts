describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('.btn').click()
    cy.get(':nth-child(1) > .alert')
    cy.get('h2')
    cy.should('not.be.empty')
    cy.get(':nth-child(1) > .btn').invoke('text').should('match', /\d+/);
  cy.get(':nth-child(2) > .btn') .invoke('text').should('match', /\d+/);
  cy.get(':nth-child(3) > .btn').invoke('text').should('match', /\d+/);
  cy.get(':nth-child(4) > .btn').invoke('text').should('match', /\d+/);
  cy.get(':nth-child(1) > .alert').should('not.be.empty')
  cy.get(':nth-child(1) > .alert').should('not.be.empty') 
  cy.get(':nth-child(2) > .alert').should('not.be.empty')  
  cy.get(':nth-child(3) > .alert').should('not.be.empty')
  cy.get(':nth-child(4) > .alert').should('not.be.empty') 

  })
})