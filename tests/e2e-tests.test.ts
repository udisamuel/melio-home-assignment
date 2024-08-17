import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import { VendorDetailsPage } from '../pages/vendorDetails.page';
import { NewVendorPage } from '../pages/newVendor.page';
import { DashboardPage } from '../pages/dashboard.page';
import { loginFlow, addVendorFlow, addInvalidVendorFlow } from '../flows/flows';
import { sleep } from '../utils/utils';


test.describe('Dashboard Page Tests', () => {
  let page;
  let context;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      userAgent: 'qa-automation-homework',
    });
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('should login, add a vendor, fill out the form with a GUID business name, and validate row exist with correct data', async () => {
    const guid = uuidv4();
    const businessName = `Vendor ${guid}`;
    
    await loginFlow(page, 'automation.home@melio.com', 'vH4iLixIFp');
    await addVendorFlow(page, businessName, 'John Doe', 'john.doe@example.com', '123-456-7890');

    const vendorDetailsPage = new VendorDetailsPage(page);
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.searchForText(businessName);
    await sleep(3000);
    await dashboardPage.clickRowByTextContentAndGetRowCount(businessName);
    expect(await vendorDetailsPage.getBusinessName()).toBe(businessName);
    expect(await vendorDetailsPage.getContactName()).toBe("John Doe");
    expect(await vendorDetailsPage.getEmail()).toBe("john.doe@example.com");
    expect(await vendorDetailsPage.getPhoneNumber()).toBe("(123) 456-7890");
  });

  test('should fail if a vendor is created with a duplicate name', async () => {
    const existingBusinessName = `Vendor ${uuidv4()}`;
    const invalidEmail = "invalid-email";
    const contactName = "John Doe";
    const validPhoneNumber = "123-456-7890";
    const dashboardPage = new DashboardPage(page);

    await loginFlow(page, 'automation.home@melio.com', 'vH4iLixIFp');

    for (let i = 0; i < 2; i++) {
      await addVendorFlow(page, existingBusinessName, contactName, 'jane.doe@example.com', validPhoneNumber);
    }

    await dashboardPage.searchForText(existingBusinessName);
    await sleep(3000);
    const rows = await dashboardPage.clickRowByTextContentAndGetRowCount(existingBusinessName);
    expect(rows).toBe(1); 

  });

  test('should display error for invalid vendor email', async () => {
    const businessName = `Vendor ${uuidv4()}`;
    const invalidEmail = "invalid-email";
    const contactName = "John Doe";
    const validPhoneNumber = "123-456-7890";
    const newVendorPage = new NewVendorPage(page);

    await loginFlow(page, 'automation.home@melio.com', 'vH4iLixIFp');

    await addInvalidVendorFlow(page, businessName, contactName, invalidEmail, validPhoneNumber);

    const isEmailErrorVisible = await newVendorPage.isEmailErrorVisible();
    expect(isEmailErrorVisible).toBe(true);

  });

});
