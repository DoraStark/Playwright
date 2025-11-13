// tests/fixtures/userGaragePage.js
import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../../pages/GaragePage.js";

const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });

    const page = await context.newPage();

    const garagePage = new GaragePage(page);

    await garagePage.goto();

    await use(garagePage);

    await context.close();
  },
});

export { test, expect };
