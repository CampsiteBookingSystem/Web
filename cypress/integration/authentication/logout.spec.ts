export = describe('Authentication - Logout', () => {
  beforeEach(() => {
    cy.server();

    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.route('POST', '/1.0/auth/logout').as('logout');
  });

  it('Should logout on click on button in header', () => {
    cy.get('.Header__logout').click();

    cy.wait('@logout');
  });

  it('Should redirect to login page after logout', () => {
    cy.get('.Dashboard');

    cy.get('.Header__logout').click();

    cy.wait('@logout');

    cy.get('.LoginForm');
  });

  it('Should remove token from localStorage after logout', () => {
    cy.get('.Header__logout').click();

    cy.wait('@logout').then(() => {
      expect(localStorage.getItem('token')).to.equal('null');
    });
  });
});
