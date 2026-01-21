class LoginPage {
  private get emailInput() {
    return cy.get('[data-cy="login-email"]');
  }

  private get passwordInput() {
    return cy.get('[data-cy="login-password"]');
  }

  private get submitButton() {
    return cy.get('[data-cy="login-submit"]');
  }

  private get errorMessage() {
    return cy.get('[data-cy="login-error-message"]', { timeout: 10000 });
  }

  public visit(): void {
    cy.visit('/auth/login');
  }

  public typeEmail(email: string): void {
    if (email) {
      this.emailInput.type(email);
    }
  }

  public typePassword(password: string): void {
    if (password) {
      this.passwordInput.type(password, { log: false });
    }
  }

  public clickLoginButton(): void {
    this.submitButton.click();
  }

  public shouldDisplayErrorMessage(message: string) {
    this.errorMessage.should('be.visible').and('contain.text', message);
  }
}

export default new LoginPage();
