import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('I am on the login page', () => {
  cy.visit('/auth/login');
});

When('I fill the form with valid credentials', () => {
  cy.get('[data-cy="login-email"]').type('maria@teste.com');
  cy.get('[data-cy="login-password"]').type('1234');
  cy.get('[data-cy="login-submit"]').click();
});

When('I click the button', () => {
  cy.get('[data-cy="login-submit"]').click();
});

Then('I should be redirected to the home page', () => {
  cy.url({ timeout: 10000 }).should('include', '/home');
});
