class RegisterPage {
  private get emailInput() {
    return cy.get('[data-cy="register-email"]');
  }

  private get passwordInput() {
    return cy.get('[data-cy="register-password"]');
  }

  private get confirmPasswordInput() {
    return cy.get('[data-cy="register-confirm-password"]');
  }

  private get submitButton() {
    return cy.get('[data-cy="register-submit"]');
  }

  private get errorMessage() {
    return cy.get('[data-cy="register-error-message"]', { timeout: 10000 });
  }

  private get successMessage() {
    return cy.get('[data-cy="register-success-message"]', { timeout: 10000 });
  }

  public visit(): void {
    cy.visit('/auth/register');
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

  public typeConfirmPassword(password: string): void {
    if (password) {
      this.confirmPasswordInput.type(password, { log: false });
    }
  }

  public clickRegisterButton(): void {
    this.submitButton.click();
  }

  public shouldDisplayErrorMessage(message: string) {
    this.errorMessage.should('be.visible').and('contain.text', message);
  }

  public shouldDisplaySuccessMessage(message: string) {
    this.successMessage.should('be.visible').and('contain.text', message);
  }
}

export default new RegisterPage();
