describe('Dashboard', () => {
  beforeEach(() => {
    cy.server();

    cy.route('POST', '/1.0/auth/verify').as('verify');
    cy.route('GET', '/1.0/user/me').as('user');
    cy.route('GET', '/1.0/establishment').as('establishments');
  });

  it('Dashboard should be visible', () => {
    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.get('.Dashboard');
  });

  it('Should verify token', () => {
    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.wait('@verify').then(xhr => {
      expect(xhr.status).to.equal(204);
    });
  });

  it('Should logout on wrong token', () => {
    localStorage.setItem('token', 'wrong-token');
    cy.visit('/');

    cy.wait('@verify').then(xhr => {
      expect(xhr.status).to.equal(401);
    });

    cy.get('.LoginForm');
  });

  it('Should fetch data', () => {
    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.wait('@user').then(xhr => {
      expect(xhr.status).to.equal(200);
    });

    cy.wait('@establishments').then(xhr => {
      expect(xhr.status).to.equal(200);
    });
  });

  it('Should have 3 establishments', () => {
    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.wait('@establishments');

    cy.get('.Establishments__item').should('have.length', 3);
  });

  it('Should redirect to establishment', () => {
    cy.login('test-2@vulpee.com', 'password');
    cy.visit('/');

    cy.wait('@establishments');

    cy.url().should('include', '/demo-establishment-1');
  });

  it('Should show user name in header', () => {
    cy.login('test-1@vulpee.com', 'password');
    cy.visit('/');

    cy.wait('@user');

    cy.get('.Header__user').contains('John Doe');
  });
});
