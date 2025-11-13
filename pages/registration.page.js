// pages/registration.page.js
const BASE_URL = "https://qauto.forstudy.space/";

export class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.signUpButton = page.getByRole("button", { name: /sign up/i });

    this.nameInput = page.locator('input[formcontrolname="name"]');
    this.lastNameInput = page.locator('input[formcontrolname="lastName"]');
    this.emailInput = page.locator('input[formcontrolname="email"]');
    this.passwordInput = page.locator('input[formcontrolname="password"]');
    this.repeatPasswordInput = page.locator(
      'input[formcontrolname="repeatPassword"]'
    );

    this.registerButton = page.getByRole("button", { name: /register/i });

    this.nameRequiredError = page.getByText(/Name required/i);
    this.nameLengthError = page.getByText(
      /Name has to be from 2 to 20 characters long/i
    );
    this.emailError = page.getByText(/Email is incorrect/i);
    this.passwordError = page.getByText(
      /Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i
    );
    this.repeatPasswordRequiredError = page.getByText(
      /Re-enter password required/i
    );
    this.passwordsDoNotMatchError = page.getByText(/Passwords? do not match/i);
  }

  async open() {
    await this.page.goto(BASE_URL);
    await this.signUpButton.click();
  }

  async fillForm({ name, lastName, email, password, repeatPassword }) {
    if (name !== undefined) {
      await this.nameInput.fill(name);
    }
    if (lastName !== undefined) {
      await this.lastNameInput.fill(lastName);
    }
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    if (repeatPassword !== undefined) {
      await this.repeatPasswordInput.fill(repeatPassword);
    }
  }

  async triggerNameValidation() {
    await this.nameInput.click();
    await this.lastNameInput.click();
  }

  async triggerRepeatPasswordValidation() {
    await this.repeatPasswordInput.click();
    await this.emailInput.click();
  }

  async submit() {
    await this.registerButton.click();
  }
}
