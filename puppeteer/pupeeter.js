const puppeteer = require('puppeteer');
const { linkGeraPerson } = require('./link.json');

async function printSite(href) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urlPage = href.startsWith('https://') ? href : `https://${href}`;
  try {
    await page.goto(urlPage);
    await page.screenshot({ path: './images/print.png' });
    await browser.close();
  } catch (error) {
    await browser.close();
    throw new Error('*Desculpe essa pagina não existe*');
  }
}

async function geraPeople() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(linkGeraPerson);
  await page.waitForTimeout(500);
  await page.click('input#bt_gerar_pessoa');
  await page.waitForTimeout(500);
  try {
    const data = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const btnJson = document.getElementById('btn_json_tab');
      btnJson.click();
      // eslint-disable-next-line no-undef
      const dadosJson = document.getElementById('dados_json');
      return dadosJson.value;
    });
    await browser.close();
    return JSON.parse(data);
  } catch (error) {
    await browser.close();
    throw new Error('*Desculpe ocorreu um erro!!*');
  }
}

module.exports = {
  printSite,
  geraPeople,
};
