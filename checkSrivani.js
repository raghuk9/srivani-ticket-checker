const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // use the new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0       // disable timeout during launch
  });

  const page = await browser.newPage();
  await page.goto('https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx', {
    waitUntil: 'networkidle2',
    timeout: 60000 // 60 seconds
  });

  // scraping logic here...

  await browser.close();
})();
