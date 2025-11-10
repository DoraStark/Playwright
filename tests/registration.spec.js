// tests/registration.spec.js
import { test, expect } from "@playwright/test";

const BASE_URL = "https://qauto.forstudy.space/";
const EMAIL_PREFIX = "aqa";

function generateTestEmail() {
  const timestamp = Date.now();
  return `${EMAIL_PREFIX}-${timestamp}@test.com`;
}

async function openRegistrationForm(page) {
  await page.goto(BASE_URL);
  await page.getByRole("button", { name: /sign up/i }).click();
}

test("TC-REG-001: Successful registration with valid data", async ({
  page,
}) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  await page.locator('input[formcontrolname="name"]').fill("John");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass1");

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeEnabled();

  await registerButton.click();

  await expect(page).toHaveURL(/.*panel\/garage/);
});

test("TC-REG-002: Empty Name field", async ({ page }) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  const nameInput = page.locator('input[formcontrolname="name"]');
  await nameInput.click();
  await page.locator('input[formcontrolname="lastName"]').click();

  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass1");

  const registerButton = page.getByRole("button", { name: /register/i });

  await expect(registerButton).toBeDisabled();

  await expect(page.getByText("Name required")).toBeVisible();
});

test("TC-REG-003: Wrong Name length", async ({ page }) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  await page.locator('input[formcontrolname="name"]').fill("J");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass1");

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeDisabled();

  await expect(
    page.getByText(/Name has to be from 2 to 20 characters long/i)
  ).toBeVisible();
});

test("TC-REG-004: Invalid Email value", async ({ page }) => {
  await openRegistrationForm(page);

  const invalidEmail = `${EMAIL_PREFIX}-invalid-email`;

  await page.locator('input[formcontrolname="name"]').fill("John");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(invalidEmail);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass1");

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeDisabled();

  await expect(page.getByText(/Email is incorrect/i)).toBeVisible();
});

test("TC-REG-005: Invalid Password format", async ({ page }) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  await page.locator('input[formcontrolname="name"]').fill("John");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass");

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeDisabled();

  await expect(
    page.getByText(
      /Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i
    )
  ).toBeVisible();
});

test("TC-REG-006: Passwords do not match", async ({ page }) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  await page.locator('input[formcontrolname="name"]').fill("John");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");
  await page
    .locator('input[formcontrolname="repeatPassword"]')
    .fill("Testpass2");

  await page.locator('input[formcontrolname="email"]').click();

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeDisabled();

  await expect(page.getByText(/Passwords? do not match/i)).toBeVisible();
});

test("TC-REG-007: Empty Re-enter password field", async ({ page }) => {
  await openRegistrationForm(page);

  const email = generateTestEmail();

  await page.locator('input[formcontrolname="name"]').fill("John");
  await page.locator('input[formcontrolname="lastName"]').fill("Smith");
  await page.locator('input[formcontrolname="email"]').fill(email);
  await page.locator('input[formcontrolname="password"]').fill("Testpass1");

  const repeatPassword = page.locator(
    'input[formcontrolname="repeatPassword"]'
  );
  await repeatPassword.click();
  await page.locator('input[formcontrolname="email"]').click();

  await expect(page.getByText(/Re-enter password required/i)).toBeVisible();

  const registerButton = page.getByRole("button", { name: /register/i });
  await expect(registerButton).toBeDisabled();
});
