// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable {
    login: typeof login;
    // ...
  }
}

Cypress.Commands.add('login', login);

function login(uid: string, password: string) {
  Cypress.log({
    name: 'login',
    message: [uid, password],
  });

  cy.request({
    method: 'POST',
    url: 'https://api.vulpee.bramvanosta.dev/1.0/auth/sign-in',
    body: {
      uid,
      password,
    },
  }).then(response => {
    localStorage.setItem('token', response.body.token);
  });
}
