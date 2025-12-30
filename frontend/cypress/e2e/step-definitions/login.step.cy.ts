import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from './../../support/pages/authentication/login.page';

import users from './../../fixtures/users.json';

const validEmail = Cypress.env('USER_EMAIL');
const validPassword = Cypress.env('USER_PASSWORD');

const unregisteredEmail = users.unregisteredUser.email;
const unregisteredPassword = users.unregisteredUser.password;

const invalidEmail = users.invalidUser.email;
const invalidPassword = users.invalidUser.password;

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('the user is on the login page', () => {
  LoginPage.visit();
});

// Scenario: Successful login with registered user account
When('the user enters a valid email address and password', () => {
  LoginPage.typeEmail(validEmail);
  LoginPage.typePassword(validPassword);
});

// Scenario: Unsuccessful login with unregistered user account
When('the user enters an unregistered email and password', () => {
  LoginPage.typeEmail(unregisteredEmail);
  LoginPage.typePassword(unregisteredPassword);
});

// Scenario: Unsuccessful login with invalid credentials format
When('the user enters invalid email address format', () => {
  LoginPage.typeEmail(invalidEmail);
  LoginPage.typePassword(invalidPassword);
});

When('he submits the login credentials', () => {
  LoginPage.clickLoginButton();
});

Then('the user should be redirected to the home page', () => {
  cy.url({ timeout: 10000 }).should('include', '/home');
});

Then('an authentication error message should be displayed', () => {
  LoginPage.shouldDisplayErrorMessage('Usuário ou senha inválidos');
});

Then('a validation error message should be displayed', () => {
  LoginPage.shouldDisplayErrorMessage('Preencha todos os campos corretamente');
});
