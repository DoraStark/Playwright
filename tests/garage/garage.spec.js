// tests/garage/garage.spec.js
import { test, expect } from "../fixtures/userGaragePage.js";

test("TC-GARAGE-001: User sees empty garage list", async ({
  userGaragePage,
}) => {
  await expect(userGaragePage.carsList).toHaveCount(0);

  await userGaragePage.openAddCarModal();
});
