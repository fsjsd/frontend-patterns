
beforeEach(() => {
  cy.visit('http://localhost:3000/frontend-patterns');
  cy.injectAxe();
})


describe('FTU', () => {
  it('Should not violate a11y rules', () => {
    cy.checkA11y();
  })
})