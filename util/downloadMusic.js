const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function getDownload(url) {
  const pathA = path.resolve(__dirname, '..', 'music', 'music.mp3');
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
