import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NewVendorPage extends BasePage {
  private readonly businessNameInputSelector: string = '[data-testid="form-input-companyName"]';
  private readonly contactNameInputSelector: string = '[data-testid="form-input-fullName"]';
  private readonly emailInputSelector: string = '[data-testid="form-input-email"]';
  private readonly phoneNumberInputSelector: string = '[data-testid="form-input-phone"]';
  private readonly continueButtonSelector: string = '[data-testid="continue-button"]';
  private readonly cancelButtonSelector: string = '[data-testid="layout-close-button"]';
  private emailErrorMessage = 'data-testid=form-error-message-email';

  constructor(page: Page) {
    super(page);
  }

  async enterBusinessName(businessName: string): Promise<void> {
    await this.page.fill(this.businessNameInputSelector, businessName);
  }

  async enterContactName(contactName: string): Promise<void> {
    await this.page.fill(this.contactNameInputSelector, contactName);
  }

  async enterEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInputSelector, email);
  }

  async enterPhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.fill(this.phoneNumberInputSelector, phoneNumber);
  }

  async clickContinue(): Promise<void> {
    await this.page.click(this.continueButtonSelector);
  }

  async clickCancel(): Promise<void> {
    await this.page.click(this.cancelButtonSelector);
  }

  async isEmailErrorVisible(): Promise<boolean> {
    return await this.page.isVisible(this.emailErrorMessage);
}
}
