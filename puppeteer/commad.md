await page.waitForSelector('a#asuccess');
const musicData = await page.evaluate(() => {
const srcImg = document.querySelector('div.thumbnail > img').src;
const title = document.querySelector('div.clearfix > h3').innerText;
const urlMusic = document.querySelector('a#asuccess').href;
return { srcImg, title, urlMusic };
});

return musicData;
await browser.close();

try {
await getDownload(musicData.urlMusic);
const imageThumbnail = covertURL(musicData.srcImg);
return { title: musicData.title, imageThumbnail };
} catch (error) {
throw new Error('_Desculpe ocorreu um erro!!_');
}

const urlMusicNext = await page.evaluate(() => document.querySelector('ul.listvideo > li:first-child > a').href);
await page.goto(urlMusicNext);
await page.waitForSelector('a#asuccess');
const musicData = await page.evaluate(() => {
const srcImg = document.querySelector('div.thumbnail > img').src;
const title = document.querySelector('div.clearfix > h3').innerText;
const urlMusic = document.querySelector('div.flex > a#asuccess').href;
return { srcImg, title, urlMusic };
});
return musicData;

const selectorSizeMP4 = document.querySelector('#formatSelect > optgroup[label=mp4]')

=======================================================================================================================

const btnI9 = document.querySelector('#i9');
const btnI10 = document.querySelector('#i10');
const btnI10 = document.querySelector('#i11');
const textAreaInput = document.querySelector('textarea.er8xn');
const textOutPut = document.querySelector('span[jsname=W297wb]');
