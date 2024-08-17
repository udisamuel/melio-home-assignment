import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class DashboardPage extends BasePage {
  private readonly modalCloseButtonSelector: string = '[data-testid="modal-close-button"]';
  private readonly dialogTextSelector: string = 'text="Start your free 30-day trial"';
  private readonly specificTextSelector: string = 'h1:has-text("Pay")';
  private readonly addVendorButtonSelector: string = '[data-testid="vendors-tab-add-vendor-button"]';
  private readonly searchInputSelector: string = '[data-testid="search-input"]';
  private readonly tableSelector: string = '[data-testid="table-container"]'

  constructor(page: Page) {
    super(page);
  }

  async validatePageLoaded(): Promise<void> {
    try {
      const dialogTextLocator = this.page.locator(this.dialogTextSelector);
      const specificTextLocator = this.page.locator(this.specificTextSelector);

      if (await dialogTextLocator.count() > 0) {
        await dialogTextLocator.waitFor({ state: 'visible', timeout: 30000 });
      } else {
        await specificTextLocator.waitFor({ state: 'visible', timeout: 30000 });
      }
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }

  async closeDialog(): Promise<void> {
    try {
      const closeButtonLocator = this.page.locator(this.modalCloseButtonSelector);

      if (await closeButtonLocator.count() > 0) {
        await closeButtonLocator.click();
        await closeButtonLocator.waitFor({ state: 'hidden' });
      } else {
        console.log('Dialog not present. Validating page with text "Pay".');
        await this.validatePageLoaded();
      }
    } catch (error) {
      throw new Error(`Dialog handling or validation failed: ${error.message}`);
    }
  }

  async addVendor(): Promise<void> {
    try {
      const addVendorButtonLocator = this.page.locator(this.addVendorButtonSelector);
      
      await addVendorButtonLocator.waitFor({ state: 'visible', timeout: 40000 });
      await addVendorButtonLocator.click();
    } catch (error) {
      throw new Error(`Failed to click the 'Add Vendor' button: ${error.message}`);
    }
  }

  async searchForText(searchText: string): Promise<void> {
    await this.page.fill(this.searchInputSelector, searchText);
    await this.page.press(this.searchInputSelector, 'Enter');
  }

  async clickRowByTextContentAndGetRowCount(text: string): Promise<number> {
    const rows = await this.page.$$(`[data-component="TableRow"]`);
    let count = 0;

    for (const row of rows) {
        const textContent = await row.textContent();
        if (textContent && textContent.includes(text)) {
            count++;
            if (count === 1) {
                await row.click();
                console.log(`Clicked row containing text: "${text}"`);
            }
        }
    }

    if (count === 0) {
        console.log(`No row found containing text: "${text}"`);
    }

    return count;
}

  

}
