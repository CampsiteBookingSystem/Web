describe('Authentication - Login', () => {
  beforeEach(() => {
    cy.server();

    cy.visit('/');

    cy.route('POST', 'http://api.vulpee.local/1.0/auth/sign-in').as('login');
  });

  function emailFieldHasError() {
    cy.get('.BS-Input__input[name="email"]')
      .parent()
      .parent()
      .should('have.class', 'BS-Input--has-error');
  }

  function passwordFieldHasError() {
    cy.get('.BS-Input__input[name="password"]')
      .parent()
      .parent()
      .should('have.class', 'BS-Input--has-error');
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

    emailFieldHasError();

    cy.get('.BS-Input__input[name="password"]')
      .click()
      .blur();

    passwordFieldHasError();
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

    cy.wait('@login').then(xhr => {
      expect(xhr.status).to.equal(400);

      xhr.response.body.text().then(data => {
        const json = JSON.parse(data);

        expect(json).to.have.property('error');

        expect(json.error)
          .to.have.property('field')
          .that.equals('uid');

        expect(json.error)
          .to.have.property('validation')
          .that.equals('email');
      });
    });

    emailFieldHasError();
  });

  it('Should error on wrong email', () => {
    cy.get('.BS-Input__input[name="email"]').type('email@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login').then(xhr => {
      expect(xhr.status).to.equal(400);

      xhr.response.body.text().then(data => {
        const json = JSON.parse(data);

        expect(json).to.have.property('error');

        expect(json.error)
          .to.have.property('field')
          .that.equals('uid');

        expect(json.error)
          .to.have.property('validation')
          .that.equals('exists');
      });
    });

    emailFieldHasError();
  });

  it('Should error on wrong password', () => {
    cy.get('.BS-Input__input[name="email"]').type('test-1@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('wrong-password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login').then(xhr => {
      expect(xhr.status).to.equal(400);

      xhr.response.body.text().then(data => {
        const json = JSON.parse(data);

        expect(json).to.have.property('error');

        expect(json.error)
          .to.have.property('field')
          .that.equals('password');

        expect(json.error)
          .to.have.property('validation')
          .that.equals('mis_match');
      });
    });

    emailFieldHasError();
    passwordFieldHasError();
  });

  it('Should sign in correctly', () => {
    cy.get('.BS-Input__input[name="email"]').type('test-1@vulpee.com');
    cy.get('.BS-Input__input[name="password"]').type('password');
    cy.get('.LoginForm__actions button[type="submit"]').click();

    cy.wait('@login').then(xhr => {
      expect(xhr.status).to.equal(200);

      xhr.response.body.text().then(data => {
        const json = JSON.parse(data);

        expect(json).to.have.property('token');

        const localStorageToken = localStorage.getItem('token') || '';

        expect(JSON.parse(localStorageToken)).to.equal(json.token);
      });
    });

    cy.get('.Dashboard');
  });
});
