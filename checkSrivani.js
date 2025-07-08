const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
  headless: false,
  executablePath: '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });


  const page = await browser.newPage();
  await page.goto('https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  const dateTime = await page.$eval('#lblCurrentDate', el => el.innerText).catch(() => 'N/A');
  const availableTickets = await page.$eval('#lblAvailableQuota', el => el.innerText).catch(() => 'N/A');

  console.log(`Date: ${dateTime}, Tickets: ${availableTickets}`);
  const csvLine = `"${dateTime}","${availableTickets}"\n`;
  fs.appendFileSync('srivani.csv', csvLine);

  await browser.close();
})();
