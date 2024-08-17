import { Page, Locator } from '@playwright/test';
import { LocatorType } from './locator-type.enum';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getLocator(type: LocatorType, value: string, name?: string): Locator {
    switch (type) {
      case LocatorType.TestId:
        return this.page.locator(`[${type}="${value}"]`);
      case LocatorType.Role:
        return this.page.locator(`role=${value}${name ? ` >> text=${name}` : ''}`);
      case LocatorType.Text:
        return this.page.locator(`text=${value}`);
      case LocatorType.Placeholder:
        return this.page.locator(`[placeholder="${value}"]`);
      case LocatorType.Label:
        return this.page.locator(`label=${value}`);
      case LocatorType.AltText:
        return this.page.locator(`alt=${value}`);
      default:
        throw new Error(`Unsupported locator type: ${type}`);
    }
  }
}
