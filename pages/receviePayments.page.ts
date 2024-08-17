import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ReceivePaymentsPage extends BasePage {
  private readonly skipButtonSelector: string = '[data-testid="layout-next-button"]';

  constructor(page: Page) {
    super(page);
  }

  async clickSkipButton(): Promise<void> {
    await this.page.click(this.skipButtonSelector);
  }
}
