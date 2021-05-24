const puppeteer = require('puppeteer');
const { linkGeraPerson, linkDownloadMusic } = require('./link.json');
const { getDownload } = require('../util/downloadMusic');
const { covertURL } = require('../util/covertURL');

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
      const btnJson = document.getElementById('btn_json_tab');
      btnJson.click();
      const dadosJson = document.getElementById('dados_json');
      return dadosJson.value;
    });
    await browser.close();
    const person = JSON.parse(data);
    return `*Nome:* ${person.nome}\n*Idade:* ${person.idade}\n*CPF:* ${person.cpf}\n*RG:* ${person.rg}\n*Data de Nascimento:* ${person.data_nasc}\n*Sexo:* ${person.sexo}\n*Signo:* ${person.signo}\n*Mãe:* ${person.mae}\n*Pai:* ${person.pai}\n*E-mail:* ${person.email}\n*Senha:* ${person.senha}\n*CEP:* ${person.cep}\n*Endereço:* ${person.endereco}\n*N° da casa:* ${person.numero}\n*Bairro:* ${person.bairro}\n*Cidade:* ${person.cidade}\n*Estado:* ${person.estado}\n*Telefone Fixo:* ${person.telefone_fixo}\n*Celular:* ${person.celular}\n*Altura:* ${person.altura}M\n*Peso:* ${person.peso}KG\n*Tipo Sanguíne:* ${person.tipo_sanguineo}\n*Cor Favorita:* ${person.cor}`;
  } catch (error) {
    await browser.close();
    throw new Error('*Desculpe ocorreu um erro!!*');
  }
}

async function downloadMusic(search) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(linkDownloadMusic);
  await page.waitForSelector('#s_input');
  await page.type('#s_input', search);
  await page.click('button.btn-red');
  await page.waitForSelector('ul.listvideo > li:first-child > a');
  const linkMusic = await page.$('ul.listvideo > li:first-child');
  const url = await linkMusic.$eval('a', (node) => node.href);
  await page.goto(url);
  await page.waitForSelector('span.hidden');
  const thumbnail = await page.$('div.thumbnail');
  const srcImage = await thumbnail.$eval('img', (node) => node.src);
  const title = await page.$('div.clearfix');
  const titleMusic = await title.$eval('h3', (node) => node.innerText);
  const buttonDownload = await page.$('div.flex');
  const urlDownload = await buttonDownload.$eval('a#asuccess', (node) => node.href);
  await browser.close();
  try {
    await getDownload(urlDownload);
    const imageThumbnail = await covertURL(srcImage);
    return { titleMusic, imageThumbnail };
  } catch (error) {
    throw new Error('_Desculpe não consegui encontra a musica!!_');
  }
}

// (async () => {
//   const dataM = await downloadMusic('alok bipolar');
//   console.log(dataM);
// })();

module.exports = {
  printSite,
  geraPeople,
  downloadMusic,
};
