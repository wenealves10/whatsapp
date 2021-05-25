const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function getDownload(url, type) {
  const pathA = path.resolve(__dirname, '..', type, `${type}.${type === 'music' ? 'mp3' : 'mp4'}`);
  const writer = fs.createWriteStream(pathA);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

module.exports = { getDownload };
