describe('Authentication - Navigation', () => {
  it('Defaults to the login page', () => {
    cy.visit('/');

    cy.get('.LoginForm');
  });

  it('Should go to forgot password page', () => {
    cy.visit('/forgot-password');

    cy.get('.ForgotPasswordForm');
  });

  it('Should navigate to forgot password page', () => {
    cy.visit('/');

    cy.get('.Authentication__link').click();

    cy.url().should('include', '/forgot-password');
    cy.get('.ForgotPasswordForm');
  });
});
