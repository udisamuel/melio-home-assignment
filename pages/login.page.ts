import { BasePage } from './base.page';
import { LocatorType } from './locator-type.enum';
import { sleep } from '../utils/utils';


export class LoginPage extends BasePage {

  private get usernameInput() {
    return this.getLocator(LocatorType.TestId, 'input-email');
  }

  private get passwordInput() {
    return this.getLocator(LocatorType.TestId, 'input-password');
  }

  private get submitButton() {
    return this.getLocator(LocatorType.TestId, 'button-auth.signIn.buttonLabel');
  }

  async goto() {
    await this.page.goto('https://alpha-app.meliopayments.com/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await sleep(3000);
    await this.submitButton.click();
  }

}
