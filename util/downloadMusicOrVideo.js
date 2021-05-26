const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const { getMime } = require('./getMime');

async function getDownload(url, type) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: type === 'music' ? 'stream' : 'arraybuffer',
  });

  if (type === 'music') {
    const pathA = path.resolve(__dirname, '..', 'music', 'music.mp3');
    const writer = fs.createWriteStream(pathA);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  return new Promise((resolve, reject) => {
    try {
      const data = response.data.toString('base64');
      const mime = getMime(data);
      resolve(data && mime ? new MessageMedia(mime, data) : reject());
    } catch (error) {
      reject();
    }
  });
}

module.exports = { getDownload };
