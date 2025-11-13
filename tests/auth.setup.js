// tests/auth.setup.js
import { test, expect } from "@playwright/test";

test("login and save storage state", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /sign in/i }).click();

  await page.getByLabel("Email").fill("tar@yahoo.com");
  await page.getByLabel("Password").fill("6B9HXWjwSRVpy6w");

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 }),
    page.getByRole("button", { name: /login/i }).click(),
  ]);

  console.log("Current URL after login:", page.url());

  await expect(page).toHaveURL(/panel\/garage|panel/i);

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });

  console.log("Storage state saved to playwright/.auth/user.json");
});
