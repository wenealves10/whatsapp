const fs = require('fs');

const { Client, MessageMedia } = require('whatsapp-web.js');

const QrCode = require('qrcode');
const {
  printSite, geraPeople, downloadMusic, downloadVideo,
} = require('./puppeteer/pupeeter');
const { geraMeme } = require('./api/meme');
const { covertURL } = require('./util/covertURL');
const { deleteFile, deleteMusic, deleteVideo } = require('./util/deleteFile');
const { getDataCovidToStateAndCity } = require('./api/notice');
const { getNoticesBrazil } = require('./api/noticeBrazil');
const { menu } = require('./util/menu');

const SESSION_FILE_PATH = './tokens/session.json';

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true, executablePath: '/usr/bin/google-chrome-stable' }, session: sessionCfg, ffmpegPath: 'ffmpeg' });

client.initialize();

client.on('qr', (qr) => {
  QrCode.toString(qr, { type: 'terminal', scale: 100 }, (err, url) => {
    console.log(url);
  });
});

client.on('authenticated', (session) => {
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on('auth_failure', (msg) => {
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
  console.log('READY');
});

client.on('message', async (message) => {
  if (message.body === '!ping') {
    await message.reply('pong');
  } else if (message.body === '!menu') {
    message.reply(menu);
  } else if (message.body === '!sticker' && message.hasMedia) {
    const attachmentData = await message.downloadMedia();
    await message.reply(attachmentData, message.from, { sendMediaAsSticker: true });
  } else if (message.body.startsWith('!geracode')) {
    const textToQr = message.body.match(/[^!geracode][\w\W]+/gi);
    QrCode.toFile('./images/qr.png', textToQr, { errorCorrectionLevel: 'high' }, async (err) => {
      if (err) throw err;
      const media = MessageMedia.fromFilePath('./images/qr.png');
      await message.reply(media);
      await deleteFile('qr.png');
    });
  } else if (message.body.startsWith('!print ')) {
    const href = message.body.split(' ')[1];
    await message.reply('*Aguarde um pouco enquanto tiro print....*');
    try {
      await printSite(href);
      const media = MessageMedia.fromFilePath('./images/print.png');
      await message.reply(media);
      await deleteFile('print.png');
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body === '!gerafake') {
    await message.reply('*Aguarde um pouco....*');
    try {
      const person = await geraPeople();
      await message.reply(person);
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.startsWith('!meme')) {
    const data = message.body.match(/[^!meme][\w\W]+/gi);
    const texts = data.join('').split(/\//gi);
    await message.reply('*Aguarde um pouco....*');
    try {
      const url = await geraMeme(...texts);
      const meme = await covertURL(url);
      await message.reply(meme);
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.startsWith('!covid')) {
    const data = message.body.match(/[^!covid][\w\W]+/gi);
    const resultData = data.join('').split(/\//gi);
    await message.reply('*Aguarde um pouco enquanto busco por informações...*');
    try {
      const result = await getDataCovidToStateAndCity(
        ...resultData,
      );
      await message.reply(result);
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.toLowerCase() === '!noticiabr') {
    await message.reply('*Aguarde um pouco....*');
    try {
      const notices = await getNoticesBrazil();
      await message.reply(notices);
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.startsWith('!music')) {
    const search = message.body.match(/[^music][\w\W]+/gi);
    await message.reply('*Aguarde... um pouco enquanto baixo a musica🎶🎵*');
    try {
      const music = await downloadMusic(search);
      await message.reply(music.imageThumbnail, message.from, { caption: music.titleMusic });
      const media = MessageMedia.fromFilePath('./music/music.mp3');
      await message.reply(media);
      await deleteMusic('music.mp3');
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.startsWith('!video')) {
    const search = message.body.match(/[^!video][\w\W]+/gi);
    await message.reply('*Aguarde... um pouco enquanto baixo a vídeo🎞🎞*');
    try {
      const { titleMusic } = await downloadVideo(search);
      const media = MessageMedia.fromFilePath('./video/video.mp4');
      await deleteVideo('video.mp4');
      await message.reply(media, message.from, { caption: titleMusic });
    } catch (error) {
      await message.reply(error.message);
    }
  }
});
