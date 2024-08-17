import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { NewVendorPage } from '../pages/newVendor.page';
import { ReceivePaymentsPage } from '../pages/receviePayments.page';
import { sleep } from '../utils/utils';

export async function loginFlow(page: Page, email: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);
}

export async function addVendorFlow(page: Page, businessName: string, contactName: string, email: string, phoneNumber: string) {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.validatePageLoaded(); 
    await dashboardPage.addVendor();

    const newVendorPage = new NewVendorPage(page);
    await newVendorPage.enterBusinessName(businessName);
    await newVendorPage.enterContactName(contactName);
    await newVendorPage.enterEmail(email);
    await newVendorPage.enterPhoneNumber(phoneNumber);
    await sleep(3000);
    await newVendorPage.clickContinue();

    const receivePaymentsPage = new ReceivePaymentsPage(page);
    await receivePaymentsPage.clickSkipButton();
}

export async function addInvalidVendorFlow(
    page: Page, 
    businessName: string, 
    contactName: string, 
    email: string, 
    phoneNumber: string
  ) {
    const dashboardPage = new DashboardPage(page);  
    const newVendorPage = new NewVendorPage(page);
      await dashboardPage.addVendor();
      await newVendorPage.enterBusinessName(businessName);
      await newVendorPage.enterContactName(contactName);
      await newVendorPage.enterEmail(email);
      await newVendorPage.enterPhoneNumber(phoneNumber);
      await newVendorPage.clickContinue();
  }


