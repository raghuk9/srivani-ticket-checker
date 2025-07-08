const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to Srivani website...');
    await page.goto('https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    await page.waitForSelector('#lblCurrentDate', { timeout: 15000 });
    await page.waitForSelector('#lblAvailableQuota', { timeout: 15000 });

    const dateTime = await page.$eval('#lblCurrentDate', el => el.textContent.trim());
    const availableTickets = await page.$eval('#lblAvailableQuota', el => el.textContent.trim());

    console.log(`DateTime: ${dateTime}`);
    console.log(`Available Tickets: ${availableTickets}`);

    const csvLine = `"${dateTime}","${availableTickets}"\n`;
    const outputPath = path.resolve(__dirname, 'srivani.csv');

    // Append to CSV (create if doesn't exist)
    fs.appendFileSync(outputPath, csvLine, 'utf8');

    // Optional: Take a screenshot for debugging
    await page.screenshot({ path: 'final.png', fullPage: true });

    console.log('✅ Script completed successfully.');

  } catch (error) {
    console.error('❌ Error occurred:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
