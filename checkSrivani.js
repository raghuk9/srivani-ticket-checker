const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // use Puppeteer's new headless mode (more stable)
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0       // disable launch timeout
  });

  const page = await browser.newPage();
  await page.goto('https://webapps.tirumala.org/SrivaniTokenLiveTV/LiveStatus.aspx', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  const date = await page.$eval('#lblCurrentDate', el => el.textContent.trim());
  const quota = await page.$eval('#lblAvailableQuota', el => el.textContent.trim());

  fs.writeFileSync('srivani.csv', `"Date","AvailableQuota"\n"${date}","${quota}"`);
  await page.screenshot({ path: 'final.png', fullPage: true });

  await browser.close();
})();
