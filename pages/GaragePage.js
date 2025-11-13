// page-objects/GaragePage.js
export class GaragePage {
  constructor(page) {
    this.page = page;

    this.addCarButton = page.getByRole("button", { name: /add car/i });
    this.carsList = page.locator(".car-list-item");
  }

  async goto() {
    await this.page.goto("/panel/garage");
  }

  async openAddCarModal() {
    await this.addCarButton.click();
  }
}
