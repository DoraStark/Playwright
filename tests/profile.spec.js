import { test, expect } from "@playwright/test";

const BASE_URL = "https://qauto.forstudy.space";

test.use({
  storageState: "playwright/.auth/user.json",
});

test("profile uses mocked API data", async ({ page }) => {
  const mockProfile = {
    status: "ok",
    data: {
      userId: 999999,
      photoFilename: "mock-user.png",
      name: "Stanislav",
      lastName: "MocTaran",
    },
  };

  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockProfile),
    });
  });

  await page.goto(`${BASE_URL}/panel/profile`);
  await page.pause();

  await expect(page.getByText("Stanislav")).toBeVisible();
  await expect(page.getByText("MocTaran")).toBeVisible();
});
