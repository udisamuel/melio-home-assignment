export default async function globalTeardown() {
    const browser = globalThis.__BROWSER__;
  
    if (!browser) {
      throw new Error('Browser instance is not available in global teardown');
    }
  
    await browser.close();
  }
  