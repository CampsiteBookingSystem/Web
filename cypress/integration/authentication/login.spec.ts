export default describe('Authentication - Login', () => {
  beforeEach(() => {
    cy.server();

    cy.visit('/');

    cy.route('POST', '/1.0/auth/sign-in').as('login');
  });

  function emailFieldHasError(message?: string) {
    cy.get('.BS-Input--email').should('have.class', 'BS-Input--has-error');

    if (message) {
      cy.get('.BS-Input--email .BS-Input__error').contains(message);
    }
  }

  function passwordFieldHasError(message?: string) {
    cy.get('.BS-Input--password').should('have.class', 'BS-Input--has-error');

    if (message) {
      cy.get('.BS-Input--password .BS-Input__error').contains(message);
    }
  }

  it('Button should be disabled', () => {
    cy.get('.LoginForm__actions button[type="submit"]').should('have.class', 'BS-Button--disabled');
  });

  it('Button should be enabled if both fields are filled', () => {
    cy.get('.BS-Input__input[name="email"]').type('test@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');

    cy.get('.LoginForm__actions button[type="submit"]').should(
      'not.have.class',
      'BS-Button--disabled',
    );
  });

  it('Should show error on blur', () => {
    cy.get('.BS-Input__input[name="email"]')
      .click()
      .blur();

    emailFieldHasError('Please enter your email address.');

    cy.get('.BS-Input__input[name="password"]')
      .click()
      .blur();

    passwordFieldHasError('Please enter your password.');
  });

  it('Should call login API', () => {
    cy.get('.BS-Input__input[name="email"]').type('test-1@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login')
      .its('requestBody')
      .should('deep.eq', {
        uid: 'test-1@vulpee.com',
        password: 'password',
      });
  });

  it('Should error on invalid email', () => {
    cy.get('.BS-Input__input[name="email"]').type('email');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login')
      .its('status')
      .should('equal', 400);

    emailFieldHasError('Please enter a valid email.');
  });

  it('Should error on wrong email', () => {
    cy.get('.BS-Input__input[name="email"]').type('email@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login')
      .its('status')
      .should('equal', 400);

    emailFieldHasError("We couldn't find your Vulpee account.");
  });

  it('Should error on wrong password', () => {
    cy.get('.BS-Input__input[name="email"]').type('test-1@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('wrong-password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login')
      .its('status')
      .should('equal', 400);

    emailFieldHasError('');
    passwordFieldHasError('The email and password combination you entered is incorrect.');
  });

  it('Should sign in correctly', () => {
    cy.get('.BS-Input__input[name="email"]').type('test-1@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login')
      .its('status')
      .should('equal', 200)
      .then(() => {
        const localStorageToken = localStorage.getItem('token');
        expect(localStorageToken).to.not.equal(null);
      });

    cy.get('.Dashboard');
  });
});
