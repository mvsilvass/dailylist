import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../support/pages/auth/login.page';

import users from '../../../fixtures/users.json';

const validEmail = Cypress.env('USER_EMAIL');
const validPassword = Cypress.env('USER_PASSWORD');

const unregisteredEmail = users.unregisteredUser.email;

const invalidEmail = users.invalidUser.email;

const defaultPassword = users.defaultPassword;
const incorrectPassword = 'incorrectPassword123';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('que o usuário está na página de login', () => {
  LoginPage.visit();
});

When('o usuário preenche o formulário com um e-mail e senha cadastrados', () => {
  LoginPage.typeEmail(validEmail);
  LoginPage.typePassword(validPassword);
});

When('o usuário preenche o formulário com um e-mail e senha não cadastrados', () => {
  LoginPage.typeEmail(unregisteredEmail);
  LoginPage.typePassword(defaultPassword);
});

When('o usuário preenche o formulário com um e-mail cadastrado e senha incorreta', () => {
  LoginPage.typeEmail(validEmail);
  LoginPage.typePassword(incorrectPassword);
});

When('o usuário preenche o formulário com um e-mail em formato inválido', () => {
  LoginPage.typeEmail(invalidEmail);
  LoginPage.typePassword(defaultPassword);
});

When('o usuário não preenche os campos obrigatórios', () => {
  LoginPage.typeEmail('');
  LoginPage.typePassword('');
});

When('envia o formulário de login', () => {
  LoginPage.clickLoginButton();
});

Then('o sistema redireciona o usuário para a página de tarefas', () => {
  cy.url({ timeout: 10000 }).should('include', '/tasks');
});

Then('o sistema exibe uma mensagem de erro de autenticação', () => {
  LoginPage.shouldDisplayErrorMessage('Usuário ou senha inválidos');
});

Then('o sistema exibe uma mensagem de erro de validação no login', () => {
  LoginPage.shouldDisplayErrorMessage('Preencha todos os campos corretamente');
});
