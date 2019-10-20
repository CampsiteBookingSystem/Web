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

Cypress.Commands.add('login', (uid, password) => {
  Cypress.log({
    name: 'login',
    message: uid + ' | ' + password,
  });

  cy.request({
    method: 'POST',
    url: 'http://api.vulpee.local/1.0/auth/sign-in',
    body: {
      uid,
      password,
    },
  }).then(response => {
    localStorage.setItem('token', response.body.token);
  });
});
