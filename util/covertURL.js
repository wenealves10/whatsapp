const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const { getMime } = require('./getMime');

async function covertURL(url) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer', maxContentLength: 1048576 });
      const data = response.data.toString('base64');
      const mime = getMime(data);
      resolve(data && mime ? new MessageMedia(mime, data) : undefined);
    } catch (error) {
      resolve(undefined);
    }
  });
}

module.exports = { covertURL };
