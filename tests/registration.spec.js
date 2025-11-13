import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/registration.page.js";

const EMAIL_PREFIX = "aqa";

function generateTestEmail() {
  const timestamp = Date.now();
  return `${EMAIL_PREFIX}-${timestamp}@test.com`;
}

// TC-REG-001: positive
test("TC-REG-001: Successful registration with valid data", async ({
  page,
}) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    name: "John",
    lastName: "Smith",
    email,
    password: "Testpass1",
    repeatPassword: "Testpass1",
  });

  await expect(registration.registerButton).toBeEnabled();
  await registration.submit();

  await expect(page).toHaveURL(/.*panel\/garage/);
});

// TC-REG-002: empty Name
test("TC-REG-002: Empty Name field", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    lastName: "Smith",
    email,
    password: "Testpass1",
    repeatPassword: "Testpass1",
  });

  await registration.triggerNameValidation();

  await expect(registration.registerButton).toBeDisabled();
  await expect(registration.nameRequiredError).toBeVisible();
});

// TC-REG-003: wrong Name length
test("TC-REG-003: Wrong Name length", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    name: "J",
    lastName: "Smith",
    email,
    password: "Testpass1",
    repeatPassword: "Testpass1",
  });

  await expect(registration.registerButton).toBeDisabled();
  await expect(registration.nameLengthError).toBeVisible();
});

// TC-REG-004: invalid Email
test("TC-REG-004: Invalid Email value", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const invalidEmail = `${EMAIL_PREFIX}-invalid-email`;

  await registration.fillForm({
    name: "John",
    lastName: "Smith",
    email: invalidEmail,
    password: "Testpass1",
    repeatPassword: "Testpass1",
  });

  await expect(registration.registerButton).toBeDisabled();
  await expect(registration.emailError).toBeVisible();
});

// TC-REG-005: invalid Password
test("TC-REG-005: Invalid Password format", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    name: "John",
    lastName: "Smith",
    email,
    password: "Testpass", // no digit
    repeatPassword: "Testpass",
  });

  await expect(registration.registerButton).toBeDisabled();
  await expect(registration.passwordError).toBeVisible();
});

// TC-REG-006: passwords do not match
test("TC-REG-006: Passwords do not match", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    name: "John",
    lastName: "Smith",
    email,
    password: "Testpass1",
    repeatPassword: "Testpass2",
  });
  await registration.passwordInput.click();
  await expect(registration.registerButton).toBeDisabled();
  await expect(registration.passwordsDoNotMatchError).toBeVisible();
});

// TC-REG-007: empty repeat password
test("TC-REG-007: Empty Re-enter password field", async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.open();

  const email = generateTestEmail();

  await registration.fillForm({
    name: "John",
    lastName: "Smith",
    email,
    password: "Testpass1",
    // repeatPassword is intentionally omitted
  });

  await registration.triggerRepeatPasswordValidation();

  await expect(registration.repeatPasswordRequiredError).toBeVisible();
  await expect(registration.registerButton).toBeDisabled();
});
