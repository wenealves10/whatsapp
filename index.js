const fs = require('fs');

const { Client, MessageMedia } = require('whatsapp-web.js');

const QrCode = require('qrcode');
const { printSite, geraPeople } = require('./puppeteer/pupeeter');
const { geraMeme } = require('./api/meme');
const { covertURL } = require('./util/covertURL');
const { deleteFile } = require('./util/deleteFile');

const SESSION_FILE_PATH = './tokens/session1.json';

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg, ffmpegPath: 'ffmpeg' });

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
    message.reply('Lista de Comandos\n*Verificar ping:* !ping\n*Criar Sticker:* !sticker\n*Gera Código QRcode:* !geraCode Texto\n*Tira Print de Site:* !print URL\n*Gerar Pessoas Aleatórias:* !geraPessoa');
  } else if (message.body === '!sticker' && message.hasMedia) {
    const attachmentData = await message.downloadMedia();
    await message.reply(attachmentData, message.from, { sendMediaAsSticker: true });
  } else if (message.body.startsWith('!geraCode ')) {
    const textToQr = message.body.split(' ')[1];
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
  } else if (message.body === '!geraPessoa') {
    await message.reply('*Aguarde um pouco....*');
    try {
      const person = await geraPeople();
      await message.reply(`*Nome:* ${person.nome}\n*Idade:* ${person.idade}\n*CPF:* ${person.cpf}\n*RG:* ${person.rg}\n*Data de Nascimento:* ${person.data_nasc}\n*Sexo:* ${person.sexo}\n*Signo:* ${person.signo}\n*Mãe:* ${person.mae}\n*Pai:* ${person.pai}\n*E-mail:* ${person.email}\n*Senha:* ${person.senha}\n*CEP:* ${person.cep}\n*Endereço:* ${person.endereco}\n*N° da casa:* ${person.numero}\n*Bairro:* ${person.bairro}\n*Cidade:* ${person.cidade}\n*Estado:* ${person.estado}\n*Telefone Fixo:* ${person.telefone_fixo}\n*Celular:* ${person.celular}\n*Altura:* ${person.altura}M\n*Peso:* ${person.peso}KG\n*Tipo Sanguíne:* ${person.tipo_sanguineo}\n*Cor Favorita:* ${person.cor}`);
    } catch (error) {
      await message.reply(error.message);
    }
  } else if (message.body.startsWith('!geraMeme ')) {
    const texts = message.body.split(/;/gi);
    await message.reply('*Aguarde um pouco....*');
    try {
      const url = await geraMeme(...texts);
      const meme = await covertURL(url);
      await message.reply(meme);
    } catch (error) {
      await message.reply(error.message);
    }
  }
});
