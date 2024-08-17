import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class VendorDetailsPage extends BasePage {
  private readonly businessNameInputSelector: string = '[data-testid="form-input-companyName"]';
  private readonly contactNameInputSelector: string = '[data-testid="form-input-fullName"]';
  private readonly emailInputSelector: string = '[data-testid="form-input-email"]';
  private readonly phoneNumberInputSelector: string = '[data-testid="form-input-phone"]';

  constructor(page: Page) {
    super(page);
  }

  async getBusinessName(): Promise<string> {
    return (await this.page.textContent(this.businessNameInputSelector)) ?? '';
  }

  async getContactName(): Promise<string> {
    return (await this.page.textContent(this.contactNameInputSelector)) ?? '';
  }

  async getEmail(): Promise<string> {
    return (await this.page.textContent(this.emailInputSelector)) ?? '';
  }

  async getPhoneNumber(): Promise<string> {
    return (await this.page.textContent(this.phoneNumberInputSelector)) ?? '';
  }
}
