describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit('');
  });

  it("Login form is shown", function () {
    cy.get('h2').contains('Log in to application');

    cy.get('form.login-form').within(() => {
      cy.get('input[name="Username"]').should('be.visible');
      cy.get('input[name="Password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  });
});