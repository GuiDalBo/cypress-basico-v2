
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
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id=firstName]').type('Teste Nome')
    cy.get('input[id=lastName]').type('Teste Sobrenome')
    cy.get('input[id=email]').type('email@email.com')
    cy.get('input[id=phone]').type('12345678')
    cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
    cy.get('button[type=submit]').click()

})
// 
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
