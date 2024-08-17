import { chromium } from '@playwright/test';

let browser;

export default async function globalSetup() {
  browser = await chromium.launch();
  globalThis.__BROWSER__ = browser;
}
