import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import RegisterPage from '../../../support/pages/authentication/register.page';
import users from './../../../fixtures/users.json';

const newUserEmail = `usuario_${Date.now()}@teste.com`;
const newUserUsername = `novo_usuario_${Date.now()}`;

const registeredEmail = Cypress.env('USER_EMAIL');
const invalidEmail = users.invalidUser.email;

const defaultPassword = users.defaultPassword;
const mismatchedPassword = 'mismatchedPassword123';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('que o usuário está na página de cadastro', () => {
  RegisterPage.visit();
});

When('o usuário preenche o formulário com um e-mail não registrado', () => {
  RegisterPage.typeEmail(newUserEmail);
});

When('o usuário preenche o formulário com um e-mail já cadastrado', () => {
  RegisterPage.typeEmail(registeredEmail);
});

When('o usuário preenche o formulário com um e-mail inválido', () => {
  RegisterPage.typeEmail(invalidEmail);
});

When('o usuário tenta enviar o formulário sem preencher os campos obrigatórios', () => {
  RegisterPage.typeEmail('');
  RegisterPage.typeUsername('');
  RegisterPage.typePassword('');
  RegisterPage.typeConfirmPassword('');
});

When('preenche os demais campos com dados válidos', () => {
  RegisterPage.typeUsername(newUserUsername);
  RegisterPage.typePassword(defaultPassword);
  RegisterPage.typeConfirmPassword(defaultPassword);
});

When('preenche o campo senha e confirmação com valores diferentes', () => {
  RegisterPage.typeUsername(newUserUsername);
  RegisterPage.typePassword(defaultPassword);
  RegisterPage.typeConfirmPassword(mismatchedPassword);
});

When('envia o formulário de cadastro', () => {
  RegisterPage.clickRegisterButton();
});

Then('o sistema exibe uma mensagem de sucesso informando que o cadastro foi realizado', () => {
  RegisterPage.shouldDisplaySuccessMessage('Usuário cadastrado com sucesso');
});

Then('o sistema bloqueia o cadastro e exibe uma mensagem informando que o e-mail já está cadastrado', () => {
  RegisterPage.shouldDisplayErrorMessage('Email já cadrastrado');
});

Then('o sistema bloqueia o cadastro e exibe uma mensagem informando que as senhas não coincidem', () => {
  RegisterPage.shouldDisplayErrorMessage('As senhas não coincidem');
});

Then('o sistema exibe uma mensagem de erro de validação no cadastro', () => {
  RegisterPage.shouldDisplayErrorMessage('Preencha todos os campos corretamente');
});

